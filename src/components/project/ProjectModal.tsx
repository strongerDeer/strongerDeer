import { LinkBtn } from "./ProjectBtns";
import React from "react";
import TypeIcon from "./TypeIcon";
import { I_PROJECTS, ICON_MAP, ICON_TYPE } from "@data/project";

export default function ProjectModal({ project }: { project: I_PROJECTS }) {
  const { type, title, kor, icon, description, github, url, content } = project;

  const IconComponent = ICON_MAP[icon as ICON_TYPE];

  return (
    <>
      <div className="modalTop">
        <TypeIcon type={type} />
        <div className="flex items-center justify-between">
          <h2 className="title flex items-center gap-2">
            <IconComponent />
            {title} <span>{kor}</span>
          </h2>
        </div>
      </div>

      <div className="modalContent">
        <p className="text-gray-500">{description}</p>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <div className="flex gap-1 absolute top-8 right-16">
        {github && <LinkBtn type="github" url={github} />}
        {url && <LinkBtn type="url" url={url} />}
      </div>
    </>
  );
}
