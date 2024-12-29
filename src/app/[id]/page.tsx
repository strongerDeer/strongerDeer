import { LinkBtn } from "@components/project/ProjectBtns";
import TypeIcon from "@components/project/TypeIcon";
import { ICON_MAP, ICON_TYPE } from "@data/project";
import { getProject } from "@utils/projects";
import { X } from "lucide-react";
import Link from "next/link";

import styles from "./page.module.scss";

export async function generateStaticParams() {
  return [
    { id: "page0127" },
    { id: "weniv-analytics" },
    { id: "wenivooks" },
    { id: "weniv-bootcamp" },
  ];
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const project = await getProject(id);

  const { type, title, kor, icon, description, period, github, url, content } =
    project;

  const IconComponent = ICON_MAP[icon as ICON_TYPE];
  return (
    <div className={styles.project}>
      <header>
        <TypeIcon type={type} />
        <div className="flex items-center justify-between">
          <h2 className="title flex items-center gap-2">
            <IconComponent />
            {title} <span>{kor}</span>
          </h2>
        </div>
        <p className="text-gray-500 mt-2">{period}</p>
        <p className="text-gray-500 mt-2">{description}</p>
      </header>

      <div className={styles.contents}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <div className={styles.buttons}>
        {github && <LinkBtn type="github" url={github} />}
        {url && <LinkBtn type="url" url={url} />}

        <Link href={`../strongerDeer#${id}`} className={styles.back}>
          <X className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
}
