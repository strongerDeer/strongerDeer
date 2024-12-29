import { ExternalLink, Github, Search } from "lucide-react";
import Link from "next/link";

export default function ProjectBtns({
  url,
  github,
  projectId,
}: {
  url: string;
  github?: string;
  projectId: string;
}) {
  return (
    <div className="btn-group">
      <Link href={`/${projectId}`} className="go border-gray-150">
        <Search className="stroke-gray-700" />
      </Link>

      {github && <LinkBtn type="github" url={github} />}
      {url && <LinkBtn type="url" url={url} />}
    </div>
  );
}

export const LinkBtn = ({
  type,
  url,
}: {
  type: "github" | "url" | "view";
  url: string;
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
        {type === "url" ? (
          <ExternalLink className="stroke-blue-500" />
        ) : (
          <Github className="stroke-gray-700" />
        )}
        <span>{url}</span>
      </a>
    </>
  );
};
