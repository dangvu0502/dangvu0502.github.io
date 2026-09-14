import WeatherPanel from "@/components/WeatherPanel";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import story from "@/data/story.json";
import projects from "@/data/pinned-projects.json";
import oss from "@/data/oss-contributions.json";
import type { OSSContribution, Project, Story } from "@/data/types";

const s = story as Story;
const merged = (oss as OSSContribution[]).filter((c) => c.state !== "open");

export default function Home() {
  return (
    <div className="shell">
      <div className="layout">
        <main className="copy">
          <h1 className="title">{s.name}</h1>
          {s.line && <p className="handle">{s.line}</p>}

          <div className="bio">
            {s.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
            <div className="cta">
              <a className="btn" href={`mailto:${s.email}`}>Email me</a>
              <a href={s.github}>GitHub</a>
              <a href={s.linkedin}>LinkedIn</a>
            </div>
          </div>

          <section>
            <h2>Projects</h2>
            <div className="rows">
              {(projects as Project[]).map((p) => (
                <a className="row" key={p.link} href={p.link}>
                  <span>
                    <span className="t">{p.name}</span>
                    {p.description && <span className="d">{p.description}</span>}
                  </span>
                  <span className="side">{p.topics.join(" · ")}</span>
                </a>
              ))}
            </div>
          </section>

          <section>
            <h2>Open source</h2>
            <div className="rows">
              {merged.map((c) => (
                <a className="row" key={c.link} href={c.link}>
                  <span className="t">{c.title}</span>
                  <time>{c.repository.split("/")[1]} #{c.pr_number}</time>
                </a>
              ))}
            </div>
          </section>

          <footer className="site">
            Built with Next.js, static export, on GitHub Pages.{" "}
            <a href="https://github.com/dangvu0502/dangvu0502.github.io">Source</a>.
          </footer>
        </main>

        <WeatherPanel />
        <ThemeSwitcher />
      </div>
    </div>
  );
}
