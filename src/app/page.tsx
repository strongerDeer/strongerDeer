import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Work from "@components/Work";
import Certifications from "@components/Certifications";
import Education from "@components/Education";
import OtherExperience from "@components/OtherExperience";
import Header, { ExternalLinks } from "@components/Header/Header";
import SkipLink from "@components/shared/SkipLink";
import Skills from "@components/Skills";
import { getAllProjects } from "@utils/projects";

export default async function Home() {
  const projects = await getAllProjects();

  return (
    <div>
      <SkipLink targetId="hero-heading" />
      <Header />

      <main id="main-content">
        <Hero />

        <Work />
        <Projects projects={projects} />
        <Skills />
        <OtherExperience />

        <div className="wrap" id="education">
          <div>
            <Education />
            <Certifications />
          </div>
        </div>
      </main>

      {/* 화면상 우측 하단 고정. Tab 순서에서도 마지막이 되도록 <main> 뒤에 둔다. */}
      <ExternalLinks />
    </div>
  );
}
