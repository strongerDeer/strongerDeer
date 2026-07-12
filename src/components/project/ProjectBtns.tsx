import { ArrowRight, ExternalLink, Github, Presentation } from "lucide-react";
import Link from "next/link";

type UrlType = "site" | "slides";

type ProjectBtnsProps = {
  url: string;
  urlType?: UrlType;
  urlLabel?: string;
  github?: string;
  projectId: string;
  detailLabel?: string;
};

const ProjectBtns = ({
  url,
  urlType,
  urlLabel,
  github,
  projectId,
  detailLabel,
}: ProjectBtnsProps) => {
  return (
    <div className="btn-group">
      <Link href={`/${projectId}`} className="go detail border-gray-150">
        <span>{detailLabel ?? "상세 과정 보기"}</span>
        <ArrowRight className="stroke-gray-700" />
      </Link>

      {github && <LinkBtn type="github" url={github} />}
      {url && <LinkBtn type="url" url={url} urlType={urlType} label={urlLabel} />}
    </div>
  );
};

export default ProjectBtns;

export const LinkBtn = ({
  type,
  url,
  urlType = "site",
  label,
}: {
  type: "github" | "url" | "view";
  url: string;
  urlType?: UrlType;
  label?: string;
}) => {
  if (type === "view") {
  }
  return (
    <>
      <a
        href={url}
        target="_blank"
        className={`go ${
          type === "github"
            ? "bg-gray-200 border-gray-200"
            : "bg-blue-100 border-blue-100"
        }`}
      >
        {type === "url" && urlType === "slides" ? (
          <Presentation className="stroke-blue-500" />
        ) : type === "url" ? (
          <ExternalLink className="stroke-blue-500" />
        ) : (
          <Github className="stroke-gray-700" />
        )}
        <span>{label ?? url}</span>
      </a>
    </>
  );
};
