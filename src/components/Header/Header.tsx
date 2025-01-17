import NotionIcon from "@components/NotionIcon";
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

      <span className="fixed bottom-4 right-4 flex items-center justify-center gap-1">
        <a
          href="https://strongerdeer.notion.site/strongerDeer-Archive-17e01a7a57f1804a8248c430448d5417?pvs=74"
          target="_blank"
          title="GitHub"
          className="w-12 flex items-center justify-center bg-gray-200 border border-gray-300 aspect-square rounded-full shadow"
        >
          <NotionIcon />
          <span className="a11y-hidden">Notion</span>
        </a>
        <a
          href="https://github.com/strongerDeer"
          target="_blank"
          title="GitHub"
          className="w-12 flex items-center justify-center bg-gray-800 aspect-square rounded-full shadow"
        >
          <Github className="h-5 text-white" />
          <span className="a11y-hidden">GitHub</span>
        </a>
      </span>
    </header>
  );
}
