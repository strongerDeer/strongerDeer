"use client";
import React, { useEffect, useRef, useState } from "react";
import { useModalContext } from "@contexts/ModalContext";
import { I_PROJECTS, PROJECTS } from "@data";

import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { AnimatePresence, motion } from "framer-motion";

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

          <div className="flex gap-4 mb-12 flex-wrap">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeFilter === "all"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeFilter === tag
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
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
                {filteredProjects.length > 4 && (
                  <div className="text-center mt-8">
                    <button
                      onClick={() => setShowAll(!showAll)}
                      className="px-6 py-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      {showAll ? "접기" : "더 보기"}
                    </button>
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
