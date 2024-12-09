import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Project from "@/components/Project";
import Career from "@components/Career";
import Certificate from "@components/Certificate";
import Education from "@components/Education";
import Experience from "@components/Experience";
import Header from "@components/Header/Header";
import Other from "@components/Other";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Career />
      <Experience />
      <Achievements />
      <Project />
      <Other />
      <Education />

      <Certificate />

      <Contact />
    </div>
  );
}
