use crate::widgets::ContextMenu;
use crate::{
    Canvas, Color, GfxCtx, HorizontalAlignment, Line, Prerender, Text, UserInput, VerticalAlignment,
};
use abstutil::{elapsed_seconds, Timer, TimerSink};
use geom::Angle;
use glium_glyph::glyph_brush::rusttype::Font;
use glium_glyph::GlyphBrush;
use std::collections::VecDeque;
use std::time::Instant;

pub struct EventCtx<'a> {
    pub input: &'a mut UserInput,
    // TODO These two probably shouldn't be public
    pub canvas: &'a mut Canvas,
    pub prerender: &'a Prerender<'a>,

    pub(crate) program: &'a glium::Program,
}

impl<'a> EventCtx<'a> {
    pub fn loading_screen<O, F: FnOnce(&mut EventCtx, &mut Timer) -> O>(
        &mut self,
        timer_name: &str,
        f: F,
    ) -> O {
        let mut timer = Timer::new_with_sink(
            timer_name,
            Box::new(LoadingScreen::new(
                self.prerender,
                self.program,
                self.canvas.window_width,
                self.canvas.window_height,
                self.canvas.font_size,
                timer_name.to_string(),
            )),
        );
        f(self, &mut timer)
    }

    pub fn redo_mouseover(&self) -> bool {
        self.input.window_lost_cursor()
            || (!self.canvas.is_dragging() && self.input.get_moved_mouse().is_some())
            || self.input.get_mouse_scroll().is_some()
    }

    pub fn set_textures(
        &mut self,
        skip_textures: Vec<(&str, Color)>,
        // Each group must have the same dimensions, because they're getting grouped in a texture
        // array.
        texture_groups: Vec<Vec<(&str, TextureType)>>,
        timer: &mut Timer,
    ) {
        self.canvas.texture_arrays.clear();
        self.canvas.texture_lookups.clear();

        for (filename, fallback) in skip_textures {
            self.canvas
                .texture_lookups
                .insert(filename.to_string(), fallback);
        }

        // The limit depends on videocard and drivers -- I can't find a reasonable minimum
        // documented online. But in practice, some Mac users hit a limit of 16. :)
        if texture_groups.len() > 15 {
            panic!("Due to lovely hacks, only 15 texture groups supported");
        }
        timer.start_iter("upload textures", texture_groups.len());
        for (group_idx, group) in texture_groups.into_iter().enumerate() {
            timer.next();
            let mut raw_data = Vec::new();
            for (tex_idx, (filename, tex_type)) in group.into_iter().enumerate() {
                let img = image::open(filename).unwrap().to_rgba();
                let dims = img.dimensions();
                raw_data.push(glium::texture::RawImage2d::from_raw_rgba_reversed(
                    &img.into_raw(),
                    dims,
                ));
                let tex_id = (group_idx as f32, tex_idx as f32);
                self.canvas.texture_lookups.insert(
                    filename.to_string(),
                    match tex_type {
                        TextureType::Stretch => Color::StretchTexture(tex_id, Angle::ZERO),
                        TextureType::Tile => {
                            Color::TileTexture(tex_id, (f64::from(dims.0), f64::from(dims.1)))
                        }
                        TextureType::CustomUV => Color::CustomUVTexture(tex_id),
                    },
                );
            }
            // TODO When the "Varying dimensions were found" error happens, print a friendlier
            // error that has the list of files in the group with mismatched sizes.
            self.canvas.texture_arrays.push(
                glium::texture::Texture2dArray::new(self.prerender.display, raw_data).unwrap(),
            );
        }
    }
}

pub struct LoadingScreen<'a> {
    canvas: Canvas,
    prerender: &'a Prerender<'a>,
    program: &'a glium::Program,
    lines: VecDeque<String>,
    max_capacity: usize,
    last_drawn: Option<Instant>,
    title: String,
}

impl<'a> LoadingScreen<'a> {
    pub fn new(
        prerender: &'a Prerender<'a>,
        program: &'a glium::Program,
        initial_width: f64,
        initial_height: f64,
        font_size: usize,
        title: String,
    ) -> LoadingScreen<'a> {
        // TODO Ew! Expensive and wacky. Fix by not storing GlyphBrush in Canvas at all.
        let dejavu: &[u8] = include_bytes!("assets/DejaVuSans.ttf");
        let screenspace_glyphs =
            GlyphBrush::new(prerender.display, vec![Font::from_bytes(dejavu).unwrap()]);
        let mapspace_glyphs =
            GlyphBrush::new(prerender.display, vec![Font::from_bytes(dejavu).unwrap()]);
        let canvas = Canvas::new(
            initial_width,
            initial_height,
            screenspace_glyphs,
            mapspace_glyphs,
            font_size,
        );

        LoadingScreen {
            prerender,
            program,
            lines: VecDeque::new(),
            max_capacity: (0.8 * initial_height / canvas.line_height) as usize,
            last_drawn: None,
            title,
            canvas,
        }
    }

    // Timer throttles updates reasonably, so don't bother throttling redraws.
    fn redraw(&mut self) {
        if let Some(t) = self.last_drawn {
            if elapsed_seconds(t) < 0.2 {
                return;
            }
        }
        self.last_drawn = Some(Instant::now());

        let mut txt = Text::prompt(&self.title);
        txt.override_width = Some(self.canvas.window_width * 0.8);
        txt.override_height = Some(self.canvas.window_height * 0.8);
        for l in &self.lines {
            txt.add(Line(l));
        }

        let mut target = self.prerender.display.draw();
        let context_menu = ContextMenu::new();
        let mut g = GfxCtx::new(
            &self.canvas,
            self.prerender,
            &mut target,
            self.program,
            &context_menu,
            false,
        );
        g.clear(Color::BLACK);
        // TODO Keep the width fixed.
        g.draw_blocking_text(
            &txt,
            (HorizontalAlignment::Center, VerticalAlignment::Center),
        );
        self.canvas
            .screenspace_glyphs
            .borrow_mut()
            .draw_queued(self.prerender.display, &mut target);
        // LoadingScreen doesn't use mapspace_glyphs
        target.finish().unwrap();
    }
}

impl<'a> TimerSink for LoadingScreen<'a> {
    // TODO Do word wrap. Assume the window is fixed during loading, if it makes things easier.
    fn println(&mut self, line: String) {
        if self.lines.len() == self.max_capacity {
            self.lines.pop_front();
        }
        self.lines.push_back(line);
        self.redraw();
    }

    fn reprintln(&mut self, line: String) {
        self.lines.pop_back();
        self.lines.push_back(line);
        self.redraw();
    }
}

pub enum TextureType {
    Stretch,
    Tile,
    CustomUV,
}
