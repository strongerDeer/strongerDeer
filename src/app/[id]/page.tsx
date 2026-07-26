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
import SkipLink from "@components/shared/SkipLink";
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
  const { title, kor, description, thumb } = await getProject(id);
  const pageTitle = `${title} ${kor} | 강혜진 포트폴리오`;
  const images = [thumb ? `/strongerDeer${thumb}` : "/strongerDeer/og-image.jpg"];

  return {
    title: pageTitle,
    description,
    openGraph: {
      title: pageTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images,
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
      <SkipLink targetId="project-overview" />
      {/* 화면상 우측 상단 고정(.buttons 는 position:fixed)이므로 DOM 도 상단에 둔다.
          본문 끝에 있으면 Tab 으로 가장 늦게 도달해 시각 순서와 초점 순서가 어긋난다. */}
      <div className={styles.buttons}>
        {github && <LinkBtn type="github" url={github} project={title} />}
        {url && (
          <LinkBtn
            type="url"
            url={url}
            urlType={urlType}
            label={urlLabel}
            project={title}
          />
        )}

        <Link
          href={`../strongerDeer#${id}`}
          className={styles.back}
          aria-label="프로젝트 목록으로 돌아가기"
        >
          <X className="w-6 h-6" aria-hidden="true" />
        </Link>
      </div>
      <header>
        <TypeIcon type={type} />
        <div className="flex items-center justify-between">
          <h1 className="title flex items-center gap-2">
            <IconComponent />
            {title} <span>{kor}</span>
          </h1>
        </div>
        <p className="mt-3 text-lg font-semibold text-ink">{description}</p>
        <p className="mt-2 text-sm text-ink-faint">
          {period} · {role}
        </p>

        <Nav headings={headings} />
      </header>
      <main id="main-content">
        <section className={styles.overview} aria-label="프로젝트 요약">
          <h2 id="project-overview" tabIndex={-1} className="skipTarget">
            핵심 결과
          </h2>
          {project.highlights ? (
            <ul className={styles.summary}>
              {project.highlights.map(({ value, label }) => (
                <li key={value} className={styles.kpi}>
                  <strong className={styles.kpiValue}>{value}</strong>
                  <span className={styles.kpiLabel}>{label}</span>
                </li>
              ))}
            </ul>
          ) : (
            <ul className={styles.summary}>
              {project.metrics.map((metric) => (
                <li key={metric}>{metric}</li>
              ))}
            </ul>
          )}
          {codeDisclosure && (
            <p className={styles.disclosure}>{codeDisclosure}</p>
          )}
        </section>
        {thumb && id !== "novera-dashboard" && (
          <Image
            className="mb-16 m-auto rounded-xl max-w-[500px] w-full h-auto"
            src={`/strongerDeer${thumb}`}
            alt={`${title} ${kor} 데모 화면`}
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
      </main>
    </div>
  );
}
