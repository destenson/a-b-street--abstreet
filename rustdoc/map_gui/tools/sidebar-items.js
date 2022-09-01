window.SIDEBAR_ITEMS = {"constant":[["NEXT_RELEASE",""]],"enum":[["Executable",""]],"fn":[["app_header","A standard way to group a home button back to the title screen, the title of the current app, and a button to change maps. Callers must handle the `change map` and `home` click events."],["change_map_btn","A button to change maps, with default keybindings"],["checkbox_per_mode",""],["cmp_count","Less is better"],["cmp_dist","Shorter is better"],["cmp_duration","Shorter is better"],["color_for_mode",""],["draw_isochrone","Thresholds are Durations, in units of seconds"],["draw_overlapping_paths",""],["find_exe","Returns the path to an executable. Native-only."],["goal_marker","Draw a goal marker pointing at something."],["grey_out_map","Make it clear the map can’t be interacted with right now."],["home_btn","A button to return to the title screen"],["intersections_from_roads",""],["loading_tips",""],["make_heatmap",""],["nice_country_name",""],["nice_map_name",""],["percentage_bar",""],["prompt_to_download_missing_data",""],["start_marker","Draw a start marker pointing at something."],["update_url_map_name","Modify the current URL to set the first free parameter to the current map name."],["version","Returns the version of A/B Street to link to. When building for a release, this points to that new release. Otherwise it points to the current dev version."]],"mod":[["camera",""],["city_picker",""],["colors",""],["command",""],["compare_counts",""],["draw_overlapping_paths",""],["heatmap",""],["icons",""],["importer",""],["labels",""],["minimap",""],["navigate",""],["polygon",""],["title_screen",""],["trip_files",""],["turn_explorer",""],["ui","Generic UI tools. Some of this should perhaps be lifted to widgetry."],["updater",""],["waypoints",""]],"struct":[["CameraState","Represents the state of a widgetry Canvas."],["CityPicker","Lets the player switch maps."],["ColorDiscrete",""],["ColorNetwork",""],["DefaultMap","Track the last map used, to resume next session."],["DrawRoadLabels","Labels roads when unzoomed. Label size and frequency depends on the zoom level."],["DrawSimpleRoadLabels","Draws labels in map-space that roughly fit on the roads. Don’t change behavior during zooming; labels are only meant to be legible when zoomed in."],["EditPolygon",""],["FilePicker",""],["Grid","A 2D grid containing some arbitrary data."],["HeatmapOptions",""],["InputWaypoints","Click to add waypoints, drag them, see the list on a panel and delete them. The caller owns the Panel and the World, since there’s probably more stuff there too."],["Minimap",""],["Navigator",""],["RunCommand","Executes a command and displays STDOUT and STDERR in a loading screen window. Only works on native, of course."],["TitleScreen","A title screen shared among all of the A/B Street apps."],["TripManagement","Save sequences of waypoints as named trips. Basic file management – save, load, browse. This is useful to define “test cases,” then edit the bike network and “run the tests” to compare results."],["TurnExplorer","A tool to explore all of the turns from a single lane."],["WaypointID",""]],"trait":[["MinimapControls","Customize the appearance and behavior of a minimap."],["TripManagementState",""]]};