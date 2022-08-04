var sourcesIndex = {};
sourcesIndex["abstio"] = {"name":"","files":["abst_data.rs","abst_paths.rs","download.rs","http.rs","io.rs","io_native.rs","lib.rs"]};
sourcesIndex["abstutil"] = {"name":"","files":["cli.rs","clone.rs","collections.rs","lib.rs","logger.rs","process.rs","serde.rs","time.rs","utils.rs"]};
sourcesIndex["cli"] = {"name":"","files":["augment_scenario.rs","clip_osm.rs","generate_houses.rs","geojson_to_osmosis.rs","import_grid2demand.rs","import_scenario.rs","main.rs","one_step_import.rs"]};
sourcesIndex["collisions"] = {"name":"","files":["lib.rs"]};
sourcesIndex["convert_osm"] = {"name":"","files":["elevation.rs","extract.rs","gtfs.rs","lib.rs","parking.rs"]};
sourcesIndex["fifteen_min"] = {"name":"","files":["bus.rs","find_amenities.rs","find_home.rs","isochrone.rs","lib.rs","viewer.rs"]};
sourcesIndex["game"] = {"name":"","dirs":[{"name":"challenges","files":["cutscene.rs","mod.rs","prebake.rs"]},{"name":"common","files":["mod.rs","route_sketcher.rs","select.rs","share.rs","warp.rs"]},{"name":"debug","files":["blocked_by.rs","blockfinder.rs","floodfill.rs","mod.rs","objects.rs","path_counter.rs","polygons.rs","routes.rs","select_roads.rs","uber_turns.rs"]},{"name":"devtools","files":["collisions.rs","compare_counts.rs","destinations.rs","kml.rs","mod.rs","polygon.rs","scenario.rs","story.rs"]},{"name":"edit","dirs":[{"name":"traffic_signals","files":["edits.rs","gmns.rs","mod.rs","offsets.rs","picker.rs","preview.rs"]}],"files":["crosswalks.rs","mod.rs","multiple_roads.rs","roads.rs","routes.rs","stop_signs.rs","validate.rs","zones.rs"]},{"name":"info","files":["building.rs","debug.rs","intersection.rs","lane.rs","mod.rs","parking_lot.rs","person.rs","transit.rs","trip.rs"]},{"name":"layer","files":["elevation.rs","favorites.rs","map.rs","mod.rs","pandemic.rs","parking.rs","population.rs","problems.rs","problems_diff.rs","traffic.rs","transit.rs"]},{"name":"pregame","files":["mod.rs","proposals.rs"]},{"name":"sandbox","dirs":[{"name":"dashboards","files":["commuter.rs","generic_trip_table.rs","misc.rs","mod.rs","mode_shift.rs","parking_overhead.rs","risks.rs","selector.rs","traffic_signals.rs","travel_times.rs","trip_problems.rs","trip_table.rs"]},{"name":"gameplay","dirs":[{"name":"freeform","files":["area_spawner.rs","importers.rs","mod.rs","spawner.rs"]}],"files":["actdev.rs","commute.rs","fix_traffic_signals.rs","mod.rs","play_scenario.rs","tutorial.rs"]}],"files":["minimap.rs","misc_tools.rs","mod.rs","speed.rs","time_warp.rs"]},{"name":"ungap","dirs":[{"name":"trip","files":["mod.rs","results.rs"]}],"files":["bike_network.rs","explore.rs","layers.rs","mod.rs","predict.rs","quick_sketch.rs"]}],"files":["app.rs","lib.rs"]};
sourcesIndex["geom"] = {"name":"","files":["angle.rs","bounds.rs","circle.rs","conversions.rs","distance.rs","duration.rs","find_closest.rs","gps.rs","lib.rs","line.rs","percent.rs","polygon.rs","polyline.rs","pt.rs","ring.rs","speed.rs","stats.rs","time.rs"]};
sourcesIndex["headless"] = {"name":"","files":["main.rs"]};
sourcesIndex["importer"] = {"name":"","dirs":[{"name":"soundcast","files":["mod.rs","popdat.rs","trips.rs"]}],"files":["basemap.rs","berlin.rs","configuration.rs","lib.rs","map_config.rs","pick_geofabrik.rs","seattle.rs","uk.rs","utils.rs"]};
sourcesIndex["kml"] = {"name":"","files":["lib.rs"]};
sourcesIndex["ltn"] = {"name":"","dirs":[{"name":"components","files":["about.rs","left_panel.rs","mod.rs","top_panel.rs"]},{"name":"edit","files":["filters.rs","freehand_filters.rs","mod.rs","one_ways.rs","shortcuts.rs"]},{"name":"filters","files":["auto.rs","existing.rs","mod.rs"]},{"name":"impact","files":["mod.rs","ui.rs"]},{"name":"save","files":["mod.rs","perma.rs"]}],"files":["browse.rs","colors.rs","connectivity.rs","customize_boundary.rs","draw_cells.rs","export.rs","lib.rs","neighbourhood.rs","partition.rs","route_planner.rs","select_boundary.rs","shortcuts.rs"]};
sourcesIndex["map_editor"] = {"name":"","files":["app.rs","camera.rs","edit.rs","lib.rs","load.rs","model.rs"]};
sourcesIndex["map_gui"] = {"name":"","dirs":[{"name":"render","files":["agents.rs","area.rs","bike.rs","building.rs","car.rs","intersection.rs","lane.rs","map.rs","mod.rs","parking_lot.rs","pedestrian.rs","road.rs","traffic_signal.rs","transit_stop.rs","turn.rs"]},{"name":"tools","files":["camera.rs","city_picker.rs","colors.rs","command.rs","compare_counts.rs","draw_overlapping_paths.rs","heatmap.rs","icons.rs","importer.rs","labels.rs","minimap.rs","mod.rs","navigate.rs","polygon.rs","title_screen.rs","trip_files.rs","turn_explorer.rs","ui.rs","updater.rs","waypoints.rs"]}],"files":["colors.rs","lib.rs","load.rs","options.rs","simple_app.rs"]};
sourcesIndex["map_model"] = {"name":"","dirs":[{"name":"connectivity","files":["mod.rs","walking.rs"]},{"name":"edits","files":["compat.rs","mod.rs","perma.rs"]},{"name":"make","dirs":[{"name":"traffic_signals","files":["lagging_green.rs","mod.rs"]}],"files":["bridges.rs","buildings.rs","mod.rs","parking_lots.rs","transit.rs","turns.rs","walking_turns.rs"]},{"name":"objects","files":["area.rs","block.rs","building.rs","intersection.rs","lane.rs","mod.rs","movement.rs","parking_lot.rs","road.rs","stop_signs.rs","traffic_signals.rs","transit.rs","turn.rs","zone.rs"]},{"name":"pathfind","files":["engine.rs","mod.rs","node_map.rs","pathfinder.rs","uber_turns.rs","v1.rs","v2.rs","vehicles.rs","walking.rs"]}],"files":["city.rs","lib.rs","map.rs","traversable.rs"]};
sourcesIndex["osm_viewer"] = {"name":"","files":["lib.rs","viewer.rs"]};
sourcesIndex["parking_mapper"] = {"name":"","files":["main.rs","mapper.rs"]};
sourcesIndex["piggyback"] = {"name":"","files":["lib.rs"]};
sourcesIndex["popdat"] = {"name":"","files":["activities.rs","distribute_people.rs","import_census.rs","lib.rs","make_person.rs","od.rs"]};
sourcesIndex["raw_map"] = {"name":"","files":["lib.rs","types.rs"]};
sourcesIndex["santa"] = {"name":"","files":["after_level.rs","animation.rs","before_level.rs","buildings.rs","controls.rs","game.rs","levels.rs","lib.rs","meters.rs","music.rs","player.rs","session.rs","title.rs","vehicles.rs"]};
sourcesIndex["sim"] = {"name":"","dirs":[{"name":"make","files":["load.rs","mod.rs","spawner.rs"]},{"name":"mechanics","files":["car.rs","driving.rs","intersection.rs","mod.rs","parking.rs","queue.rs","walking.rs"]},{"name":"pandemic","files":["mod.rs","model.rs"]},{"name":"sim","files":["mod.rs","queries.rs","scenario.rs"]}],"files":["analytics.rs","events.rs","lib.rs","prebake.rs","recorder.rs","render.rs","router.rs","scheduler.rs","transit.rs","trips.rs"]};
sourcesIndex["synthpop"] = {"name":"","dirs":[{"name":"make","files":["activity_model.rs","generator.rs","mod.rs"]}],"files":["borders.rs","counts.rs","endpoint.rs","external.rs","lib.rs","modifier.rs","scenario.rs"]};
sourcesIndex["tests"] = {"name":"","files":["main.rs"]};
sourcesIndex["traffic_seitan"] = {"name":"","files":["main.rs"]};
sourcesIndex["traffic_signal_data"] = {"name":"","files":["lib.rs"]};
sourcesIndex["updater"] = {"name":"","files":["main.rs"]};
sourcesIndex["widgetry"] = {"name":"","dirs":[{"name":"geom","files":["geom_batch_stack.rs","mod.rs"]},{"name":"mapspace","files":["mod.rs","unzoomed.rs","world.rs"]},{"name":"style","files":["button_style.rs","mod.rs"]},{"name":"tools","files":["choose_something.rs","colors.rs","lasso.rs","load.rs","mod.rs","popup.rs","prompt_input.rs","screenshot.rs","url.rs","warper.rs"]},{"name":"widgets","files":["autocomplete.rs","button.rs","compare_times.rs","containers.rs","drag_drop.rs","dropdown.rs","fan_chart.rs","filler.rs","image.rs","just_draw.rs","line_plot.rs","menu.rs","mod.rs","panel.rs","persistent_split.rs","plots.rs","scatter_plot.rs","slider.rs","spinner.rs","stash.rs","table.rs","tabs.rs","text_box.rs","toggle.rs"]}],"files":["app_state.rs","assets.rs","backend_glow.rs","backend_glow_native.rs","canvas.rs","color.rs","drawing.rs","event.rs","event_ctx.rs","input.rs","lib.rs","runner.rs","screen_geom.rs","svg.rs","text.rs"]};
sourcesIndex["widgetry_demo"] = {"name":"","files":["lib.rs"]};
createSourceSidebar();
