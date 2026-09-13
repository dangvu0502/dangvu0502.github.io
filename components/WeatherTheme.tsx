"use client";

import { useEffect, useState } from "react";

type Theme = "clear-day" | "clear-night" | "cloudy" | "rain" | "snow" | "thunder";
type Weather = { theme: Theme; city: string | null };

const KEY = "weather-theme";
const TTL = 60 * 60 * 1000;

const CAPTION: Record<Theme, string> = {
  "clear-day": "Sunny in {city}? ☀️ Good day to hire a frontend dev.",
  "clear-night": "Clear night in {city}? 🌙 Good time to hire a frontend dev.",
  cloudy: "Cloudy in {city}? ☁️ Good day to hire a frontend dev.",
  rain: "Rainy in {city}? ☔️ Nice day to hire a frontend dev.",
  snow: "Snowing in {city}? ❄️ Cozy day to hire a frontend dev.",
  thunder: "Storm in {city}? ⚡️ Still a fine day to hire a frontend dev.",
};

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

async function lookup(): Promise<Weather> {
  const loc = await getJson("https://ipwho.is/");
  const wx = await getJson(
    `https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current=weather_code,is_day`,
  );
  const cur = wx.current as { weather_code: number; is_day: number };
  return { theme: toTheme(cur.weather_code, cur.is_day === 1), city: (loc.city as string) || null };
}

function cached(): Weather | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const { at, data } = JSON.parse(raw);
    return Date.now() - at < TTL ? data : null;
  } catch {
    return null;
  }
}

export default function WeatherTheme() {
  const [wx, setWx] = useState<Weather | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      let data = cached();
      if (!data) {
        try {
          data = await lookup();
          sessionStorage.setItem(KEY, JSON.stringify({ at: Date.now(), data }));
        } catch {
          return; // ponytail: silent fallback, default theme stays
        }
      }
      if (!alive) return;
      document.documentElement.dataset.weather = data.theme;
      setWx(data);
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Fixed height so the caption never shifts layout.
  return (
    <p className="h-5 mb-4 text-sm text-muted transition-opacity duration-700" style={{ opacity: wx ? 1 : 0 }} aria-live="polite">
      {wx && CAPTION[wx.theme].replace("{city}", wx.city ?? "your city")}
    </p>
  );
}
