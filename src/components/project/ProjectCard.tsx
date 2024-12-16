import { motion } from "framer-motion";
import { I_PROJECTS, ICON_MAP } from "@data";
import { BarChart } from "lucide-react";

import React from "react";
import ProjectThumb from "./ProjectThumb";
import ProjectBtns from "./ProjectBtns";
import Tag from "@components/shared/Tag";

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
    longDesc,
    tags,
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
          <h3>
            {React.createElement(ICON_MAP[icon] || BarChart)} {title} {kor}
          </h3>

          <p>{description}</p>
          <p>{longDesc}</p>

          <ul className="list2">
            {metrics.map((metric, idx) => (
              <li key={idx}>{metric}</li>
            ))}
          </ul>
        </div>

        <Tag tags={tags} />
        <ProjectBtns url={url} github={github} onModalOpen={onModalOpen} />
      </div>
    </motion.li>
  );
}
