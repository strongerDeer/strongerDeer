import { LinkBtn } from "@components/project/ProjectBtns";
import TypeIcon from "@components/project/TypeIcon";
import { ICON_MAP, ICON_TYPE } from "@data/project";
import { getProject, getProjectIds } from "@utils/projects";
import { X } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import styles from "./page.module.scss";
import Image from "next/image";
import Nav from "@components/project/Nav";
import NadDashboardDemo from "@components/project/NadDashboardDemo";
type Props = {
  params: Promise<{
    id: string;
  }>;
};
export async function generateStaticParams() {
  return getProjectIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { title, kor, description } = await getProject(id);
  const pageTitle = `${title} ${kor} | 강혜진 포트폴리오`;

  return {
    title: pageTitle,
    description,
    openGraph: {
      title: pageTitle,
      description,
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const project = await getProject(id);

  const {
    type,
    title,
    role,
    kor,
    thumb,
    icon,
    description,
    period,
    github,
    codeDisclosure,
    url,
    urlType,
    urlLabel,
    headings,
    content,
  } = project;

  const IconComponent = ICON_MAP[icon as ICON_TYPE];
  const nadSectionStart =
    id === "novera-dashboard" ? content.indexOf('id="section5"') : -1;
  const nadInsertAt =
    nadSectionStart >= 0 ? content.indexOf("</h3>", nadSectionStart) + 5 : -1;
  const contentBeforeDemo =
    nadInsertAt > 4 ? content.slice(0, nadInsertAt) : content;
  const contentAfterDemo = nadInsertAt > 4 ? content.slice(nadInsertAt) : "";

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
        <p className="text-gray-500 mt-2">{role}</p>
        <p className="text-gray-500 mt-2">{description}</p>

        <Nav headings={headings} />
      </header>
      <section className={styles.overview} aria-label="프로젝트 요약">
        <h3>핵심 결과</h3>
        <ul className={styles.summary}>
          {project.metrics.map((metric) => (
            <li key={metric}>{metric}</li>
          ))}
        </ul>
        {codeDisclosure && (
          <p className={styles.disclosure}>{codeDisclosure}</p>
        )}
      </section>
      {thumb && id !== "novera-dashboard" && (
        <Image
          className="mb-16 m-auto rounded-xl max-w-[500px] w-full h-auto"
          src={`/strongerDeer${thumb}`}
          alt=""
          width={800}
          height={600}
          priority
        />
      )}
      <div className={styles.contents}>
        <div dangerouslySetInnerHTML={{ __html: contentBeforeDemo }} />
        {id === "novera-dashboard" && nadInsertAt > 4 && (
          <NadDashboardDemo />
        )}
        {contentAfterDemo && (
          <div dangerouslySetInnerHTML={{ __html: contentAfterDemo }} />
        )}
      </div>
      <div className={styles.buttons}>
        {github && <LinkBtn type="github" url={github} />}
        {url && <LinkBtn type="url" url={url} urlType={urlType} label={urlLabel} />}

        <Link href={`../strongerDeer#${id}`} className={styles.back}>
          <X className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
}
