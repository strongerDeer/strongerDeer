import { ExternalLink, Github, Presentation, Search } from "lucide-react";
import Link from "next/link";

type UrlType = "site" | "slides";

export default function ProjectBtns({
  url,
  urlType,
  urlLabel,
  github,
  projectId,
}: {
  url: string;
  urlType?: UrlType;
  urlLabel?: string;
  github?: string;
  projectId: string;
}) {
  return (
    <div className="btn-group">
      <Link href={`/${projectId}`} className="go border-gray-150">
        <Search className="stroke-gray-700" />
      </Link>

      {github && <LinkBtn type="github" url={github} />}
      {url && <LinkBtn type="url" url={url} urlType={urlType} label={urlLabel} />}
    </div>
  );
}

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
