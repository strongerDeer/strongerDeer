import NotionIcon from "@components/NotionIcon";
import Logo from "@components/shared/Logo";
import { Github, Menu } from "lucide-react";
import Link from "next/link";

// 섹션 래퍼(#work 등)가 아니라 각 섹션 제목을 가리킨다.
// 래퍼는 min-h-100dvh 라 초점 링이 화면 밖에 걸려 안 보이고, 제목을 대상으로 하면
// 이동 후 "여기로 왔다"가 링으로 분명히 드러난다(스킵 링크와 같은 방식).
// 래퍼의 id 는 CSS 가 쓰므로 그대로 두었다 — 기존 #work 같은 주소도 계속 스크롤된다.
const NAV_ITEMS = [
  { href: "#hero-heading", label: "홈" },
  { href: "#work-heading", label: "경력" },
  { href: "#projects-heading", label: "프로젝트" },
  { href: "#skills-heading", label: "기술" },
  { href: "#other-heading", label: "기타 경험" },
  { href: "#education-heading", label: "교육·자격" },
];

export const ExternalLinks = ({ mobile = false }: { mobile?: boolean }) => (
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
      <Github className="h-5" aria-hidden="true" />
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
    </header>
  );
};

export default Header;
