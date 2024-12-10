import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Project from "@/components/Project";
import Career from "@components/Career";
import Certificate from "@components/Certificate";
import Education from "@components/Education";
import Experience from "@components/Experience";
import Header from "@components/Header/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />

      <Achievements />
      <Project />

      <Career />
      <Experience />

      <div className="wrap">
        <div>
          <Education />
          <Certificate />
        </div>
      </div>

      <Contact />
    </div>
  );
}
