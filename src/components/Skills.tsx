"use client";

import { MAIN_STACK, PROGRAMS, SKILL_DOMAINS } from "@data/skill";
import Link from "next/link";
import React from "react";

const Skills = () => {
  return (
    <div className="wrap" id="skills">
      <section>
        <h2 className="title">
          Skills <span>기술</span>
        </h2>
        <ul className="domains">
          {SKILL_DOMAINS.map(
            ({
              id,
              title,
              component,
              description,
              evidence,
              projectId,
              icon: Icon,
            }) => (
              <li key={id} className="domain">
                <span className="domainTag font-mono">
                  {"<"}
                  <span className="domainTagName">{component}</span> {"/>"}
                </span>
                <div className="domainHead">
                  <span className="domainIcon">
                    <Icon size={20} />
                  </span>
                  <strong>{title}</strong>
                </div>
                <p>{description}</p>
                <p className="evidence">{evidence}</p>
                {projectId && (
                  <Link className="domainLink" href={`/${projectId}`}>
                    근거 프로젝트 보기 <span aria-hidden="true">→</span>
                  </Link>
                )}
              </li>
            ),
          )}
        </ul>

        <ul className="stack">
          {MAIN_STACK.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Skills;
