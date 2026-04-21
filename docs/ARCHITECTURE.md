# SichtbarML Platform Architecture

This project uses a modular React SPA with D3 + Observable Plot rendering modules.

## Why React + Vite for this archetype

- The original archetype already has a clear split between math engine, state, and rendering.
- React gives reusable shell/navigation components and accessibility tooling.
- Vite provides fast startup for iterative visualization development.
- Each visualization can remain mostly framework-agnostic by exposing a small definition object.

## Directory structure

- src/core: generic app infrastructure
- src/platform: shell-level components and visualization registry
- src/features/visualizations: plug-in modules per visualization

A visualization module should define:

- params: control schema
- getInitialState: default state snapshot
- computeHUD: derived metrics for dashboard cards
- buildPlot: D3/Plot rendering function

## Plug-in workflow for future modules

1. Add a new folder under src/features/visualizations/{id-name}.
2. Implement engine.js for math logic.
3. Implement definition.js for params, state defaults, HUD, and plot builder.
4. Register it in src/platform/registry/visualizations.js.
5. The app shell automatically handles navigation, state reset, controls, and rendering.

This keeps future prompts focused on math/visualization logic instead of UI plumbing.
