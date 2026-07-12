"use client";

import { MAIN_STACK, PROGRAMS, SKILL_DOMAINS } from "@data/skill";
import Image from "next/image";
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
          {SKILL_DOMAINS.map(({ id, title, description, evidence, image, projectId, icon: Icon }) => (
            <li key={id} className="domain">
              <div className="domainHead">
                <span className="domainIcon">
                  <Icon size={20} />
                </span>
                <strong>{title}</strong>
              </div>
              {projectId && (
                <Link
                  href={`/${projectId}`}
                  className="domainImage"
                  aria-label={`${title} 관련 프로젝트 상세 보기`}
                >
                  <Image
                    src={`/strongerDeer${image}`}
                    width={640}
                    height={360}
                    alt=""
                  />
                </Link>
              )}
              <p>{description}</p>
              <p className="evidence">{evidence}</p>
            </li>
          ))}
        </ul>

        <ul className="stack">
          {MAIN_STACK.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>

        <details className="tools">
          <summary>작업 환경 · 협업 도구</summary>
          <div className="program">
            {PROGRAMS.map((program) => (
              <span key={program.id} className="tool">
                {program.icon ? (
                  <span className="iconProgram">
                    {React.createElement(program.icon, { size: 18 })}
                  </span>
                ) : (
                  <Image
                    src={`/strongerDeer${program.image}`}
                    width={40}
                    height={40}
                    alt=""
                  />
                )}
                <span className="toolName">
                  <strong>{program.name}</strong>
                  {program.description}
                </span>
              </span>
            ))}
          </div>
        </details>
      </section>
    </div>
  );
};

export default Skills;
