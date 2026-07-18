import NotionIcon from "@components/NotionIcon";
import Logo from "@components/shared/Logo";
import { Github, Menu } from "lucide-react";
import Link from "next/link";

const NAV_ITEMS = [
  { href: "#hero", label: "홈" },
  { href: "#work", label: "경력" },
  { href: "#projects", label: "프로젝트" },
  { href: "#skills", label: "기술" },
  { href: "#otherExperience", label: "기타 경험" },
  { href: "#education", label: "교육·자격" },
];

const ExternalLinks = ({ mobile = false }: { mobile?: boolean }) => (
  <span className={mobile ? "mobileExternalLinks" : "portfolioLinks"}>
    <a
      href="https://strongerdeer.notion.site/strongerDeer-Archive-17e01a7a57f1804a8248c430448d5417?pvs=74"
      target="_blank"
      rel="noopener noreferrer"
      title="Notion 아카이브"
      className="externalLink notionLink"
    >
      <NotionIcon />
      <span>{mobile ? "Notion 아카이브" : "Notion"}</span>
    </a>
    <a
      href="https://github.com/strongerDeer"
      target="_blank"
      rel="noopener noreferrer"
      title="GitHub"
      className="externalLink githubLink"
    >
      <Github className="h-5" />
      <span>{mobile ? "GitHub" : "GitHub"}</span>
    </a>
  </span>
);

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <nav className="headerNav" aria-label="주요 섹션">
        {NAV_ITEMS.map(({ href, label }) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
      </nav>

      <details className="mobileNav">
        <summary aria-label="주요 메뉴 열기">
          <Menu aria-hidden="true" />
          <span>메뉴</span>
        </summary>
        <nav aria-label="모바일 주요 섹션">
          {NAV_ITEMS.map(({ href, label }) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
          <ExternalLinks mobile />
        </nav>
      </details>

      <ExternalLinks />
    </header>
  );
};

export default Header;
