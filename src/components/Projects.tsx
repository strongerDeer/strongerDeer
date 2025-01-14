"use client";
import React, { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { I_PROJECTS } from "@data/project";
import ProjectCard from "./project/ProjectCard";
import MoreToggleBtn from "./shared/MoreToggleBtn";
import useWindowSize from "@utils/useWindowSize";

interface ProjectProps {
  initialProjects: I_PROJECTS[];
}

export default function Projects({ initialProjects }: ProjectProps) {
  const [showAll, setShowAll] = useState(false);
  const { width } = useWindowSize();

  const displayProjects = showAll
    ? initialProjects
    : initialProjects.slice(0, width < 1280 && width > 768 ? 4 : 3);

  return (
    <>
      <div className="wrap" id="projects">
        <section>
          <h2 className="title">
            Projects <span>프로젝트</span>
          </h2>

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
                      key={`${project.title}-${index}`}
                      index={index}
                      project={project}
                    />
                  ))}
                </motion.ul>
                {initialProjects.length > 3 && (
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
