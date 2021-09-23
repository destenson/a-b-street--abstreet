use std::collections::{BTreeMap, HashSet};

use serde::{Deserialize, Serialize};

use abstutil::Timer;
use geom::{Circle, Distance, Duration, FindClosest, PolyLine};
use map_gui::tools::{grey_out_map, ChooseSomething, PopupMsg};
use map_model::{Path, PathStep, NORMAL_LANE_THICKNESS};
use sim::{TripEndpoint, TripMode};
use widgetry::{
    Choice, Color, Drawable, EventCtx, GeomBatch, GfxCtx, Key, Line, LinePlot, Outcome, Panel,
    PlotOptions, Series, SimpleState, Slider, State, Text, TextBox, TextExt, Widget,
};

use crate::app::{App, Transition};
use crate::common::InputWaypoints;
use crate::ungap::{Layers, Tab, TakeLayers};

const MAX_AVOID_PARAM: f64 = 2.0;

pub struct RoutePlanner {
    layers: Layers,
    once: bool,

    input_panel: Panel,
    waypoints: InputWaypoints,
    results: RouteResults,
    files: RouteManagement,
}

impl TakeLayers for RoutePlanner {
    fn take_layers(self) -> Layers {
        self.layers
    }
}

impl RoutePlanner {
    pub fn new_state(ctx: &mut EventCtx, app: &App, layers: Layers) -> Box<dyn State<App>> {
        let mut rp = RoutePlanner {
            layers,
            once: true,

            input_panel: Panel::empty(ctx),
            waypoints: InputWaypoints::new(ctx, app),
            results: RouteResults::new(ctx, app, Vec::new()).0,
            files: RouteManagement::new(app),
        };
        rp.update_input_panel(ctx, app);
        Box::new(rp)
    }

    fn update_input_panel(&mut self, ctx: &mut EventCtx, app: &App) {
        let (results, results_widget) = RouteResults::new(ctx, app, self.waypoints.get_waypoints());
        self.results = results;

        let params = &app.session.routing_params;
        let col = Widget::col(vec![
            self.files.get_panel_widget(ctx),
            self.waypoints.get_panel_widget(ctx),
            Widget::col(vec![
                Widget::row(vec![
                    "Avoid steep hills (> 8% incline)".text_widget(ctx),
                    Slider::area(
                        ctx,
                        100.0,
                        params.avoid_steep_incline_penalty / MAX_AVOID_PARAM,
                        "avoid_steep_incline_penalty",
                    ),
                ]),
                Widget::row(vec![
                    "Avoid high-stress roads".text_widget(ctx),
                    Slider::area(
                        ctx,
                        100.0,
                        params.avoid_high_stress / MAX_AVOID_PARAM,
                        "avoid_high_stress",
                    ),
                ]),
            ])
            .section(ctx),
            results_widget,
        ]);

        let mut new_panel = Tab::Route.make_left_panel(ctx, app, col);

        // TODO After scrolling down and dragging a slider, sometimes releasing the slider
        // registers as clicking "X" on the waypoints! Maybe just replace() in that case?
        new_panel.restore_scroll(ctx, &self.input_panel);
        self.input_panel = new_panel;
    }

    fn sync_from_file_management(&mut self, ctx: &mut EventCtx, app: &App) {
        self.waypoints
            .overwrite(ctx, app, self.files.current.waypoints.clone());
        self.update_input_panel(ctx, app);
    }
}

impl State<App> for RoutePlanner {
    fn event(&mut self, ctx: &mut EventCtx, app: &mut App) -> Transition {
        if self.once {
            self.once = false;
            ctx.loading_screen("apply edits", |_, mut timer| {
                app.primary
                    .map
                    .recalculate_pathfinding_after_edits(&mut timer);
            });
        }

        let outcome = self.input_panel.event(ctx);
        if let Outcome::Clicked(ref x) = outcome {
            if let Some(t) = Tab::Route.handle_action::<RoutePlanner>(ctx, app, x) {
                return t;
            }
            if let Some(t) = self.files.on_click(ctx, app, x) {
                // Bit hacky...
                if matches!(t, Transition::Keep) {
                    self.sync_from_file_management(ctx, app);
                }
                return t;
            }
        }
        if let Outcome::Changed(ref x) = outcome {
            if x == "avoid_steep_incline_penalty" || x == "avoid_high_stress" {
                app.session.routing_params.avoid_steep_incline_penalty = MAX_AVOID_PARAM
                    * self
                        .input_panel
                        .slider("avoid_steep_incline_penalty")
                        .get_percent();
                app.session.routing_params.avoid_high_stress =
                    MAX_AVOID_PARAM * self.input_panel.slider("avoid_high_stress").get_percent();
                self.update_input_panel(ctx, app);
                return Transition::Keep;
            }
        }
        // Send all other outcomes here
        // TODO This routing of outcomes and the brittle ordering totally breaks encapsulation :(
        if let Some(t) = self
            .results
            .event(ctx, app, &outcome, &mut self.input_panel)
        {
            return t;
        }
        if self.waypoints.event(ctx, app, outcome) {
            // Sync from waypoints to file management
            // TODO Maaaybe this directly live in the InputWaypoints system?
            self.files.current.waypoints = self.waypoints.get_waypoints();
            self.update_input_panel(ctx, app);
        }

        if let Some(t) = self.layers.event(ctx, app) {
            return t;
        }

        Transition::Keep
    }

    fn draw(&self, g: &mut GfxCtx, app: &App) {
        self.layers.draw(g, app);
        self.input_panel.draw(g);
        self.waypoints.draw(g);
        self.results.draw(g, app, &self.input_panel);
    }
}

struct RouteResults {
    // It's tempting to glue together all of the paths. But since some waypoints might force the
    // path to double back on itself, rendering the path as a single PolyLine would break.
    paths: Vec<(Path, Option<PolyLine>)>,
    // Match each polyline to the index in paths
    closest_path_segment: FindClosest<usize>,

    hover_on_line_plot: Option<(Distance, Drawable)>,
    hover_on_route_tooltip: Option<Text>,
    draw_route_unzoomed: Drawable,
    draw_route_zoomed: Drawable,

    draw_high_stress: Drawable,
    draw_traffic_signals: Drawable,
    draw_unprotected_turns: Drawable,
}

impl RouteResults {
    fn new(ctx: &mut EventCtx, app: &App, waypoints: Vec<TripEndpoint>) -> (RouteResults, Widget) {
        let mut unzoomed_batch = GeomBatch::new();
        let mut zoomed_batch = GeomBatch::new();
        let mut draw_high_stress = GeomBatch::new();
        let mut draw_traffic_signals = GeomBatch::new();
        let mut draw_unprotected_turns = GeomBatch::new();
        let map = &app.primary.map;

        let mut total_distance = Distance::ZERO;
        let mut total_time = Duration::ZERO;

        let mut dist_along_high_stress_roads = Distance::ZERO;
        let mut num_traffic_signals = 0;
        let mut num_unprotected_turns = 0;

        let mut elevation_pts: Vec<(Distance, Distance)> = Vec::new();
        let mut current_dist = Distance::ZERO;

        let mut paths = Vec::new();
        let mut closest_path_segment = FindClosest::new(map.get_bounds());

        for pair in waypoints.windows(2) {
            if let Some(path) = TripEndpoint::path_req(pair[0], pair[1], TripMode::Bike, map)
                .and_then(|req| {
                    map.pathfind_with_params(req, &app.session.routing_params)
                        .ok()
                })
            {
                total_distance += path.total_length();
                total_time += path.estimate_duration(map, Some(map_model::MAX_BIKE_SPEED));

                for step in path.get_steps() {
                    let this_pl = step.as_traversable().get_polyline(map);
                    match step {
                        PathStep::Lane(l) | PathStep::ContraflowLane(l) => {
                            if map.get_parent(*l).high_stress_for_bikes(map) {
                                dist_along_high_stress_roads += this_pl.length();

                                // TODO It'd be nicer to build up contiguous subsets of the path
                                // that're stressful, and use trace
                                draw_high_stress.push(
                                    Color::RED,
                                    this_pl.make_polygons(5.0 * NORMAL_LANE_THICKNESS),
                                );
                            }
                        }
                        PathStep::Turn(t) => {
                            let i = map.get_i(t.parent);
                            elevation_pts.push((current_dist, i.elevation));
                            if i.is_traffic_signal() {
                                num_traffic_signals += 1;
                                draw_traffic_signals.push(Color::RED, i.polygon.clone());
                            }
                            if map.is_unprotected_turn(
                                t.src.road,
                                t.dst.road,
                                map.get_t(*t).turn_type,
                            ) {
                                num_unprotected_turns += 1;
                                draw_unprotected_turns.push(Color::RED, i.polygon.clone());
                            }
                        }
                    }
                    current_dist += this_pl.length();
                }

                let maybe_pl = path.trace(map);
                if let Some(ref pl) = maybe_pl {
                    let shape = pl.make_polygons(5.0 * NORMAL_LANE_THICKNESS);
                    unzoomed_batch.push(Color::CYAN.alpha(0.8), shape.clone());
                    zoomed_batch.push(Color::CYAN.alpha(0.5), shape);
                    closest_path_segment.add(paths.len(), pl.points());
                }
                paths.push((path, maybe_pl));
            }
        }
        let draw_route_unzoomed = ctx.upload(unzoomed_batch);
        let draw_route_zoomed = ctx.upload(zoomed_batch);

        let mut total_up = Distance::ZERO;
        let mut total_down = Distance::ZERO;
        for pair in elevation_pts.windows(2) {
            let dy = pair[1].1 - pair[0].1;
            if dy < Distance::ZERO {
                total_down -= dy;
            } else {
                total_up += dy;
            }
        }

        let pct_stressful = if total_distance == Distance::ZERO {
            0.0
        } else {
            ((dist_along_high_stress_roads / total_distance) * 100.0).round()
        };

        let widget = Widget::col(vec![
            Line("Your route").small_heading().into_widget(ctx),
            Text::from_all(vec![
                Line("Distance: ").secondary(),
                Line(total_distance.to_string(&app.opts.units)),
            ])
            .into_widget(ctx),
            Widget::row(vec![
                Text::from_all(vec![
                    Line(format!(
                        "  {} or {}%",
                        dist_along_high_stress_roads.to_string(&app.opts.units),
                        pct_stressful
                    )),
                    Line(" along ").secondary(),
                ])
                .into_widget(ctx)
                .centered_vert(),
                ctx.style()
                    .btn_plain
                    .btn()
                    .label_underlined_text("high-stress roads")
                    .build_def(ctx),
            ]),
            Text::from_all(vec![
                Line("Estimated time: ").secondary(),
                Line(total_time.to_string(&app.opts.units)),
            ])
            .into_widget(ctx),
            Widget::row(vec![
                Line("Traffic signals crossed: ")
                    .secondary()
                    .into_widget(ctx)
                    .centered_vert(),
                ctx.style()
                    .btn_plain
                    .btn()
                    .label_underlined_text(num_traffic_signals.to_string())
                    .build_widget(ctx, "traffic signals"),
            ]),
            Widget::row(vec![
                Line("Unprotected left turns onto busy roads: ")
                    .secondary()
                    .into_widget(ctx)
                    .centered_vert(),
                ctx.style()
                    .btn_plain
                    .btn()
                    .label_underlined_text(num_unprotected_turns.to_string())
                    .build_widget(ctx, "unprotected turns"),
            ]),
            Text::from_all(vec![
                Line("Elevation change: ").secondary(),
                Line(format!(
                    "{}↑, {}↓",
                    total_up.to_string(&app.opts.units),
                    total_down.to_string(&app.opts.units)
                )),
            ])
            .into_widget(ctx),
            LinePlot::new_widget(
                ctx,
                "elevation",
                vec![Series {
                    label: "Elevation".to_string(),
                    color: Color::RED,
                    pts: elevation_pts,
                }],
                PlotOptions {
                    filterable: false,
                    max_x: Some(current_dist.round_up_for_axis()),
                    max_y: Some(map.max_elevation().round_up_for_axis()),
                    disabled: HashSet::new(),
                },
                app.opts.units,
            ),
        ]);

        (
            RouteResults {
                draw_route_unzoomed,
                draw_route_zoomed,
                draw_high_stress: ctx.upload(draw_high_stress),
                draw_traffic_signals: ctx.upload(draw_traffic_signals),
                draw_unprotected_turns: ctx.upload(draw_unprotected_turns),
                paths,
                closest_path_segment,
                hover_on_line_plot: None,
                hover_on_route_tooltip: None,
            },
            widget,
        )
    }

    fn event(
        &mut self,
        ctx: &mut EventCtx,
        app: &App,
        outcome: &Outcome,
        panel: &mut Panel,
    ) -> Option<Transition> {
        if let Outcome::Clicked(x) = outcome {
            match x.as_ref() {
                "high-stress roads" => {
                    return Some(Transition::Push(PopupMsg::new_state(
                        ctx,
                        "High-stress roads",
                        vec![
                            "Roads are defined as high-stress for biking if:",
                            "- they're classified as arterials",
                            "- they lack dedicated space for biking",
                        ],
                    )));
                }
                // No effect. Maybe these should be toggles, so people can pan the map around and
                // see these in more detail?
                "traffic signals" | "unprotected turns" => {
                    return Some(Transition::Keep);
                }
                _ => {
                    return None;
                }
            }
        }

        let current_dist_along = panel
            .find::<LinePlot<Distance, Distance>>("elevation")
            .get_hovering()
            .get(0)
            .map(|pair| pair.0);
        if self.hover_on_line_plot.as_ref().map(|pair| pair.0) != current_dist_along {
            self.hover_on_line_plot = current_dist_along.map(|mut dist| {
                let mut batch = GeomBatch::new();
                // Find this position on the route
                for (path, maybe_pl) in &self.paths {
                    if dist > path.total_length() {
                        dist -= path.total_length();
                        continue;
                    }
                    if let Some(ref pl) = maybe_pl {
                        if let Ok((pt, _)) = pl.dist_along(dist) {
                            batch.push(
                                Color::CYAN,
                                Circle::new(pt, Distance::meters(30.0)).to_polygon(),
                            );
                        }
                    }
                    break;
                }

                (dist, batch.upload(ctx))
            });
        }

        if ctx.redo_mouseover() {
            self.hover_on_route_tooltip = None;
            if let Some(pt) = ctx.canvas.get_cursor_in_map_space() {
                if let Some((idx, pt)) = self
                    .closest_path_segment
                    .closest_pt(pt, 10.0 * NORMAL_LANE_THICKNESS)
                {
                    // Find the total distance along the route
                    let mut dist = Distance::ZERO;
                    for (path, _) in &self.paths[0..idx] {
                        dist += path.total_length();
                    }
                    if let Some(ref pl) = self.paths[idx].1 {
                        if let Some((dist_here, _)) = pl.dist_along_of_point(pt) {
                            // The LinePlot doesn't hold onto the original Series, so it can't help
                            // us figure out elevation here. Let's match this point to the original
                            // path and guess elevation ourselves...
                            let map = &app.primary.map;
                            let elevation = match self.paths[idx]
                                .0
                                .get_step_at_dist_along(map, dist_here)
                                // We often seem to slightly exceed the total length, so just clamp
                                // here...
                                .unwrap_or_else(|_| self.paths[idx].0.last_step())
                            {
                                PathStep::Lane(l) | PathStep::ContraflowLane(l) => {
                                    // TODO Interpolate
                                    map.get_i(map.get_l(l).src_i).elevation
                                }
                                PathStep::Turn(t) => map.get_i(t.parent).elevation,
                            };
                            panel
                                .find_mut::<LinePlot<Distance, Distance>>("elevation")
                                .set_hovering(ctx, dist + dist_here, elevation);
                            self.hover_on_route_tooltip = Some(Text::from(Line(format!(
                                "Elevation: {}",
                                elevation.to_string(&app.opts.units)
                            ))));
                        }
                    }
                }
            }
        }

        None
    }

    fn draw(&self, g: &mut GfxCtx, app: &App, panel: &Panel) {
        if g.canvas.cam_zoom >= app.opts.min_zoom_for_detail {
            g.redraw(&self.draw_route_zoomed);
        } else {
            g.redraw(&self.draw_route_unzoomed);
        }
        if let Some((_, ref draw)) = self.hover_on_line_plot {
            g.redraw(draw);
        }
        if let Some(ref txt) = self.hover_on_route_tooltip {
            g.draw_mouse_tooltip(txt.clone());
        }
        if panel.currently_hovering() == Some(&"high-stress roads".to_string()) {
            g.redraw(&self.draw_high_stress);
        }
        if panel.currently_hovering() == Some(&"traffic signals".to_string()) {
            g.redraw(&self.draw_traffic_signals);
        }
        if panel.currently_hovering() == Some(&"unprotected turns".to_string()) {
            g.redraw(&self.draw_unprotected_turns);
        }
    }
}

/// Save sequences of waypoints as named routes. Basic file management -- save, load, browse. This
/// is useful to define "test cases," then edit the bike network and "run the tests" to compare
/// results.
struct RouteManagement {
    current: NamedRoute,
    // We assume the file won't change out from beneath us
    all: SavedRoutes,
}

#[derive(Clone, PartialEq, Serialize, Deserialize)]
struct NamedRoute {
    name: String,
    waypoints: Vec<TripEndpoint>,
}

#[derive(Serialize, Deserialize)]
struct SavedRoutes {
    routes: BTreeMap<String, NamedRoute>,
}

impl SavedRoutes {
    fn load(app: &App) -> SavedRoutes {
        abstio::maybe_read_json::<SavedRoutes>(
            abstio::path_routes(app.primary.map.get_name()),
            &mut Timer::throwaway(),
        )
        .unwrap_or_else(|_| SavedRoutes {
            routes: BTreeMap::new(),
        })
    }

    fn save(&self, app: &App) {
        abstio::write_json(abstio::path_routes(app.primary.map.get_name()), self);
    }

    fn prev(&self, current: &str) -> Option<&NamedRoute> {
        // Pretend unsaved routes are at the end of the list
        if self.routes.contains_key(current) {
            self.routes
                .range(..current.to_string())
                .next_back()
                .map(|pair| pair.1)
        } else {
            self.routes.values().last()
        }
    }

    fn next(&self, current: &str) -> Option<&NamedRoute> {
        if self.routes.contains_key(current) {
            let mut iter = self.routes.range(current.to_string()..);
            iter.next();
            iter.next().map(|pair| pair.1)
        } else {
            None
        }
    }

    fn new_name(&self) -> String {
        let mut i = self.routes.len() + 1;
        loop {
            let name = format!("Route {}", i);
            if self.routes.contains_key(&name) {
                i += 1;
            } else {
                return name;
            }
        }
    }
}

impl RouteManagement {
    fn new(app: &App) -> RouteManagement {
        let all = SavedRoutes::load(app);
        let current = NamedRoute {
            name: all.new_name(),
            waypoints: Vec::new(),
        };
        RouteManagement { all, current }
    }

    fn get_panel_widget(&self, ctx: &mut EventCtx) -> Widget {
        let current_name = &self.current.name;
        let can_save = self.current.waypoints.len() >= 2
            && Some(&self.current) != self.all.routes.get(current_name);
        Widget::col(vec![
            Widget::row(vec![
                ctx.style()
                    .btn_plain
                    .btn()
                    .label_underlined_text(current_name)
                    .build_widget(ctx, "rename route"),
                ctx.style()
                    .btn_outline
                    .text("Start new route")
                    .build_def(ctx),
                ctx.style()
                    .btn_plain
                    .icon_text("system/assets/tools/save.svg", "Save")
                    .disabled(!can_save)
                    .build_def(ctx),
                ctx.style()
                    .btn_plain_destructive
                    .icon_text("system/assets/tools/trash.svg", "Delete")
                    .build_def(ctx),
            ]),
            Widget::row(vec![
                ctx.style()
                    .btn_prev()
                    .hotkey(Key::LeftArrow)
                    .disabled(self.all.prev(current_name).is_none())
                    .build_widget(ctx, "previous route"),
                // TODO Autosave first?
                ctx.style()
                    .btn_outline
                    .text("Load another route")
                    .build_def(ctx),
                ctx.style()
                    .btn_next()
                    .hotkey(Key::RightArrow)
                    .disabled(self.all.next(current_name).is_none())
                    .build_widget(ctx, "next route"),
            ]),
        ])
        .section(ctx)
    }

    fn on_click(&mut self, ctx: &mut EventCtx, app: &App, action: &str) -> Option<Transition> {
        match action {
            "Save" => {
                self.all
                    .routes
                    .insert(self.current.name.clone(), self.current.clone());
                self.all.save(app);
                Some(Transition::Keep)
            }
            "Delete" => {
                if self.all.routes.remove(&self.current.name).is_some() {
                    self.all.save(app);
                }
                self.current = NamedRoute {
                    name: self.all.new_name(),
                    waypoints: Vec::new(),
                };
                Some(Transition::Keep)
            }
            "Start new route" => {
                self.current = NamedRoute {
                    name: self.all.new_name(),
                    waypoints: Vec::new(),
                };
                Some(Transition::Keep)
            }
            "Load another route" => Some(Transition::Push(ChooseSomething::new_state(
                ctx,
                "Load another route",
                self.all.routes.keys().map(|x| Choice::string(x)).collect(),
                Box::new(move |choice, _, _| {
                    Transition::Multi(vec![
                        Transition::Pop,
                        Transition::ModifyState(Box::new(move |state, ctx, app| {
                            let state = state.downcast_mut::<RoutePlanner>().unwrap();
                            state.files.current = state.files.all.routes[&choice].clone();
                            state.sync_from_file_management(ctx, app);
                        })),
                    ])
                }),
            ))),
            "previous route" => {
                self.current = self.all.prev(&self.current.name).unwrap().clone();
                Some(Transition::Keep)
            }
            "next route" => {
                self.current = self.all.next(&self.current.name).unwrap().clone();
                Some(Transition::Keep)
            }
            "rename route" => Some(Transition::Push(RenameEdits::new_state(
                ctx,
                &self.current,
                &self.all,
            ))),
            _ => None,
        }
    }
}

struct RenameEdits {
    current_name: String,
    all_names: HashSet<String>,
}

impl RenameEdits {
    fn new_state(
        ctx: &mut EventCtx,
        current: &NamedRoute,
        all: &SavedRoutes,
    ) -> Box<dyn State<App>> {
        let panel = Panel::new_builder(Widget::col(vec![
            Widget::row(vec![
                Line("Name this route").small_heading().into_widget(ctx),
                ctx.style().btn_close_widget(ctx),
            ]),
            Widget::row(vec![
                "Name:".text_widget(ctx).centered_vert(),
                TextBox::default_widget(ctx, "name", current.name.clone()),
            ]),
            Text::new().into_widget(ctx).named("warning"),
            ctx.style()
                .btn_solid_primary
                .text("Rename")
                .hotkey(Key::Enter)
                .build_def(ctx),
        ]))
        .build(ctx);
        <dyn SimpleState<_>>::new_state(
            panel,
            Box::new(RenameEdits {
                current_name: current.name.clone(),
                all_names: all.routes.keys().cloned().collect(),
            }),
        )
    }
}

impl SimpleState<App> for RenameEdits {
    fn on_click(&mut self, _: &mut EventCtx, _: &mut App, x: &str, panel: &Panel) -> Transition {
        match x {
            "close" => Transition::Pop,
            "Rename" => {
                let old_name = self.current_name.clone();
                let new_name = panel.text_box("name");
                Transition::Multi(vec![
                    Transition::Pop,
                    Transition::ModifyState(Box::new(move |state, ctx, app| {
                        let state = state.downcast_mut::<RoutePlanner>().unwrap();
                        state.files.all.routes.remove(&old_name);
                        state.files.current.name = new_name.clone();
                        state
                            .files
                            .all
                            .routes
                            .insert(new_name, state.files.current.clone());
                        state.files.all.save(app);
                        state.sync_from_file_management(ctx, app);
                    })),
                ])
            }
            _ => unreachable!(),
        }
    }

    fn panel_changed(
        &mut self,
        ctx: &mut EventCtx,
        _: &mut App,
        panel: &mut Panel,
    ) -> Option<Transition> {
        let new_name = panel.text_box("name");
        let can_save = if new_name != self.current_name && self.all_names.contains(&new_name) {
            panel.replace(
                ctx,
                "warning",
                Line("A route with this name already exists")
                    .fg(Color::hex("#FF5E5E"))
                    .into_widget(ctx),
            );
            false
        } else {
            panel.replace(ctx, "warning", Text::new().into_widget(ctx));
            true
        };
        panel.replace(
            ctx,
            "Rename",
            ctx.style()
                .btn_solid_primary
                .text("Rename")
                .hotkey(Key::Enter)
                .disabled(!can_save)
                .build_def(ctx),
        );
        None
    }

    fn draw(&self, g: &mut GfxCtx, app: &App) {
        grey_out_map(g, app);
    }
}