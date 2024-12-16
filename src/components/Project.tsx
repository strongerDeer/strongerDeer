"use client";
import React, { useEffect, useState } from "react";
import { useModalContext } from "@contexts/ModalContext";
import { I_PROJECTS } from "@data";

import { AnimatePresence, motion } from "framer-motion";
import { PROJECTS } from "@data/project";
import ProjectCard from "./project/ProjectCard";
import ProjectModal from "./project/ProjectModal";
import MoreToggleBtn from "./shared/MoreToggleBtn";

export default function Project() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [filteredProjects, setFilteredProjects] = useState<I_PROJECTS[] | []>(
    []
  );
  const [showAll, setShowAll] = useState(false);

  const { open } = useModalContext();

  useEffect(() => {
    setFilteredProjects(
      activeFilter === "all"
        ? PROJECTS
        : PROJECTS.filter((project) => project.tags.includes(activeFilter))
    );
  }, [activeFilter]);

  const allTags = [...new Set(PROJECTS.flatMap((project) => project.tags))];
  const displayProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 3);

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
            {allTags.map((tag) => (
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
                  className="card sm:grid-cols-2 xl:grid-cols-3"
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
