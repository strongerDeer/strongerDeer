"use client";
import React, { useEffect, useState } from "react";
import { useModalContext } from "@contexts/ModalContext";
import { I_PROJECTS, PROJECTS } from "@data";

import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function Project() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [filteredProjects, setFilteredProjects] = useState<I_PROJECTS[] | []>(
    []
  );
  const { open } = useModalContext();

  useEffect(() => {
    setFilteredProjects(
      activeFilter === "all"
        ? PROJECTS
        : PROJECTS.filter((project) => project.tags.includes(activeFilter))
    );
  }, [activeFilter]);

  const allTags = [...new Set(PROJECTS.flatMap((project) => project.tags))];

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
          {filteredProjects.length > 0 && (
            <ul className="card">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  onModalOpen={() => open(<ProjectModal project={project} />)}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
