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

- `story.json` — name, tagline, links, and the story paragraphs (HTML strings)
- `pinned-projects.json` — the Projects rows, hand-curated
- `recent-projects.json` — refreshed monthly by CI, currently not rendered
- `oss-contributions.json` — refreshed monthly by CI, do not hand-edit

Refresh script: `scripts/fetch-oss-contributions` (Rust), run by `.github/workflows/update-oss-contributions.yml`.

## Weather panel

`components/WeatherPanel.tsx` (the only client component) + `app/weather.css`. After mount: IP lookup via ipwho.is, then Open-Meteo current `weather_code`, `is_day`, `temperature_2m`, mapped to one of six themes (`clear-day`, `clear-night`, `cloudy`, `rain`, `snow`, `thunder`) and applied as `data-weather` on `<html>`. Palette and the pixel scene are CSS-variable overrides only. Keyless, no geolocation prompt, 3s timeouts, silent fallback to the default palette, 1h `sessionStorage` cache.

The scene is a CC0 parallax forest by MatiasVME (OpenGameArt), 8 PNG layers in `public/weather/`, recolored per weather with CSS filters; rain, snow, stars and lightning are CSS gradients. A weather-matched Pokémon is picked at random from a per-theme pool and its sprite and Pokédex text are fetched live from PokeAPI (nothing bundled). Sprites are Nintendo / Game Freak / Creatures property, used here as non-commercial fan content.

## Deploy

Push to `main` runs `.github/workflows/deploy.yml`: `npm ci && npm run build`, uploads `./out` to Pages.
