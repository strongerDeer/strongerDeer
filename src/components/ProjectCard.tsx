import { I_PROJECTS, ICON_MAP } from "@data";
import { BarChart } from "lucide-react";

import React from "react";
import Tag from "./Tag";
import ProjectThumb from "./ProjectThumb";
import ProjectBtns from "./ProjectBtns";

export default function ProjectCard({
  project,
  onModalOpen,
}: {
  project: I_PROJECTS;
  onModalOpen: () => void;
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
    <li>
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
    </li>
  );
}
