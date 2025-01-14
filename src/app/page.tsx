import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Work from "@components/Work";
import Certifications from "@components/Certifications";
import Education from "@components/Education";
import OtherExperience from "@components/OtherExperience";
import Header from "@components/Header/Header";
import Skills from "@components/Skills";
import { getAllProjects } from "@utils/projects";

export default async function Home() {
  const projects = await getAllProjects();

  return (
    <div>
      <Header />
      <Hero />

      <Projects initialProjects={projects} />
      <Work />
      <OtherExperience />

      <Skills />

      <div className="wrap" id="education">
        <div>
          <Education />
          <Certifications />
        </div>
      </div>
    </div>
  );
}
