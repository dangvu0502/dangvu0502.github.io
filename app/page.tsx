import Hero from "@/components/Hero";
import WorkExperienceSection from "@/components/WorkExperience";
import { PinnedProjects, RecentProjects } from "@/components/Projects";
import OSSContributions from "@/components/OSSContributions";
import work from "@/data/work-experience.json";
import pinned from "@/data/pinned-projects.json";
import recent from "@/data/recent-projects.json";
import oss from "@/data/oss-contributions.json";

export default function Home() {
  return (
    <main>
      <Hero />
      <WorkExperienceSection experiences={work} />
      <PinnedProjects projects={pinned} />
      <RecentProjects projects={recent} />
      <OSSContributions contributions={oss} />
    </main>
  );
}
