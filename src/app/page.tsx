import Hero from "@/components/Hero";
import Project from "@/components/Project";
import Career from "@components/Career";
import Certificate from "@components/Certificate";
import Education from "@components/Education";
import Experience from "@components/Experience";
import Header from "@components/Header/Header";
import Skill from "@components/Skill";
import { getAllProjects } from "@utils/projects";

export default async function Home() {
  const projects = await getAllProjects();

  return (
    <div>
      <Header />
      <Hero />

      <Project initialProjects={projects} />
      <Experience />

      <Career />
      <Skill />

      <div className="wrap" id="education">
        <div>
          <Education />
          <Certificate />
        </div>
      </div>
    </div>
  );
}
