"use client";
import React, { useState } from "react";

import { I_PROJECTS } from "@data/project";
import ProjectCard from "./project/ProjectCard";
import MoreToggleBtn from "./shared/MoreToggleBtn";
import { scrollIntoViewSafely } from "@utils/motion";
type ProjectProps = {
  projects: I_PROJECTS[];
};

const FEATURED_COUNT = 4;
const OTHER_COLLAPSED_COUNT = 2;
const HIDDEN_PROJECT_IDS: string[] = [];

const Projects = ({ projects }: ProjectProps) => {
  const [showAllOther, setShowAllOther] = useState(false);
  const otherSectionRef = React.useRef<HTMLDivElement>(null);

  const featured = projects.filter((p) => p.index <= FEATURED_COUNT);
  const other = projects.filter(
    (p) => p.index > FEATURED_COUNT && !HIDDEN_PROJECT_IDS.includes(p.id)
  );
  const displayOther = showAllOther
    ? other
    : other.slice(0, OTHER_COLLAPSED_COUNT);
  const displayProjects = [...featured, ...displayOther];

  // 펼쳤을 때 처음으로 초점 가능해지는 카드.
  // 접힌 상태에서도 other[0..1] 은 DOM 에 있지만 blur 에 덮여 inert 라 초점을 받지 못한다.
  // 따라서 "새로 추가되는 카드"(other[2])가 아니라 other[0] 이 기준이다.
  // 또한 이 카드들은 "더보기" 버튼보다 DOM 앞에 있어, 초점을 옮기지 않으면
  // 펼친 뒤 다음 Tab 이 새 카드를 모두 건너뛰고 다음 섹션으로 간다.
  const firstRevealedId = other[0]?.id;

  const handleToggle = () => {
    setShowAllOther((prev) => !prev);
    if (showAllOther) {
      scrollIntoViewSafely(otherSectionRef.current);
    }
  };

  React.useEffect(() => {
    if (!showAllOther || !firstRevealedId) return;
    document.getElementById(firstRevealedId)?.focus();
  }, [showAllOther, firstRevealedId]);

  return (
    <>
      <div className="wrap" id="projects">
        <section>
          <h2 id="projects-heading" tabIndex={-1} className="title skipTarget">
            Projects <span>프로젝트</span>
          </h2>

          <div ref={otherSectionRef} className="list">
            <ul
              id="projects-list"
              className="card grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
            >
              {displayProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  compact={index >= featured.length}
                  // 접힌 상태에서 보여주는 맛보기 카드들은 blur 에 덮여 보이지 않는다.
                  hidden={!showAllOther && index >= featured.length}
                />
              ))}
            </ul>
            {!showAllOther && other.length > OTHER_COLLAPSED_COUNT && (
              <div className="blur" />
            )}
          </div>

          {other.length > 0 && (
            <>
              {other.length > OTHER_COLLAPSED_COUNT && (
                <MoreToggleBtn
                  text="프로젝트 더보기"
                  className={showAllOther ? "mt-6" : "-mt-12"}
                  showAll={showAllOther}
                  onClick={handleToggle}
                  controls="projects-list"
                />
              )}
            </>
          )}
        </section>
      </div>
    </>
  );
};

export default Projects;
