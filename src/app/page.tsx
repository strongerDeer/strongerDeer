import Hero from "@/components/Hero";
import Project from "@/components/Project";
import Career from "@components/Career";
import Certificate from "@components/Certificate";
import Education from "@components/Education";
import Experience from "@components/Experience";
import Header from "@components/Header/Header";
import Introduce from "@components/Introduce";
import Skill from "@components/Skill";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Introduce />

      <Skill />

      <Project />

      <Experience />
      <Career />

      <div className="wrap" id="education">
        <div>
          <Education />
          <Certificate />
        </div>
      </div>
    </div>
  );
}
