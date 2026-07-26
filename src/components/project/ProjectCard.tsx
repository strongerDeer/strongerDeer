import React from "react";
import ProjectThumb from "./ProjectThumb";
import ProjectBtns from "./ProjectBtns";
import Tag from "@components/shared/Tag";
import { I_PROJECT_SUMMARY, ICON_MAP, ICON_TYPE } from "@data/project";

type ProjectCardProps = {
  project: I_PROJECT_SUMMARY;
  compact?: boolean;
  /** 접힌 상태에서 blur 그라데이션에 덮여 보이지 않는 카드 */
  hidden?: boolean;
};

const ProjectCard = ({
  project,
  compact = false,
  hidden = false,
}: ProjectCardProps) => {
  const {
    id,
    type,
    thumb,
    title,
    kor,
    description,
    detailLabel,
    skills,
    icon,
    metrics,
    url,
    urlType,
    urlLabel,
    github,
  } = project;

  const IconComponent = ICON_MAP[icon as ICON_TYPE];
  const displayMetrics = compact ? metrics.slice(0, 1) : metrics;

  return (
    <li
      id={id}
      // "더보기"로 펼쳤을 때 새로 드러난 첫 카드로 초점을 옮기기 위한 대상.
      // -1 이라 Tab 순서에는 들어가지 않고 프로그램적 초점만 받는다.
      tabIndex={-1}
      // 접힌 상태의 카드는 blur 그라데이션에 덮여 사실상 보이지 않는다.
      // inert 로 Tab·클릭·접근성 트리에서 한 번에 제외한다 — 보이지 않는 링크에
      // 초점 링이 그려지는 상황(WCAG 2.4.11 Focus Not Obscured)을 막는다.
      inert={hidden}
      className={compact ? "compact" : ""}
    >
      {/* 카드 대표 링크는 ProjectThumb 안에서 이미지 영역만 감싼다(배지는 링크 밖).
          초점을 받으면 카드 전체에 링이 그려진다(globals.scss 의 :has 규칙).
          제목은 링크로 감싸지 않는다 — 목적지가 같아 이름이 중복될 뿐 아니라,
          inline <a> 가 블록 <h3> 를 감싸는 구조라 아웃라인이 아예 그려지지 않았다. */}
      <ProjectThumb
        type={type}
        thumb={thumb}
        title={title}
        metrics={metrics}
        href={`/${id}`}
        label={`${title} 상세 보기`}
      />

      <div className="content">
        <div>
          <h3 className="title">
            <IconComponent aria-hidden="true" /> {title}
            <span>{kor}</span>
          </h3>

          {!compact && <p>{description}</p>}

          <ul className="list2">
            {displayMetrics.map((metric) => (
              <li key={metric}>{metric}</li>
            ))}
          </ul>
        </div>

        <Tag tags={skills} />
        <ProjectBtns
          url={url}
          urlType={urlType}
          urlLabel={urlLabel}
          github={github}
          projectId={id}
          projectTitle={title}
          detailLabel={detailLabel}
        />
      </div>
    </li>
  );
};

export default ProjectCard;
