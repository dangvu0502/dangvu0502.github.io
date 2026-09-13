# Portfolio — dangvu0502.github.io

Personal portfolio of Dang Vu (Matt). **Rewrite Rust/Dioxus → Next.js landed 2026-09-13** (live at dangvu0502.github.io, Lighthouse 100/100/100/100, 165KB). Old `src/` deleted; git history before that date has the Dioxus version. Weather-reactive theme shipped same day. **v3 redesign ported to Next.js 2026-09-13** (see "Redesign direction" below; `.claude/preview/redesign.html` is the committed design reference and has a test bar for all six themes).

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
- Icons: inline SVG (3 icons). `lucide-react` 1.x dropped brand icons (GitHub/LinkedIn), so no icon dependency.
- No CSS-in-JS, no UI kit, no state library — static content site

## Design carry-over (from the Dioxus version)

- Dark theme, terracotta accent `#c46846`, text `#e8dfd6`, body gray `#b0b0b0`, borders `#1f1f1f`, cards `#1a1a1a`/`#2a2a2a`
- Section shell: `max-w-[1200px] mx-auto py-12 md:py-20 border-b border-[#1f1f1f]`, inner `px-5 md:px-8`
- Sections in order: Hero (avatar, socials, bio, "Hire me" CTA) → Work Experience → Pinned Projects → Recent Projects → OSS Contributions → Footer
- Old components in `src/components/*.rs` hold the exact markup/classes — port, don't redesign

## Redesign direction (research 2026-09-13)

Roast verdict from UX + UI agents on the ported site: "generic mid fullstack, nothing distinctive". Root cause: no headline, 3 font sizes, every section an identical card, numbers buried in 14px grey bullets, three jokes (rocket, heart, weather pun), padding projects (`vps`, two repos named "homework").

First redesign attempt (`.claude/preview/redesign.html`, v1) failed too: big display h1, stat tiles, 2x2 cards, animated underline. Reads as a landing-page template. Rejected.

Research (last30days + 13 reference sites: leerob.com, paco.me, emilkowal.ski, nexxel.dev, delba.dev, brittanychiang.com, rauno.me, alexcarpenter.me, preetsuthar.me, jhey.dev, antfu.me, jahir.dev, samuelkraft.com) converged on:

**Do**
1. **Letter, not landing page.** One column, ~1200 words, `max-w-[65ch]`. Reads like a well-typeset letter. No hero illustration, no stat tiles, no skill bars.
2. **First line states the ask** (delba.dev): "Looking for a remote frontend/fullstack TS role. UTC+7, overlaps EU and US-West mornings." Then name, then proof.
3. **Numbers on every experience entry**, 2-3 metric bullets, bold digits. Projects with no outcome get cut, not described. Keep 3-4 projects max.
4. **One signature interaction, framed as craft** (rauno.me): the weather theme. Name it as engineering (WMO mapping, keyless, silent fallback, 6 themes, click to preview). Drop the pun caption.
5. **Third-party proof** (alexcarpenter.me): 2-3 peer quotes from PageFly / sending.ac colleagues, static JSON, next to the live OSS PR list.
6. **A "Now" section** in real voice (paco.me). Impossible to template.
7. Typography carries the page: one type scale used fully (12/14/16/20/28/40), section titles small-caps eyebrow + plain heading, `tabular-nums` on every number. Font: system stack or one self-hosted face, weight 500 max, under 25KB.

**Don't (reads as template/AI in 2026)**
- Glassmorphism, macOS-dock nav, gradient-blob hero, cursor particles, typing-effect headline, scroll-fade on every section
- Skills grid of logos or percentage bars
- "passionate", "crafting seamless experiences", "AI-powered web experiences"
- Emoji in CTA or footer, weather pun above the name
- Project cards that only list a stack + GitHub link
- More than one interaction flourish

**Section order (v3, user-trimmed 2026-09-13)**: H1 "Dang Vu" → one sans line "Matt · fullstack engineer · TypeScript, React, Next.js, Node · Hanoi" → **the story**: 4 prose paragraphs, chronological (FPT trainee 2022 → Bravebits/PageFly 3 years with performance numbers, Image-to-PageFly, Figma2PageFly → sending.ac since Nov 2025, billing/SSO/sequencer → OSS + this site). No Experience section, no bullet list, no bio toggle; user asked for "a story of my work" instead of a résumé block (2026-09-13). → CTA row → Projects (personal, 3 rows with outcome; heading is "Projects", not "Work") → Open source rows → Footer. Right sticky panel: Pokémon weather card. Background = CC0 pixel-art parallax forest by MatiasVME on OpenGameArt (8 layer PNGs in `.claude/preview/weather/fx-*.png`, 68KB total, 1280x360 each, stacked with `background-size: auto 62%` at bottom, sky PNG stretched over a CSS gradient; per-weather look is CSS-only: `--sky-top/--sky-mid`, a `filter` on the scene layers (night = brightness .42 + hue-rotate 190, cloudy = saturate .45, etc.), sun layer hidden except clear-day, CSS star tiles at night, gradient-tile rain/snow overlay, `steps(1)` lightning flash for thunder, clouds drift 90s). The ukiyo-e prints (`weather/print-*.jpg`) were the previous iteration, superseded, delete before porting. A Pokémon sprite stands on the scene. **Dynamic (user request 2026-09-13)**: per-weather pool of PokeAPI ids, random pick per visit, cached in sessionStorage per theme; sprite GIF loaded from PokeAPI/sprites on GitHub raw, name/genus/types/flavor fetched live from `pokeapi.co/api/v2/pokemon/{id}` + species; fallback to Castform if fetch fails. Pools: cloudy 351 Castform, 333 Swablu, 426 Drifblim, 358 Chimecho · clear-day 10013 Castform Sunny, 338 Solrock, 637 Volcarona, 192 Sunflora · clear-night 337 Lunatone, 92 Gastly, 200 Misdreavus, 425 Drifloon, 488 Cresselia · rain 10014 Castform Rainy, 382 Kyogre, 592 Frillish, 535 Tympole, 270 Lotad · snow 10015 Castform Snowy, 361 Snorunt, 582 Vanillite, 615 Cryogonal, 478 Froslass · thunder 279 Pelipper, 186 Politoed, 593 Jellicent, 226 Mantine, 641 Tornadus (user rule: no Electric types in storms, matches game spawn logic; storm pool = Drizzle summoners and storm fliers). Kyogre (382) skipped, 172KB sprite. Prefer legless/floating mons (patrol animation). Loading state: an inline pixel-SVG Pokéball wobbles on the stage and the header reads "Looking up your sky…"; when the sprite GIF fires `onLoad` the ball bursts (`burst` keyframe) and the sprite pops in (`popin`), then patrols. Earlier static mapping (user likes Pokémon; Castform is the weather Pokémon and changes form with weather, so: cloudy=Castform, clear-day=Castform Sunny, rain=Castform Rainy, snow=Castform Snowy, thunder=Zapdos (user rejected Pikachu; Thundurus was the better fit but its GIF is 296KB, Zapdos is 8KB), clear-night=Lunatone (user replaced Umbreon; prefers legless/floating Pokémon for the patrol animation, Lunatone is the moon meteorite, 42KB); sprite patrols left↔right across the stage on a 16s loop with `scaleX` flip; rain = pill-shaped pixel dashes on two spaced tiles with `steps(6)` animation, thunder adds a pixel SVG bolt synced to the flash keyframes; animated Gen V GIFs from PokeAPI/sprites vendored as `weather/poke-*.gif`, 12-39KB, `image-rendering: pixelated`; Nintendo copyright, fan-use grey area, user accepted), Meteocons glyph removed, then under the header line: the Pokémon name in the theme accent color and one Pokédex flavor sentence, nothing else (user cut in order: genus, type badge, the "X appeared" suffix on the header line), one header line `30° · overcast · Hanoi · 16:00` from live ipwho.is + Open-Meteo (use ipwho.is `region` for the place name, not `city`; `city` is district-level like "Tay Tuu", `region` is "Hanoi") (`current=weather_code,is_day,temperature_2m&timezone=auto`). Nothing else. User cut from the panel: "This page follows your weather" label, the 6 theme preview buttons, pipeline trace log lines, art credit line, hand-built CSS sky/rain/lightning (user wants found illustrations, not self-built art). User cut: the "Open to a remote role, UTC+7" ask line (no stated-intent line at top), bio toggle, Notes list, colleague quotes, Now section, resume PDF link (CTA row is Email, GitHub, LinkedIn only). Do not re-add without asking.

**leerob.com skeleton (measured 2026-09-13, v3 preview adopts it):** reading column `width: min(100%, 600px)`; page pad `clamp(1.25rem, 3.4vw, 3.25rem)`; two-col grid `minmax(0,1.75fr) minmax(380px,1fr)` on wide screens, right column is a sticky visual panel (`height: calc(100svh - 2*pad)`, rounded 10px, 1px border) which we repurpose as the weather craft panel; body serif `Iowan Old Style, Palatino, Georgia` 17px/1.6, UI sans for dates/labels 14px; title 38px weight 600 `-.02em`; h2 1.45rem weight 600; links grey (`--nav`) underlined at 30% alpha, hover brightens; bio has Short/Long toggle (underline tab, 14px); "Notes" = 2-column square-bullet list; blog rows = grid `1fr auto`, baseline-aligned, 1px dividers, date right in tabular sans, whole list dims to .8 opacity and hovered row goes 1. Sections spaced 3.5rem. Under 640px: single column, 16px, one-col notes.

Preview lives at `.claude/preview/redesign.html` (standalone HTML, open in browser). Iterate there before porting to components. Do NOT publish previews as claude.ai artifacts (user preference).

## Data contract

```
data/story.json              name, line, email, github, linkedin, paragraphs[] (HTML strings; the top-of-page story)
data/pinned-projects.json    name, description, topics[], link  (the 3 "Projects" rows)
data/recent-projects.json    same shape, refreshed by CI but NOT rendered since the v3 redesign
(work-experience.json deleted 2026-09-13; experience lives in story.json paragraphs)
data/oss-contributions.json  repository, pr_number, link, title, state, dates
                             — refreshed by scripts/fetch-oss-contributions via
                             .github/workflows; do NOT hand-edit
```

The fetch script and workflow stay; only the site rendering changes.

## Migration plan (DONE 2026-09-13, kept for history)

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
