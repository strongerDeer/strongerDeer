import { motion } from "framer-motion";

import React from "react";
import ProjectThumb from "./ProjectThumb";
import ProjectBtns from "./ProjectBtns";
import Tag from "@components/shared/Tag";
import { I_PROJECTS, ICON_MAP, ICON_TYPE } from "@data/project";

export default function ProjectCard({
  project,
  index,
}: {
  project: I_PROJECTS;
  index: number;
}) {
  const {
    id,
    type,
    thumb,
    title,
    kor,
    description,
    skills,
    icon,
    metrics,
    url,
    github,
  } = project;

  const IconComponent = ICON_MAP[icon as ICON_TYPE];
  return (
    <motion.li
      id={id}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }} // exit 애니메이션 추가
      transition={{
        duration: 0.3,
        ease: "easeOut",
        delay: index * 0.1,
      }}
    >
      <ProjectThumb type={type} thumb={thumb} />

      <div className="content">
        <div>
          <h3 className="title">
            <IconComponent /> {title}
            <span>{kor}</span>
          </h3>

          <p>{description}</p>

          <ul className="list2">
            {metrics.map((metric, idx) => (
              <li key={idx}>{metric}</li>
            ))}
          </ul>
        </div>

        <Tag tags={skills} />
        <ProjectBtns url={url} github={github} projectId={id} />
      </div>
    </motion.li>
  );
}
