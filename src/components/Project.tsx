"use client";
import { useEffect, useState } from "react";
import { I_PROJECTS, PROJECTS } from "@data";
import { BarChart, BriefcaseBusiness, Cpu, Layout, User } from "lucide-react";

export default function Project() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [filteredProjects, setFilteredProjects] = useState<I_PROJECTS[] | []>(
    []
  );

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
      {/* Projects Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
            프로젝트
          </h2>

          <div className="flex justify-center gap-4 mb-12 flex-wrap">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={`${project.title}-${index}`}
                className="project-card bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 "
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <p className="inline-flex rounded-2xl text-sm items-center text-gray-600 mb-6">
                  {project.type === "개인" ? (
                    <>
                      <User className="h-4" />
                      개인 프로젝트
                    </>
                  ) : (
                    <>
                      <BriefcaseBusiness className="h-4" />
                      업무
                    </>
                  )}
                </p>
                <div className="flex items-center mb-4">
                  {project.icon === "BarChart" ? (
                    <BarChart />
                  ) : project.icon === "Cpu" ? (
                    <Cpu />
                  ) : (
                    <Layout />
                  )}
                  <h3 className="text-xl font-bold ml-2 text-gray-800">
                    {project.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <p className="text-gray-500 text-sm mb-4">{project.longDesc}</p>
                <div className="mb-4">
                  {project.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-sm text-gray-600 mb-1"
                    >
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {metric}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
