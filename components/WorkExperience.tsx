import Section from "./Section";
import type { WorkExperience } from "@/data/types";

export default function WorkExperienceSection({ experiences }: { experiences: WorkExperience[] }) {
  return (
    <Section id="work" title="Work Experience">
      <div className="flex flex-col gap-5">
        {experiences.map((e) => (
          <a key={e.company + e.dates} href={e.company_site ?? "#"} target="_blank" rel="noopener noreferrer" className="block">
            <div className="grid grid-cols-1 md:grid-cols-[60px_1fr_auto] gap-5 items-start bg-card border border-line rounded-xl p-5 hover:border-edge transition-colors duration-300">
              <div className="w-[60px] h-[60px] rounded-lg overflow-hidden bg-raised shrink-0 flex items-center justify-center">
                {e.logo ? (
                  <img src={`/logo/${e.logo}`} alt={`${e.company} logo`} width={60} height={60} className="w-full h-full bg-white object-contain" />
                ) : (
                  <span className="text-muted text-xs font-bold">{e.company.slice(0, 2).toUpperCase()}</span>
                )}
              </div>
              <div>
                <h3 className="text-white text-lg font-semibold mb-1">{e.company}</h3>
                <p className="text-muted text-sm mb-1">
                  {e.role} - {e.location}
                </p>
                {e.highlights && (
                  <ul className="mt-3 list-disc pl-4 text-body text-sm leading-relaxed space-y-1">
                    {e.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="text-faint text-sm whitespace-nowrap text-left md:text-right">{e.dates}</div>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
