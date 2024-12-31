searchState.loadedDescShard("widgetry", 0, "Widgets\nUTF-8 encoded bytes of an SVG\nChange every instance of the first color to the second\nChange all colors to the specified value. For this to be …\nChange the alpha value of all colors to this value.\nA dropdown, checkbox, spinner, etc changed values. The …\nReplace the entire stack of states with this stack.\nAn action was done, with custom data. The caller must cast …\nWhen an action happens through a button-like widget, what …\nAn action was done\nThe <code>color</code> parameter is multiplied by any color baked into …\nThis destroys the current state, running the callback on …\nRules for how content should stretch to fill its bounds\nDon’t draw anything.\nCall <code>SharedAppState::draw_default</code>.\nOn a DragDrop widget, a member was clicked on and …\nBefore <code>State::draw</code> is called, draw something else.\nGeometry that’s been uploaded to the GPU once and can be …\nDoesn’t do anything by itself, just used for widgetsing. …\nSome named widget currently holds focus\nA mutable builder for a group of colored tessellated …\nPreviously rendered graphics, in the form of a <code>GeomBatch</code>, …\nSimilar to [<code>Widget::row</code>]/[<code>Widget::column</code>], but for …\nA stylable UI component builder which presents vector …\nThe visual\nDon’t do anything, keep the current state as the active …\nKeep the current state as the active one, but immediately …\nNote: When double clicking, there will be two …\nConvert all colors to greyscale.\nIf a state needs to pass data back to its parent, use …\nExecute a sequence of transitions in order.\nDon’t do anything\nNothing happened\nThe result of a Panel handling an event\nPath to an SVG file\nDestroy the current state, and resume from the previous one\nCall the previous state’s <code>draw</code>. This won’t recurse, …\nPush a new active state on the top of the stack.\nCall <code>State::recreate</code> on the current top of the stack\nReplace the current state with a new one. Equivalent to …\nA way to transform all colors in a GeomBatch.\nAn f64 rounded to 4 decimal places. Useful with Spinners, …\nMaintaining aspect ratio, content grows until both bounds …\nMaintaining aspect ratio, content grows until it touches …\nStretches content to fit its bounds exactly, breaking …\nScreenDims is in units of logical pixels, as opposed to …\nScreenPt is in units of logical pixels, as opposed to …\nScreenRectangle is in units of logical pixels, as opposed …\nCustomize how widgetry works. Most of these settings can’…\nAny data that should last the entire lifetime of the …\nMany states fit a pattern of managing a single panel, …\nAn invisible widget that stores some arbitrary data on the …\nA temporary state of an application. There’s a stack of …\nOnce uploaded, textures are addressed by their id, …\nWhen a state responds to an event, it can specify some way …\nCreate a new widget by implementing this trait. You can …\nA widgetry application splits its state into two pieces: …\nDraw\nDraw the widget. Be sure to draw relative to the top-left …\nRespond to a UI event, such as input or time passing.\nYour chance to react to an event. Any side effects outside …\nThis widget (in some panel) exclusively owns focus. Don’…\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nWhat width and height does the widget occupy? If this …\nLike <code>std::include_bytes!</code>, but also returns its argument, …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nSome map-space elements are drawn differently when …\nWhile handling an event, this widget (in some panel) this …\nCalled when something on the panel has been clicked. Since …\nThis widget produced an Outcome, and event handling should …\nThis widget changed dimensions, so recalculate layout.\nYour widget’s top left corner should be here. Handle …\nReplace the entire stack of states with this stack.\nThis destroys the current state, running the callback on …\nDon’t draw anything.\nCall <code>SharedAppState::draw_default</code>.\nBefore <code>State::draw</code> is called, draw something else.\nDon’t do anything, keep the current state as the active …\nKeep the current state as the active one, but immediately …\nIf a state needs to pass data back to its parent, use …\nExecute a sequence of transitions in order.\nDestroy the current state, and resume from the previous one\nCall the previous state’s <code>draw</code>. This won’t recurse, …\nPush a new active state on the top of the stack.\nCall <code>State::recreate</code> on the current top of the stack\nReplace the current state with a new one. Equivalent to …\nAny data that should last the entire lifetime of the …\nMany states fit a pattern of managing a single panel, …\nA temporary state of an application. There’s a stack of …\nWhen a state responds to an event, it can specify some way …\nBefore <code>State::event</code> is called, call this.\nBefore <code>State::event</code> is called, call this.\nCalled before a normal exit, like window close\nCalled before a normal exit, like window close\nReturns a boxed object from a boxed trait object if the …\nReturns a mutable reference to the object within the trait …\nReturns an <code>Rc</code>-ed object from an <code>Rc</code>-ed trait object if the …\nReturns a reference to the object within the trait object …\nDraw\nSpecifies what to draw before draw()\nSpecifies what to draw before draw()\nWhen DrawBaselayer::DefaultDraw is called, run this.\nWhen DrawBaselayer::DefaultDraw is called, run this.\nWill be called if <code>State::event</code> or <code>State::draw</code> panics.\nWill be called if <code>State::event</code> or <code>State::draw</code> panics.\nRespond to a UI event, such as input or time passing.\nIf true, then the top-most state on the stack needs to be …\nIf widgetry determines the video card is low on memory, …\nIf widgetry determines the video card is low on memory, …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns true if the trait object wraps an object of type …\nCalled when something on the panel has been clicked. Since …\nCalled when something on the panel has been clicked.\nCalled when something on the panel has been clicked.\nBefore this state is popped or replaced, call this.\nBefore this state is popped or replaced, call this.\nCalled when the mouse has moved.\nCalled when the mouse has moved.\nIf a panel <code>on_click</code> event didn’t occur and <code>panel_changed</code> …\nIf a panel <code>on_click</code> event didn’t occur and <code>panel_changed</code> …\nCalled when something on the panel has changed. If a …\nCalled when something on the panel has changed. If a …\nRespond to <code>Transition::Recreate</code> by assuming state in the …\nRespond to <code>Transition::Recreate</code> by assuming state in the …\nA stack of states\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nGeometry that’s been uploaded to the GPU once and can be …\nUploads a sprite sheet of textures to the GPU so they can …\nThis has no effect when drawn.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nSome map-space elements are drawn differently when …\nThe <code>color</code> parameter is multiplied by any color baked into …\nOnce uploaded, textures are addressed by their id, …\nNote this is incorrect for <code>Color::CLEAR</code>. Can’t fix in a …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nMultiply the color’s current alpha by the <code>factor</code>, …\nDraw a tooltip where the mouse is\nDraw a tooltip somewhere on the screen\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\n(cam_x, cam_y, cam_zoom)\n(window_width, window_height, Z values)\nNote: When double clicking, there will be two …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nAllow panning and zooming on the canvas. Exactly which …\nThis widget (in some panel) exclusively owns focus. Don’…\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nChecks if an extra font has previously been loaded with …\nLoads an extra font, used only for automatic fallback of …\nWhile handling an event, this widget (in some panel) this …\nThe app will need to recreate its panels for this to take …\nOnly one texture can be loaded at a time; this overwrites …\nChange every instance of the first color to the second\nChange all colors to the specified value. For this to be …\nChange the alpha value of all colors to this value.\nA mutable builder for a group of colored tessellated …\nConvert all colors to greyscale.\nDon’t do anything\nA way to transform all colors in a GeomBatch.\nAppends all colored polygons from another batch to the …\nSets the top-left to 0, 0. Not sure exactly when this …\nWrap in a Widget for layouting, so this batch can become …\nTranslates the batch to be centered on some point.\nTransforms all colors in a batch.\nReturns the colored polygons in this batch, destroying the …\nDraws the batch, consuming it. Only use this for drawing …\nApplies one Fill to many polygons.\nReturns the argument unchanged.\nCreates a batch of filled polygons.\nReturns the argument unchanged.\nCompute the bounds of all polygons in this batch.\nReturns the width and height of all geometry contained in …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nExports the batch to a list of GeoJSON features, labeling …\nWrap in a Widget, so the batch can be drawn as part of a …\nTrue when the batch is empty.\nReturns a batch containing an SVG from a file.\nReturns a GeomBatch from the bytes of a utf8 encoded SVG …\nReturns a GeomBatch from the bytes of a utf8 encoded SVG …\nEquivalent to …\nCreates an empty batch.\nAdds a single tessellated polygon, painted according to …\nOffset z value to render above/below other polygons. z …\nRotates each polygon in the batch relative to the center …\nRotates each polygon in the batch relative to the center …\nScales the batch by some factor.\nScales the batch so that the height matches something, …\nScales the batch so that the width and height do not …\nScales the batch so that the width matches something, …\nOverrides the Z-ordering offset for the batch. Must be in …\nRemoves the first polygon in the batch.\nTranslates the batch by some offset.\nAdds a single polygon to the front of the batch, painted …\nUpload the batch of polygons to the GPU, returning …\nSimilar to [<code>Widget::row</code>]/[<code>Widget::column</code>], but for …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nA left click occurred while not hovering on any object\nA hoverable object was clicked\nAn object is being dragged. The given offsets are relative …\nDraw custom objects that scale their size as the canvas is …\nDraw <code>Circles</code> and <code>PolyLines</code> in map-space that scale their …\nIf you don’t ever need to refer to objects in a <code>World</code>, …\nThe object being hovered on changed from (something …\nWhile hovering on an object with a defined hotkey, that …\nNothing interesting happened\nObjects in a <code>World</code> are uniquely identified by this …\nDraws one of two versions of something, based on whether …\nA <code>World</code> manages objects that exist in “map-space”, the …\nThe result of a <code>World</code> handling an event\nTransforms all colors in both batches.\nMark that this object will be drawn differently when …\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nAdds a single polygon to both batches, painted according …\nDraw custom objects that scale their size as the canvas is …\nDraw <code>Circles</code> and <code>PolyLines</code> in map-space that scale their …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nA left click occurred while not hovering on any object\nA hoverable object was clicked\nAn object is being dragged. The given offsets are relative …\nIf you don’t ever need to refer to objects in a <code>World</code>, …\nThe object being hovered on changed from (something …\nWhile hovering on an object with a defined hotkey, that …\nNothing interesting happened\nThis provides a builder API for adding objects to a <code>World</code>.\nObjects in a <code>World</code> are uniquely identified by this …\nA <code>World</code> manages objects that exist in “map-space”, the …\nThe result of a <code>World</code> handling an event\nStart adding an object to the <code>World</code>. The caller should …\nBegin adding an unnamed object to the <code>World</code>.\nFinalize the object, adding it to the <code>World</code>.\nCalculate the object currently underneath the cursor. This …\nMark the object as clickable. <code>WorldOutcome::ClickedObject</code> …\nDelete an object. Not idempotent – this will panic if …\nDelete an object, with the promise to recreate it with the …\nMark the object as draggable. The user can hover on this …\nDraw objects in the world that’re currently visible.\nSpecifies how to draw this object normally (while not …\nDraw the object by coloring its hitbox\nDraw the object by coloring its hitbox, only when …\nDraw the object in a hovered state by transforming the …\nSpecifies how to draw the object while the cursor is …\nDraw something underneath all objects. This is useful for …\nLike <code>draw_master_batch</code>, but for already-built objects.\nIndicate that an object doesn’t need to be drawn …\nLet objects in the world respond to something happening.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nIf an object is currently being hovered on, return its …\nReturns the object currently hovered on.\nForcibly reset the hovering state to empty. This is a …\nSpecifies the geometry of the object. Required.\nSpecifies the geometry of the object as a multipolygon.\nWhile the user hovers over this object, they can press a …\nDraw the object in a hovered state by changing the alpha …\nDraw the object in a hovered state by coloring its hitbox. …\nDraw the object in a hovered state by adding an outline to …\nAfter adding all objects to a <code>World</code>, call this to …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nMark that an object is hoverable, but don’t actually …\nLike delete, but doesn’t crash if the object doesn’t …\nIf the outcome references some ID, transform it to another …\nMaybe draw a tooltip while hovering over this object.\nCreates an empty <code>World</code>\nChange an object’s tooltip. Returns true for success, …\nIf a drag event causes the world to be totally rebuilt, …\nMark the object as clickable or not. …\nDraw a tooltip while hovering over this object.\nProvides ordering for overlapping objects. Higher values …\nCustomize how widgetry works. Most of these settings can’…\nReturns naming hint. Logically consumes the number of …\nLog every raw winit event to the DEBUG level.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nSets the text that’ll appear during long …\nSpecify the title of the window to open.\nWhen calling <code>Widget::draw_svg</code>, <code>ButtonBuilder::image_path</code>, …\nIf the screen width using the monitor’s detected scale …\nOverride the initial HiDPI scale factor from whatever …\nSets the window icon. This should be a 32x32 image.\nScreenDims is in units of logical pixels, as opposed to …\nScreenPt is in units of logical pixels, as opposed to …\nScreenRectangle is in units of logical pixels, as opposed …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\ntitle: name of previous screen, which you’ll return to\nAn “X” button\nAn “X” button to close the current state. Bound to the …\nA right facing caret, like “&gt;”, suitable for paging to …\nA left facing caret, like “&lt;”, suitable for paging to …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nNote this usually removes color from the icon. Use …\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nGet all entries, filtered and sorted according to the …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nRender a table with the specified headers and rows. Each …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nRender the text, without any autocropping. You can pass in …\nRender the text, autocropping blank space out of the …\nStore a cached key/value pair, only recalculating when the …\nChoose something from a menu, then feed the answer to a …\nLoads a JSON, bincoded, or raw file, then deserializes it\nDraw freehand polygons\nDraw freehand PolyLine\nDisplay a message dialog.\nPrompt for arbitrary text input, then feed the answer to a …\nUse this with FileLoader to just read raw bytes without …\nUtilities for reflecting the current map and viewport in …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nGet the current key.\nLoading large resources requires different strategies on …\n<code>update</code> is preferred, but sometimes <code>produce_value</code> needs to …\nOnly works on native\nClears the current pair and returns it.\nUpdate the value if the key has changed.\nGet the current value.\nGet the current value, mutably.\nChoose something from a menu, then feed the answer to a …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nDraw freehand polygons\nDraw freehand PolyLine\nWhen this returns a polygon, the interaction is finished\nWhen this returns a polyline, the interaction is finished\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nHow far do points need to be spaced apart to add?\nUse this with FileLoader to just read raw bytes without …\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nLoads a JSON, bincoded, or raw file, then deserializes it\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nDisplay a message dialog.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nPrompt for arbitrary text input, then feed the answer to a …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nTake a screenshot of the entire canvas, tiling it based on …\nUtilities for reflecting the current map and viewport in …\nParse an OSM-style <code>zoom/lat/lon</code> string …\nReturns the argument unchanged.\nGet an OSM-style <code>zoom/lat/lon</code> string …\nCalls <code>U::from(self)</code>.\nParse an OSM-style <code>zoom/lat/lon</code> string …\nModify the current URL to set –cam to an OSM-style …\nModify the current URL to change the first free parameter …\nModify the current URL to change the first named parameter …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nA dropdown, checkbox, spinner, etc changed values. The …\nAn action was done, with custom data. The caller must cast …\nWhen an action happens through a button-like widget, what …\nAn action was done\nOn a DragDrop widget, a member was clicked on and …\nSome named widget currently holds focus\nNothing happened\nThe result of a Panel handling an event\nCreate a new widget by implementing this trait. You can …\nThis doesn’t count against the entire container\nIf a new Panel is being created to replace an older one, …\nIf a new Panel is being created to replace an older one, …\nCreates a column with the specified widgets. Every member …\nThings like padding don’t work on many widgets, so just …\nCreates a column with the specified widgets. No margins or …\nCreates a row with the specified widgets. No margins or …\nReturns a boxed object from a boxed trait object if the …\nReturns a mutable reference to the object within the trait …\nReturns an <code>Rc</code>-ed object from an <code>Rc</code>-ed trait object if the …\nReturns a reference to the object within the trait object …\nDraw the widget. Be sure to draw relative to the top-left …\nCreates a column with the specified widgets, with a <code>spacing</code>…\nCreates a row with the specified widgets, with a <code>spacing</code> …\nYour chance to react to an event. Any side effects outside …\nThis one is really weird. percent_width should be LESS …\nLike flex_wrap, but doesn’t horizontally space out …\nOnly for rows/columns. Used to force table columns to line …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nWhat width and height does the widget occupy? If this …\nNeeded for force_width.\nIf the argument is true, don’t actually create this …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns true if the trait object wraps an object of type …\nThis widget produced an Outcome, and event handling should …\nCallers have to adjust padding too, probably\nThis widget changed dimensions, so recalculate layout.\nRestore state from the previous version of this widget, …\nRestore state from the previous version of this widget, …\nCreates a row with the specified widgets. Every member …\nYour widget’s top left corner should be here. Handle …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nWhen a button is clicked, <code>Outcome::Clicked</code> with this …\nSet a background color for the button based on the button…\nBuild a button.\nShorthand method to build a default widget whose <code>action</code> is …\nShorthand method to build a Button wrapped in a Widget\nSet independent rounding for each of the button’s corners\nSet a pre-rendered GeomBatch to use for the button instead …\nThe button cannot be clicked and will be styled as …\nSet a tooltip <code>Text</code> to appear when hovering over the …\nSet the font used by the button’s label.\nSet the size of the font of the button’s label.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nGet the button’s text label, if defined\nThe button’s items will be rendered in a horizontal row\nSet a hotkey for the button\nSet the image for the button. If not set, the button will …\nSet a background color for the image, other than the …\nSet the image for the button. If not set, the button will …\nRewrite the color of the button’s image.\nIf a custom <code>image_dims</code> was set, control how the image …\nSet independent rounding for each of the button’s image…\nScale the bounds containing the image. If <code>image_dims</code> are …\nDisplay the button’s image before the button’s label.\nSet padding for the image\nSet the image for the button. If not set, the button will …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nSet the color of the button’s label.\nDisplay the button’s label before the button’s image.\nAssign a pre-styled <code>Text</code> instance if your button need …\nSet the text of the button’s label.\nSet the text of the button’s label. The text will be …\nLike <code>disabled_tooltip</code>, but the tooltip may not exist.\nIf a <code>tooltip</code> is not specified, a default tooltip will be …\nSet an outline for the button based on the button’s …\nExtra spacing around a button’s items (label and/or …\nExtra spacing around a button’s items (label and/or …\nExtra spacing around a button’s items (label and/or …\nExtra spacing around a button’s items (label and/or …\nExtra spacing around a button’s items (label and/or …\nSpacing between the image and text of a button. Has no …\nSet a non-default tooltip <code>Text</code> to appear when hovering …\nSets a tooltip to appear whether the button is disabled or …\nThe button’s items will be rendered in a vertical column\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nIf a card is currently being dragged, return its original …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nThis widget emits several events.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nDoesn’t do anything by itself, just used for widgetsing. …\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCreates a square filler, always some percentage of the …\nUTF-8 encoded bytes of an SVG\nPreviously rendered graphics, in the form of a <code>GeomBatch</code>, …\nA stylable UI component builder which presents vector …\nThe visual\nPath to an SVG file\nSet a background color for the image. Has no effect unless …\nRender the <code>Image</code> and any styling (padding, background, …\nRewrite the color of the image.\nIf a custom <code>dims</code> was set, control how the image should be …\nSet independent rounding for each of the image’s …\nScale the bounds containing the image. If <code>dims</code> are not …\nAn <code>Image</code> with no renderable content. Useful for starting a …\nReturns the argument unchanged.\nReturns the argument unchanged.\nCreate a new <code>Image</code> from a <code>GeomBatch</code>.\nCreate a new SVG <code>Image</code> from bytes.\nCreate an SVG <code>Image</code>, read from <code>filename</code>, which is colored …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nProcess <code>self</code> into a <code>GeomBatch</code>.\nCreate a new <code>Image</code> based on <code>self</code>, but overriding with any …\nSet padding for the image. Has no effect unless custom <code>dims</code>…\nPadding below the image. Has no effect unless custom <code>dims</code> …\nPadding to the left of the image. Has no effect unless …\nPadding to the right of the image. Has no effect unless …\nPadding above the image. Has no effect unless custom <code>dims</code> …\nSet a new source for the <code>Image</code>’s data.\nSet the GeomBatch for the button.\nSet the bytes for the image.\nSet the path to an SVG file for the image.\nAdd a tooltip to appear when hovering over the image.\nThe image’s intrinsic colors will be used, it will not …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\n<code>batch</code>: the <code>GeomBatch</code> to draw <code>tooltips</code>: (hitbox, text, …\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\n<code>label</code> is used to name the actual LinePlot widget. The …\nProgrammatically show a tooltip at the given x/y.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nConsumes the autocomplete widget. It’s fine if the panel …\nGrab a stashed value and clone it.\nReturns an empty panel. <code>event</code> and <code>draw</code> will have no effect.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nWhen a panel is built, a fake, “no-op” mouseover event …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nAll margins/padding/etc from the previous widget are …\nGrab a stashed value, with the ability to pass it around …\nSwap the inner content of a <code>container</code> widget with …\nRemoves a widget from the panel. Does not recalculate …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nAn f64 rounded to 4 decimal places. Useful with Spinners, …\nA spinner for f64s should prefer using this, which will …\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCreates a spinner using the <code>SpinnerValue</code>’s default …\nCreates a spinner using a custom method for rendering the …\nAn invisible widget that stores some arbitrary data on the …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nRender a table with the specified headers and rows. Each …\nA widget containing the tab bar and a content pane with …\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nAdd a new tab.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\n<code>autofocus</code> means the text box always has focus; it’ll …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.")