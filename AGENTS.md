# Portfolio — dangvu0502.github.io

Personal portfolio of Dang Vu (Matt). **Being rewritten: Rust/Dioxus → Next.js** (decision 2026-09-13). The old Dioxus/WASM code in `src/` is the reference implementation for design and content until the rewrite lands, then gets deleted.

## Why the rewrite

- Job-search evals repeatedly flagged "no Next.js/SSR evidence" as the candidate's #1 gap (frontend/fullstack TS roles). The portfolio itself becomes the evidence.
- WASM-only rendering made the site invisible to bots (link unfurls, ATS tools, search) — SSG fixes it structurally.
- 1.9MB WASM payload contradicted the performance-focused positioning.

## Target Stack (versions verified 2026-09-13)

- **Next.js 16.x (App Router) + TypeScript + Tailwind CSS 4.x** (React 19, lucide-react 1.x)
- **Static export** (`output: 'export'`) → keeps GitHub Pages deploy; swap to Vercel later only if server features are ever needed (YAGNI now). Official reference: github.com/nextjs/deploy-github-pages
- **Tailwind v4 is CSS-first**: `@import "tailwindcss"` + `@theme` block for design tokens — no `tailwind.config.js` (delete the old one); no separate CLI watcher, use `@tailwindcss/postcss`
- **`next/image` default loader is unsupported in static export** — use plain `<img>` with explicit width/height (one avatar + a few logos; fine)
- Weather APIs verified live: ipwho.is (~300ms, `Access-Control-Allow-Origin: *`) and Open-Meteo (~900ms, CORS `*`, `current=weather_code,is_day` returns exactly the spec's fields)
- Content stays in `data/*.json` — same files, imported at build time (typed with a small `types.ts`)
- Icons: `lucide-react` (same icon set as the old `dioxus-free-icons` Lucide build)
- No CSS-in-JS, no UI kit, no state library — static content site

## Design carry-over (from the Dioxus version)

- Dark theme, terracotta accent `#c46846`, text `#e8dfd6`, body gray `#b0b0b0`, borders `#1f1f1f`, cards `#1a1a1a`/`#2a2a2a`
- Section shell: `max-w-[1200px] mx-auto py-12 md:py-20 border-b border-[#1f1f1f]`, inner `px-5 md:px-8`
- Sections in order: Hero (avatar, socials, bio, "Hire me" CTA) → Work Experience → Pinned Projects → Recent Projects → OSS Contributions → Footer
- Old components in `src/components/*.rs` hold the exact markup/classes — port, don't redesign

## Data contract (unchanged)

```
data/work-experience.json    company, company_site, role, location, dates, logo
data/pinned-projects.json    name, description, topics[], link
data/recent-projects.json    same shape (descriptions currently null — fix)
data/oss-contributions.json  repository, pr_number, link, title, state, dates
                             — refreshed by scripts/fetch-oss-contributions via
                             .github/workflows; do NOT hand-edit
```

The fetch script and workflow stay; only the site rendering changes.

## Migration plan

1. Scaffold Next.js (App Router, TS, Tailwind, static export) in this repo — new `app/`, `components/`, keep `data/`, `assets/` (move images to `public/`)
2. Port components 1:1 from `src/components/*.rs` (markup + Tailwind classes translate almost mechanically)
3. Metadata API: title, description, OpenGraph + Twitter cards, favicon (vendor the avatar into `public/`, don't hotlink GitHub)
4. Wire `.github/workflows` deploy to `next build` static export → Pages
5. Delete `src/`, `Cargo.*`, `Dioxus.toml`, `clippy.toml`, `dist/` once parity confirmed
6. Rewrite README for the new stack

## Improvement backlog (carried over, still prioritized)

### P0 — content
1. **`work-experience.json` missing the current job**: add sending.ac (Software Engineer, Nov 2025 – present — Logto SSO, Stripe billing incl. subscriptions/coupons, Sequencer integration 200+ automated workflows/day). Without it the career appears to end Aug 2025.
2. **Add achievement bullets + metrics to work experience** (schema + component): PageFly 200k+ active users; Built for Shopify: −20% initial load, LCP < 2.5s; Image-to-PageFly < 1 min/page; Figma2PageFly 1-click. The numbers are the sales pitch — currently absent from the page.
3. **Fill `recent-projects.json` null descriptions** (write here, don't depend on GitHub repo descriptions).

### P1 — performance (the positioning must survive the rewrite)
4. Budget: total transfer < 500KB, LCP < 2s on throttled mobile. Next.js static export makes this easy — keep it that way: `next/image` (or plain `<img>` with explicit dimensions in export mode), self-hosted avatar, font strategy (system stack or one subsetted `next/font`), no client components unless interactive.
5. Run Lighthouse pre/post; the score is an interview talking point.

### P2 — polish
6. Accessibility: contrast check `#b0b0b0` on dark, `lang` attr, focus-visible styles, `prefers-reduced-motion` guard.
7. Real 404 page (free in Next).
8. Bio line "Currently exploring Rust and WebAssembly" → replace; new honest hook: "Rebuilt this site in Next.js (SSG); previous version was Rust/Dioxus compiled to WASM — both on GitHub." Keep the old repo/branch public as proof.

### P3 — growth
9. Case-study pages (now trivial with routes): PageFly performance work, Image-to-PageFly, Vectra — problem → approach → measured result each.
10. Optional blog via MDX later. No CMS. (YAGNI until there are ≥2 posts to publish.)

## Feature: Weather-Reactive Theme (post-migration)

Style adapts to real-time weather at the visitor's location. Progressive enhancement ONLY — the default dark theme renders instantly and stays if anything fails.

**Data flow (client component, runs after mount):**
1. Location: IP-based via `https://ipwho.is/` (free, keyless, CORS-enabled) → lat/lon. NEVER `navigator.geolocation` — no permission popups on a portfolio.
2. Weather: Open-Meteo `https://api.open-meteo.com/v1/forecast?latitude=..&longitude=..&current=weather_code,is_day` (free, keyless).
3. Map WMO `weather_code` + `is_day` to a theme: `clear-day`, `clear-night`, `cloudy`, `rain`, `snow`, `thunder` (6 is enough; group the ~30 WMO codes).
4. Apply by setting `data-weather` on `<html>`; themes are CSS-variable overrides (accent, bg tint, subtle ambient gradient). Base palette = current design = the no-data default.
5. Cache result in `sessionStorage` (1h TTL) — one lookup per visit, instant on navigation.

**Rules:**
- Both fetches: 3s timeout, try/catch, silent fallback to default theme. No spinners, no layout shift — theme fades in via `transition` on the variables.
- Optional tiny caption in the hero ("Rainy in {city}? ☔️ Nice day to hire a frontend dev") — cute, shows the feature is deliberate; omit city if lookup failed.
- Keep it ONE client component + one CSS file of `[data-weather=...]` variable blocks. No weather libraries, no canvas/particle effects (perf budget stands; a CSS gradient shift is the ceiling).
- Respect `prefers-reduced-motion` for any ambient animation.
- This becomes an interview talking point: name it in the case-study/README (graceful degradation, keyless architecture, WMO mapping).

## What NOT to do

- No 3D/WebGL hero (decision 2026-09-13): payload contradicts the performance pitch, recruiters don't score it. Revisit only after P0/P1 done AND budget still met.
- Don't move content into components — `data/*.json` stays the content layer.
- Don't hand-edit `data/oss-contributions.json` (CI overwrites).
- No UI kits, no CSS-in-JS, no client-side data fetching for static content.
