"use client";

import { useEffect, useRef, useState } from "react";

type Theme = "clear-day" | "clear-night" | "cloudy" | "rain" | "snow" | "thunder";
type Weather = { theme: Theme; city: string | null; temp: number | null; hour: number | null };
type Mon = { id: number; name: string; form: string | null; text: string };

const TTL = 60 * 60 * 1000; // creature pick only; weather is always fetched fresh
const NAME: Record<Theme, string> = { "clear-day": "clear", "clear-night": "clear night", cloudy: "overcast", rain: "rain", snow: "snow", thunder: "thunderstorm" };

// Per-weather Pokémon pools (PokeAPI ids). Random pick per visit, cached per theme.
// Rule: no Electric types in storms (matches game spawn logic). Prefer legless/floating mons.
const POOL: Record<Theme | "", number[]> = {
  "": [351, 333, 426],
  cloudy: [351, 333, 426, 358],
  "clear-day": [10013, 338, 637, 192],
  "clear-night": [337, 92, 200, 425, 488],
  rain: [10014, 382, 592, 535, 270],
  snow: [10015, 361, 582, 615, 478],
  thunder: [279, 186, 593, 226, 641],
};
const SPRITE = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
const FALLBACK_MON: Mon = { id: 351, name: "Castform", form: null, text: "Its form changes depending on the weather." };

// A greeting about the visitor's own weather. {city} is filled from the IP
// lookup; lines are written so they still read if the city is unknown.
const GREETING: Record<Theme | "", string[]> = {
  "": ["Thanks for stopping by.", "Good to see you here.", "Glad you dropped in."],
  "clear-day": ["Clear skies {in} today. Hope the light is good.", "Sunny one {in}. Have a good day out there.", "Bright {in} right now. Thanks for visiting."],
  "clear-night": ["Clear night {in}. Thanks for stopping by this late.", "Stars are out {in}. Nice of you to drop in.", "Quiet night {in}. Glad you came."],
  cloudy: ["Grey {in} right now. Good weather for staying in and reading.", "Overcast {in} today. Take it easy.", "Cloudy {in}. Thanks for the visit."],
  rain: ["Rain {in} today. Stay dry out there.", "It's wet {in}. Hope you kept an umbrella.", "Raining {in} right now. Thanks for coming by."],
  snow: ["Snow {in} today. Keep warm out there.", "Cold one {in}. Wrap up well.", "Snowing {in}. Stay cosy."],
  thunder: ["Storm {in} right now. Hope you're somewhere safe and dry.", "Thunder {in} today. Mind how you go.", "Rough weather {in}. Take care out there."],
};
const LATE = "Late where you are. Get some sleep after this.";

// Good wishes for whoever is visiting. Shown after the weather line, cycling.
const WISHES = [
  "May good luck find you often.",
  "Wishing you an easy life.",
  "Hope the rest of your day is kind.",
  "May things go your way this week.",
  "Wishing you steady days and good sleep.",
  "Hope something good is waiting for you.",
  "May your work feel lighter tomorrow.",
  "Wishing you calm and good company.",
];
const cap = (w: string) => w.charAt(0).toUpperCase() + w.slice(1);

// WMO weather interpretation codes, grouped.
export function toTheme(code: number, isDay: boolean): Theme {
  if (code >= 95) return "thunder";
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "snow";
  if (code >= 51) return "rain";
  if (code >= 2) return "cloudy";
  return isDay ? "clear-day" : "clear-night";
}

async function getJson(url: string): Promise<Record<string, unknown>> {
  const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
  if (!res.ok) throw new Error(String(res.status));
  return res.json();
}

function cached<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { at, data } = JSON.parse(raw);
    return Date.now() - at < TTL ? data : null;
  } catch {
    return null;
  }
}
function store(key: string, data: unknown) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), data }));
  } catch {
    /* ponytail: storage unavailable, fine */
  }
}

async function lookup(): Promise<Weather> {
  const loc = await getJson("https://ipwho.is/");
  const wx = await getJson(
    `https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current=weather_code,is_day,temperature_2m&timezone=auto`,
  );
  const cur = wx.current as { weather_code: number; is_day: number; temperature_2m: number; time: string };
  const local = new Date(cur.time);
  return {
    theme: toTheme(cur.weather_code, cur.is_day === 1),
    city: ((loc.region as string) || (loc.city as string)) ?? null, // region is the city-level name; loc.city is often a district
    temp: cur.temperature_2m,
    hour: local.getHours() + local.getMinutes() / 60,
  };
}

async function summon(theme: Theme | ""): Promise<Mon> {
  const key = "poke:" + theme;
  const hit = cached<Mon>(key);
  if (hit) return hit;
  const pool = POOL[theme];
  const id = pool[Math.floor(Math.random() * pool.length)];
  try {
    const pk = (await getJson(`https://pokeapi.co/api/v2/pokemon/${id}`)) as { name: string; species: { url: string } };
    const sp = (await getJson(pk.species.url)) as { name: string; flavor_text_entries: { language: { name: string }; flavor_text: string }[] };
    const en = sp.flavor_text_entries.filter((e) => e.language.name === "en");
    const mon: Mon = {
      id,
      name: cap(sp.name),
      form: pk.name.includes("-") ? cap(pk.name.split("-")[1]) + " Form" : null,
      text: (en[en.length - 1]?.flavor_text ?? "").replace(/[\n\f]/g, " "),
    };
    store(key, mon);
    return mon;
  } catch {
    return FALLBACK_MON;
  }
}

// Glue the last two words together so a lone word never wraps to its own line.
function noOrphan(text: string): string {
  return text.replace(/ (\S+)$/, "\u00a0$1");
}

function greet(theme: Theme | "", hour: number | null, city: string | null): string {
  const h = hour ?? new Date().getHours();
  if (h >= 23 || h < 5) return LATE;
  const lines = GREETING[theme];
  const pick = lines[Math.floor(Math.random() * lines.length)];
  // "{in}" becomes "in Berlin", or "where you are" when the city is unknown.
  return pick.replace("{in}", city ? `in ${city}` : "where you are");
}

function shuffle<T>(list: T[]): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Opening line is about the weather; the rest are wishes, in a random order.
function script(theme: Theme | "", hour: number | null, city: string | null): string[] {
  return [greet(theme, hour, city), ...shuffle(WISHES).slice(0, 4)];
}

function fmtHour(h: number) {
  return `${String(Math.floor(h)).padStart(2, "0")}:${String(Math.round((h % 1) * 60)).padStart(2, "0")}`;
}

export default function WeatherPanel() {
  const [wx, setWx] = useState<Weather | null>(null);
  const [mon, setMon] = useState<Mon | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [settled, setSettled] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [line, setLine] = useState(0);
  const [bubbleOpen, setBubbleOpen] = useState(true);
  const wxRef = useRef<Weather | null>(null);
  const previewRef = useRef(0);
  wxRef.current = wx;

  useEffect(() => {
    let alive = true;
    (async () => {
      let data: Weather | null = null;
      try {
        data = await lookup(); // fetched every visit: cached weather drifts from the real sky
      } catch {
        data = null; // silent fallback: default theme stays
      }
      if (!alive) return;
      if (data) document.documentElement.dataset.weather = data.theme;
      setWx(data);
      setSettled(true);
      const m = await summon(data?.theme ?? "");
      if (!alive) return;
      setMon(m);
      setLines(script(data?.theme ?? "", data?.hour ?? null, data?.city ?? null));
      setLine(0);
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Dev switcher (localhost only) asks for a different sky: swap creature and
  // greeting too, not just the scene.
  useEffect(() => {
    const onPreview = async (e: Event) => {
      const theme = (e as CustomEvent<Theme | "">).detail;
      const run = ++previewRef.current; // ignore results from a superseded click
      const prev = wxRef.current;
      setLoaded(false);
      setMon(null);
      setBubbleOpen(true);
      setWx(theme ? { theme, city: prev?.city ?? null, temp: prev?.temp ?? null, hour: prev?.hour ?? null } : null);
      setSettled(true);
      const m = await summon(theme);
      if (previewRef.current !== run) return;
      setMon(m);
      setLines(script(theme, prev?.hour ?? null, prev?.city ?? null));
      setLine(0);
    };
    window.addEventListener("weather-preview", onPreview);
    return () => window.removeEventListener("weather-preview", onPreview);
  }, []);

  const [shown, setShown] = useState<string | null>(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!bubbleOpen || lines.length < 2) return;
    const id = setInterval(() => {
      setFading(true); // fade the current line out, swap at the halfway point
      setTimeout(() => {
        setLine((i) => (i + 1) % lines.length);
        setFading(false);
      }, 700);
    }, 15000);
    return () => clearInterval(id);
  }, [bubbleOpen, lines]);

  useEffect(() => {
    setShown(lines[line] ?? null);
  }, [lines, line]);

  const hello = shown;

  const parts = wx
    ? [wx.temp != null ? `${Math.round(wx.temp)}°` : null, `<b>${NAME[wx.theme]}</b>`, wx.city, wx.hour != null ? fmtHour(wx.hour) : null].filter(Boolean)
    : [settled ? "<b>default palette</b>" : "Looking up your sky…"];

  return (
    <aside className="visual" aria-label="Weather">
      <div className="scene" aria-hidden="true">
        <div className="l-sky" /><div className="l-stars" /><div className="l-sun" /><div className="l-cl" /><div className="l-cl2" />
        <div className="l-m3" /><div className="l-m2" /><div className="l-m1" /><div className="l-rk" /><div className="l-tr" />
        <div className="l-fog" /><div className="l-wx" />
        <div className="l-bolt">
          <svg viewBox="0 0 14 38" aria-hidden="true">
            <path fill="#fff7c2" d="M8 0h5l-4 12h4L4 38l3-18H3z" />
            <path fill="#ffe66b" d="M8 1h3l-4 12h3L6 30l2-16H5z" opacity=".9" />
          </svg>
        </div>
      </div>
      <div className="stage">
        <svg className={"ball" + (loaded ? " ball-open" : "")} viewBox="0 0 16 16" aria-hidden="true" shapeRendering="crispEdges">
          <path fill="#1a1a1a" d="M5 0h6v1h2v1h1v1h1v2h1v6h-1v2h-1v1h-1v1h-2v1H5v-1H3v-1H2v-1H1v-2H0V5h1V3h1V2h1V1h2z" />
          <path fill="#e8352e" d="M5 1h6v1h2v1h1v1h1v3H1V4h1V3h1V2h2z" />
          <path fill="#f4f0e8" d="M1 9h14v2h-1v2h-1v1h-1v1h-2v1H6v-1H4v-1H3v-1H2v-2H1z" />
          <path fill="#1a1a1a" d="M1 7h5v1h4V7h5v2h-5v1H6V9H1z" />
          <path fill="#f4f0e8" d="M7 7h2v2H7z" />
        </svg>
        {mon && (
          <div className={"poke-wrap" + (loaded ? " poke-in" : "")}>
            {hello && loaded && bubbleOpen && (
              <p className={"bubble" + (fading ? " bubble-fade" : "")}>
                <span key={line} className="bubble-line">
                  {noOrphan(hello)}
                </span>
              </p>
            )}
            <div className="poke-flip">
              <button
                type="button"
                className="poke-button"
                aria-label={bubbleOpen ? "Hide the message" : "Show the message"}
                aria-expanded={bubbleOpen}
                onClick={() => setBubbleOpen((v) => !v)}
              >
                <img className="poke" src={SPRITE(mon.id)} alt="" width={55} height={61} onLoad={() => setLoaded(true)} />
              </button>
            </div>
          </div>
        )}
      </div>
      <p className="cond" dangerouslySetInnerHTML={{ __html: parts.join(" · ") }} />
      <div className="dex">
        {mon && (
          <>
            <p className="dex-name">{mon.form ? `${mon.name}, ${mon.form}` : mon.name}</p>
            <p className="dex-text">{mon.text}</p>
          </>
        )}
      </div>
    </aside>
  );
}
