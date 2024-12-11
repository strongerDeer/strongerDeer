"use client";
import React, { useEffect, useState } from "react";
import { I_PROJECTS, ICON_MAP, PROJECTS } from "@data";
import {
  BarChart,
  BriefcaseBusiness,
  ExternalLink,
  Github,
  Search,
  User,
} from "lucide-react";
import Image from "next/image";

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
      <section className="wrap" id="project">
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

          {filteredProjects.length > 0 && (
            <ul className="card">
              {filteredProjects.map(
                (
                  {
                    type,
                    thumb,
                    title,
                    kor,
                    description,
                    longDesc,
                    tags,
                    icon,
                    metrics,
                    url,
                    github,
                  },
                  index
                ) => (
                  <li key={`${title}-${index}`}>
                    <div className="thumb">
                      <p>
                        {type === "개인" ? (
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
                      {thumb && (
                        <Image src={thumb} alt="" width={300} height={300} />
                      )}
                    </div>
                    <div className="content">
                      <div>
                        <h3>
                          {React.createElement(ICON_MAP[icon] || BarChart)}{" "}
                          {title}
                        </h3>

                        <p>{description}</p>
                        <p>{longDesc}</p>

                        <ul className="list2">
                          {metrics.map((metric, idx) => (
                            <li key={idx}>{metric}</li>
                          ))}
                        </ul>
                      </div>

                      <p className="tag">
                        {tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </p>
                      <div className="btn-group">
                        <button type="button" className="go">
                          <Search />
                          <span>{url}</span>
                        </button>

                        {github && (
                          <a href={github} target="_blank" className="go">
                            <Github />
                            <span>{github}</span>
                          </a>
                        )}

                        {url && (
                          <a href={url} target="_blank" className="go">
                            <ExternalLink />
                            <span>{url}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
