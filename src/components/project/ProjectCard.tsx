import { motion } from "framer-motion";

import React from "react";
import ProjectThumb from "./ProjectThumb";
import ProjectBtns from "./ProjectBtns";
import Tag from "@components/shared/Tag";
import { I_PROJECTS, ICON_MAP, ICON_TYPE } from "@data/project";
import Link from "next/link";

type ProjectCardProps = {
  project: I_PROJECTS;
  index: number;
  compact?: boolean;
};

const ProjectCard = ({ project, index, compact = false }: ProjectCardProps) => {
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
    <motion.li
      id={id}
      className={compact ? "compact" : ""}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }} // exit 애니메이션 추가
      transition={{
        duration: 0.3,
        ease: "easeOut",
        delay: index * 0.1,
      }}
    >
      <Link href={`/${id}`}>
        <ProjectThumb type={type} thumb={thumb} title={title} metrics={metrics} />
      </Link>

      <div className="content">
        <div>
          <Link href={`/${id}`} aria-label={`${title} 상세 보기`}>
            <h3 className="title">
              <IconComponent /> {title}
              <span>{kor}</span>
            </h3>
          </Link>

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
          detailLabel={detailLabel}
        />
      </div>
    </motion.li>
  );
};

export default ProjectCard;
