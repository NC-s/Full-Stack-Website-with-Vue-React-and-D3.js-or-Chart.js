# Quantitative Front-End Engineer Portfolio

A Vue 3 + TypeScript single-page experience that demonstrates the skills required to build high-performance monitoring and visualisation tools for quantitative trading teams. The UI streams telemetry from a Node.js API that is continuously fed by a Python metrics pipeline and renders the insights with Chart.js.

## Highlights

- **Typed Vue architecture** – Composition API components, Pinia store, and Tailwind-powered theming for maintainable, scalable interfaces.
- **Realtime visualisation** – Chart.js line chart wired to a polling cadence that surfaces live latency data and system health signals.
- **Polyglot data pipeline** – Python script simulates venue metrics, Node.js API normalises the payload, and the Vue client consumes the feed.
- **Hiring-focused storytelling** – Sections call out quant-friendly strengths: collaboration, delivery signals, and operational excellence.

## Project structure

```text
.
├── index.html                # Vite entry point
├── package.json              # Front-end + API dependencies
├── server/
│   ├── data/metrics.json     # Seed data refreshed by the Python pipeline
│   ├── data_pipeline.py      # Synthetic data generator
│   └── index.js              # Express API exposing /api/metrics
├── src/
│   ├── App.vue               # Root layout and portfolio content
│   ├── components/           # Hero, telemetry dashboard, chart component
│   ├── stores/metricsStore.ts# Pinia store fetching backend data
│   └── types.ts              # Shared TypeScript interfaces
└── vite.config.ts            # Dev server + proxy configuration
```

## Getting started

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Start the synthetic data pipeline** (optional but recommended)
   ```bash
   pnpm run pipeline
   ```

   This script rewrites `server/data/metrics.json` every five seconds with fresh metrics.

3. **Run the Node.js metrics API**
   ```bash
   pnpm run server
   ```

   The API listens on `http://localhost:4000` and serves `/api/metrics`. The Vite dev server proxies requests there.

4. **Launch the Vue client**
   ```bash
   pnpm run dev
   ```

   Visit the printed URL (defaults to `http://localhost:5173`). The dashboard will poll the API and update the Chart.js view in real time.

5. **Build for production**
   ```bash
   pnpm run build
   ```

## Accessibility & performance notes

- Semantically structured sections, headings, and ARIA labels for assistive tech.
- Colour palette chosen for contrast ratios > 4.5:1 in dark mode contexts.
- Chart tooltips and dataset colours respect colour-blind friendly hues.
- Bundled with Vite for fast HMR and optimised production builds.

## License

MIT
