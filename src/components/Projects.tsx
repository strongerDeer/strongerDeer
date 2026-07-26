"use client";
import React, { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
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

  // 새로 드러나는 첫 카드. 이 카드들은 "더보기" 버튼보다 DOM 앞에 삽입되므로,
  // 초점을 옮겨주지 않으면 펼친 뒤 다음 Tab 이 새 카드를 모두 건너뛰고 다음 섹션으로 간다.
  const firstRevealedId = other[OTHER_COLLAPSED_COUNT]?.id;

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
          <h2 className="title">
            Projects <span>프로젝트</span>
          </h2>

          <div ref={otherSectionRef} className="list">
            <AnimatePresence mode="wait">
              <motion.ul
                id="projects-list"
                className="card grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                initial={false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {displayProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    index={index}
                    project={project}
                    compact={index >= featured.length}
                    // 접힌 상태에서 보여주는 맛보기 카드들은 blur 에 덮여 보이지 않는다.
                    hidden={!showAllOther && index >= featured.length}
                  />
                ))}
              </motion.ul>
            </AnimatePresence>
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
