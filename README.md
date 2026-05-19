# Agro-Mind Presentation Deck

Interactive slide-by-slide presentation for the **Agro-Mind** AI crop disease classification project.

## Stack

- Vite + React
- Tailwind CSS v4 (dark green/AI aesthetic)
- Framer Motion (slide transitions + in-slide animations)
- Lucide React (icons)

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:5173` — optimized for 1920×1080 projector/laptop.

## Navigation

| Key | Action |
|-----|--------|
| `→` / `Space` | Next slide |
| `←` | Previous slide |
| `1`–`6` | Jump to slide |
| `F` | Toggle fullscreen |
| Click dots / arrows | Navigate |

## Slides

1. **Title** — Hero with particle canvas, animated logo
2. **Team** — 4 AI engineers with staggered card entrance
3. **Problem** — Animated 62% counter with glitch effect + problem bullets
4. **Solution** — 7-stage pipeline (click any box for detail)
5. **Timeline** — Gantt chart: 5 weeks, Phase 1 vs Phase 2
6. **Architecture** — System diagram with clickable nodes + key features panel

## File Layout

```
src/
├── App.jsx                    # Slide manager + keyboard listeners
├── main.jsx
├── index.css
├── components/
│   ├── SlideLayout.jsx        # Progress bar, slide badge, logo watermark
│   ├── SlideNav.jsx           # Bottom navigation dots + arrows
│   ├── AnimatedCounter.jsx    # Count-up animation
│   ├── Logo.jsx               # Inline SVG logo (leaf + neural net)
│   └── visuals/
│       ├── PipelineFlow.jsx
│       ├── ModelComparison.jsx
│       ├── TimelineGantt.jsx
│       └── ArchitectureDiagram.jsx
├── slides/
│   ├── Slide01_Title.jsx
│   ├── Slide02_Team.jsx
│   ├── Slide03_Problem.jsx
│   ├── Slide04_Solution.jsx
│   ├── Slide05_Timeline.jsx
│   └── Slide06_Architecture.jsx
└── data/
    ├── team.js
    ├── pipeline.js
    └── timeline.js
```
