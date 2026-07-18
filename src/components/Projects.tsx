"use client";
import React, { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { I_PROJECTS } from "@data/project";
import ProjectCard from "./project/ProjectCard";
import MoreToggleBtn from "./shared/MoreToggleBtn";
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

  const handleToggle = () => {
    setShowAllOther((prev) => !prev);
    if (showAllOther) {
      otherSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

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
