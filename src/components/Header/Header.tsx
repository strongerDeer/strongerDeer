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
        <Link href="#career">
          <span>Career</span>
        </Link>
        <Link href="#project">
          <span>Project</span>
        </Link>
        <Link href="#experience">
          <span>Experience</span>
        </Link>
        <Link href="#education">
          <span>Education/Certificate</span>
        </Link>
        <a
          href="https://github.com/strongerDeer"
          target="_blank"
          className="flex items-center bg-blue-100 aspect-square rounded-full p-1.5"
        >
          <Github className="h-4" />
        </a>
      </div>
    </header>
  );
}
