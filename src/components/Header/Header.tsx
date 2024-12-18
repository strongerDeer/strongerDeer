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
        <Link href="#introduce">
          <span>Introduce</span>
        </Link>

        <Link href="#skill">
          <span>Skill</span>
        </Link>
        <Link href="#project">
          <span>Project</span>
        </Link>
        <Link href="#experience">
          <span>Experience</span>
        </Link>
        <Link href="#career">
          <span>Career</span>
        </Link>

        <Link href="#education">
          <span>Education/Certificate</span>
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
