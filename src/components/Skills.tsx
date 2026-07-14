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
          {SKILL_DOMAINS.map(
            ({
              id,
              title,
              component,
              description,
              evidence,
              image,
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
                {/* {projectId && (
                  <Image
                    src={`/strongerDeer${image}`}
                    width={640}
                    height={360}
                    alt=""
                  />
                )} */}
                <p>{description}</p>
                <p className="evidence">{evidence}</p>
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
