"use client";
import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { I_PROJECTS } from "@data/project";
import ProjectCard from "./project/ProjectCard";
interface ProjectProps {
  projects: I_PROJECTS[];
}

export default function Projects({ projects }: ProjectProps) {
  return (
    <>
      <div className="wrap" id="projects">
        <section>
          <h2 className="title">
            Projects <span>프로젝트</span>
          </h2>

          <AnimatePresence mode="wait">
            <motion.ul
              className="card md:grid-cols-2 xl:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {projects.map((project, index) => (
                <ProjectCard
                  key={`${project.title}-${index}`}
                  index={index}
                  project={project}
                />
              ))}
            </motion.ul>
          </AnimatePresence>
        </section>
      </div>
    </>
  );
}
