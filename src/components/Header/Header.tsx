import Logo from "@components/shared/Logo";
import { Github } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <Logo />
      <div>
        <Link href="#hero">
          <span>Home</span>
        </Link>

        <Link href="#projects">
          <span>Projects</span>
        </Link>

        <Link href="#work">
          <span>Work</span>
        </Link>

        <Link href="#otherExperience">
          <span>Other Experience</span>
        </Link>

        <Link href="#skills">
          <span>Skills</span>
        </Link>
        <Link href="#education">
          <span>Education/Certifications</span>
        </Link>
      </div>

      <a
        href="https://github.com/strongerDeer"
        target="_blank"
        title="GitHub"
        className="flex items-center bg-gray-800 aspect-square rounded-full p-3 fixed bottom-4 right-4 shadow"
      >
        <Github className="h-5 text-white" />
        <span className="a11y-hidden">GitHub</span>
      </a>
    </header>
  );
}
