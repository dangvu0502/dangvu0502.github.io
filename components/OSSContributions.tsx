import Section from "./Section";
import type { OSSContribution } from "@/data/types";

export default function OSSContributions({ contributions }: { contributions: OSSContribution[] }) {
  return (
    <Section id="oss-contributions" title="OSS Contributions">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {contributions.map((c) => (
          <a
            key={c.link}
            href={c.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card border border-line rounded-xl p-5 hover:border-edge transition-colors duration-300 block"
          >
            <p className="text-white text-sm font-medium mb-1">{c.title}</p>
            <p className="text-body text-sm">
              Pull Request #{c.pr_number} · {c.repository}
            </p>
          </a>
        ))}
      </div>
    </Section>
  );
}
