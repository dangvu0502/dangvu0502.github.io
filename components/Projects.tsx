import Section, { Topics } from "./Section";
import type { Project } from "@/data/types";

export function PinnedProjects({ projects }: { projects: Project[] }) {
  return (
    <Section id="pinned-projects" title="Pinned">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {projects.map((p) => (
          <a
            key={p.link}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card border border-line rounded-xl p-6 hover:border-edge hover:-translate-y-1 transition-all duration-300 block"
          >
            <h3 className="text-accent text-lg mb-3 font-semibold">{p.name}</h3>
            <Topics topics={p.topics} />
            {p.description && <p className="text-body text-sm leading-relaxed">{p.description}</p>}
          </a>
        ))}
      </div>
    </Section>
  );
}

export function RecentProjects({ projects }: { projects: Project[] }) {
  return (
    <Section id="recent-projects" title="Recent Projects">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {projects.map((p) => (
          <a
            key={p.link}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card border border-line rounded-xl p-5 hover:border-edge transition-colors duration-300 block"
          >
            <h3 className="text-white text-base font-semibold mb-3">{p.name}</h3>
            <Topics topics={p.topics} />
            {p.description && <p className="text-body text-sm">{p.description}</p>}
          </a>
        ))}
      </div>
    </Section>
  );
}
