import { motion } from "framer-motion";

import React from "react";
import ProjectThumb from "./ProjectThumb";
import ProjectBtns from "./ProjectBtns";
import Tag from "@components/shared/Tag";
import { I_PROJECTS } from "@data/project";

export default function ProjectCard({
  project,
  onModalOpen,
  index,
}: {
  project: I_PROJECTS;
  onModalOpen: () => void;
  index: number;
}) {
  const {
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
  return (
    <motion.li
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
            {React.createElement(icon)} {title}
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
        <ProjectBtns url={url} github={github} onModalOpen={onModalOpen} />
      </div>
    </motion.li>
  );
}
