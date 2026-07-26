import { ArrowRight, ExternalLink, Github, Presentation } from "lucide-react";
import Link from "next/link";

type UrlType = "site" | "slides";

type ProjectBtnsProps = {
  url: string;
  urlType?: UrlType;
  urlLabel?: string;
  github?: string;
  projectId: string;
  projectTitle?: string;
  detailLabel?: string;
};

const ProjectBtns = ({
  url,
  urlType,
  urlLabel,
  github,
  projectId,
  projectTitle,
  detailLabel,
}: ProjectBtnsProps) => {
  return (
    <div className="btn-group">
      <Link href={`/${projectId}`} className="go detail border-line">
        <span>{detailLabel ?? "상세 과정 보기"}</span>
        <ArrowRight className="stroke-ink-body" aria-hidden="true" />
      </Link>

      {github && (
        <LinkBtn type="github" url={github} project={projectTitle} />
      )}
      {url && (
        <LinkBtn
          type="url"
          url={url}
          urlType={urlType}
          label={urlLabel}
          project={projectTitle}
        />
      )}
    </div>
  );
};

export default ProjectBtns;

export const LinkBtn = ({
  type,
  url,
  urlType = "site",
  label,
  project,
}: {
  type: "github" | "url" | "view";
  url: string;
  urlType?: UrlType;
  label?: string;
  project?: string;
}) => {
  // 이름이 없으면 URL 전체가 링크 이름으로 읽힌다("https 콜론 슬래시 슬래시 …").
  // 카드마다 같은 종류의 버튼이 반복되므로 프로젝트명을 앞에 붙여 목록에서 구분되게 한다.
  const fallback =
    type === "github"
      ? "GitHub 저장소"
      : urlType === "slides"
      ? "슬라이드 열기"
      : "사이트 열기";
  const name = label ?? (project ? `${project} ${fallback}` : fallback);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`go ${
        type === "github"
          ? "bg-surface-muted border-line"
          : "bg-accent-surface border-accent-line"
      }`}
    >
      {type === "url" && urlType === "slides" ? (
        <Presentation className="stroke-accent" aria-hidden="true" />
      ) : type === "url" ? (
        <ExternalLink className="stroke-accent" aria-hidden="true" />
      ) : (
        <Github className="stroke-ink-body" aria-hidden="true" />
      )}
      <span>{name}</span>
    </a>
  );
};
