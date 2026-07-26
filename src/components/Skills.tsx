// 상태·이벤트·브라우저 API 가 없어 서버 컴포넌트로 둔다.
import {
  I_SkillDomain,
  MAIN_STACK,
  SKILL_DOMAINS,
  WORKFLOW_DOMAINS,
} from "@data/skill";
import Link from "next/link";
import React from "react";

const DomainList = ({
  domains,
  className,
}: {
  domains: I_SkillDomain[];
  className?: string;
}) => (
  <ul className={`domains ${className ?? ""}`}>
    {domains.map(
      ({ id, title, component, description, evidence, projectId, icon: Icon }) => (
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
);

const Skills = () => {
  return (
    <div className="wrap" id="skills">
      <section>
        <h2 className="title">
          Skills <span>기술</span>
        </h2>

        <h3 className="domainGroupTitle">
          Technical Domains <span>제품 역량</span>
        </h3>
        <DomainList domains={SKILL_DOMAINS} />

        {/* AI·자동화는 제품 역량과 같은 위계가 아니라 그 역량을 수행하는 방식이라 묶음을 나눈다. */}
        <h3 className="domainGroupTitle">
          AI &amp; Workflow <span>일하는 방식</span>
        </h3>
        <DomainList domains={WORKFLOW_DOMAINS} className="domainsWorkflow" />

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
