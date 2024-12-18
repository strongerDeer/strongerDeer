import { LinkBtn } from "./ProjectBtns";
import React from "react";
import Tag from "@components/shared/Tag";
import TypeIcon from "./TypeIcon";
import { I_PROJECTS } from "@data/project";

export default function ProjectModal({ project }: { project: I_PROJECTS }) {
  const {
    type,
    title,
    kor,
    icon,
    description,
    background,
    metrics,
    skills,
    person,
    role,
    insights,
    jobs,
    period,
    github,
    url,
  } = project;

  return (
    <>
      <div className="modalTop">
        <TypeIcon type={type} />
        <div className="flex items-center justify-between">
          <h3 className="title flex items-center gap-2">
            {React.createElement(icon)} {title} <span>{kor}</span>
          </h3>
        </div>
      </div>

      <div className="modalContent">
        <p className="text-gray-500">{description}</p>

        <h4>주요 기술 스택</h4>
        <Tag tags={skills} />

        <section>
          <h4>프로젝트 개요</h4>
          <p className="mb-2">{background}</p>
          <ul className="list">
            <li>참여 인원: {person}</li>
            <li>작업 기간: {period}</li>
            <li>담당 역할: {role}</li>
          </ul>
        </section>

        <ProjectSection title="핵심 기능 및 작업 내역" items={jobs} />
        <ProjectSection title="성과 및 기여" items={metrics} />
        <ProjectSection title="프로젝트 인사이트" items={insights} />
      </div>
      <div className="flex gap-1 absolute top-8 right-16">
        {github && <LinkBtn type="github" url={github} />}
        {url && <LinkBtn type="url" url={url} />}
      </div>
    </>
  );
}

const ProjectSection = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => {
  if (items.length === 0) return null;

  return (
    <section>
      <h4>{title}</h4>
      <ul className="list">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
};
