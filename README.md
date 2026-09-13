# dangvu0502.github.io

Personal portfolio. Next.js 16 (App Router) static export, TypeScript, Tailwind CSS 4. Deployed to GitHub Pages.

Previous version was Rust/Dioxus compiled to WASM — see git history before the Next.js rewrite (Sep 2026).

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in ./out
```

## Content

All content lives in `data/*.json`, imported at build time:

- `work-experience.json` — jobs, with optional `highlights[]`
- `pinned-projects.json` — hand-curated
- `recent-projects.json` — repos refreshed monthly by CI; hand-written `description` values survive the refresh when GitHub has none
- `oss-contributions.json` — refreshed monthly by CI, do not hand-edit

Refresh script: `scripts/fetch-oss-contributions` (Rust), run by `.github/workflows/update-oss-contributions.yml`.

## Weather-reactive theme

Progressive enhancement in `components/WeatherTheme.tsx` + `app/weather.css`. After mount: IP lookup via ipwho.is, then Open-Meteo current `weather_code` + `is_day`, mapped to one of six themes (`clear-day`, `clear-night`, `cloudy`, `rain`, `snow`, `thunder`) and applied as `data-weather` on `<html>`. Themes are CSS-variable overrides only. Keyless, no geolocation prompt, 3s timeouts, silent fallback to the default palette, 1h `sessionStorage` cache.

## Deploy

Push to `main` runs `.github/workflows/deploy.yml`: `npm ci && npm run build`, uploads `./out` to Pages.
