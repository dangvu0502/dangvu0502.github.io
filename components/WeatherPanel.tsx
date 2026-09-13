"use client";

import { useEffect, useState } from "react";

type Theme = "clear-day" | "clear-night" | "cloudy" | "rain" | "snow" | "thunder";
type Weather = { theme: Theme; city: string | null; temp: number | null; hour: number | null };
type Mon = { id: number; name: string; form: string | null; text: string };

const KEY = "weather-theme";
const TTL = 60 * 60 * 1000;
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
    city: ((loc.region as string) || (loc.city as string)) ?? null, // region = "Hanoi", city = district
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

function fmtHour(h: number) {
  return `${String(Math.floor(h)).padStart(2, "0")}:${String(Math.round((h % 1) * 60)).padStart(2, "0")}`;
}

export default function WeatherPanel() {
  const [wx, setWx] = useState<Weather | null>(null);
  const [mon, setMon] = useState<Mon | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      let data = cached<Weather>(KEY);
      if (!data) {
        try {
          data = await lookup();
          store(KEY, data);
        } catch {
          data = null; // silent fallback: default theme stays
        }
      }
      if (!alive) return;
      if (data) document.documentElement.dataset.weather = data.theme;
      setWx(data);
      setSettled(true);
      const m = await summon(data?.theme ?? "");
      if (alive) setMon(m);
    })();
    return () => {
      alive = false;
    };
  }, []);

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
          <img className={"poke" + (loaded ? " poke-in" : "")} src={SPRITE(mon.id)} alt="" width={55} height={61} onLoad={() => setLoaded(true)} />
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
