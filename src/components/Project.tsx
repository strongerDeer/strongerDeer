"use client";
import React, { useEffect, useState } from "react";
import { useModalContext } from "@contexts/ModalContext";

import { AnimatePresence, motion } from "framer-motion";
import { I_PROJECTS, PROJECTS, SKILL, SkillType } from "@data/project";
import ProjectCard from "./project/ProjectCard";
import ProjectModal from "./project/ProjectModal";
import MoreToggleBtn from "./shared/MoreToggleBtn";
import useWindowSize from "@utils/useWindowSize";

export default function Project() {
  const [activeFilter, setActiveFilter] = useState<SkillType | "all">("all");
  const [filteredProjects, setFilteredProjects] = useState<I_PROJECTS[] | []>(
    []
  );
  const [showAll, setShowAll] = useState(false);

  const { open } = useModalContext();
  const { width } = useWindowSize();

  useEffect(() => {
    setFilteredProjects(
      activeFilter === "all"
        ? PROJECTS
        : PROJECTS.filter((project) => project.tags.includes(activeFilter))
    );
  }, [activeFilter]);

  const displayProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, width < 1280 && width > 768 ? 4 : 3);

  return (
    <>
      <div className="wrap" id="project">
        <section>
          <h2 className="title">
            Project <span>프로젝트</span>
          </h2>

          <div className="projectTab">
            <button
              onClick={() => setActiveFilter("all")}
              className={` ${activeFilter === "all" ? "active" : ""}`}
            >
              All
            </button>
            {SKILL.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={` ${activeFilter === tag ? "active" : ""}`}
              >
                {tag}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {displayProjects.length > 0 && (
              <>
                <motion.ul
                  className="card md:grid-cols-2 xl:grid-cols-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {displayProjects.map((project, index) => (
                    <ProjectCard
                      key={`${project.title}-${activeFilter}-${index}`}
                      index={index}
                      project={project}
                      onModalOpen={() =>
                        open(<ProjectModal project={project} />)
                      }
                    />
                  ))}
                </motion.ul>
                {filteredProjects.length > 3 && (
                  <div className="text-center mt-8">
                    <MoreToggleBtn
                      text="프로젝트 더 보기"
                      showAll={showAll}
                      onClick={() => setShowAll(!showAll)}
                    />
                  </div>
                )}
              </>
            )}
          </AnimatePresence>
        </section>
      </div>
    </>
  );
}
