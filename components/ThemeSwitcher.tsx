"use client";

import { useEffect, useState } from "react";

const THEMES = ["clear-day", "clear-night", "cloudy", "rain", "snow", "thunder"] as const;
const LABEL: Record<string, string> = {
  "clear-day": "day",
  "clear-night": "night",
  cloudy: "cloudy",
  rain: "rain",
  snow: "snow",
  thunder: "storm",
};

// Dev-only weather switcher. Renders on localhost, never in the deployed site.
export default function ThemeSwitcher() {
  const [local, setLocal] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const h = location.hostname;
    setLocal(h === "localhost" || h === "127.0.0.1" || h === "[::1]");
    setActive(document.documentElement.dataset.weather ?? "");
  }, []);

  if (!local) return null;

  const pick = (t: string) => {
    if (t) document.documentElement.dataset.weather = t;
    else delete document.documentElement.dataset.weather;
    setActive(t);
  };

  const reset = () => {
    try {
      sessionStorage.clear();
    } catch {
      /* nothing to clear */
    }
    location.reload();
  };

  return (
    <div className="devbar">
      <span>dev</span>
      {THEMES.map((t) => (
        <button key={t} type="button" onClick={() => pick(t)} aria-pressed={active === t}>
          {LABEL[t]}
        </button>
      ))}
      <button type="button" onClick={() => pick("")} aria-pressed={active === ""}>
        default
      </button>
      <button type="button" onClick={reset} title="Clear cache and re-fetch real weather">
        live
      </button>
    </div>
  );
}
