"use client";

import { CAREERS, I_CAREERS } from "@data";
import { Code, SquareMousePointer, Trees } from "lucide-react";
import { useRef, useState } from "react";

export default function Career() {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const displayCareers = showAll ? CAREERS : CAREERS.slice(0, 2);

  const handleToggle = () => {
    setShowAll((prev) => !prev);
    if (showAll) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="wrap" id="career">
      <section ref={sectionRef}>
        <h2 className="title">Career</h2>
        <p>
          프론트엔드 개발 경력: <strong>2년 3개월</strong> / IT 부문 경력: 총{" "}
          <strong>10년</strong>
        </p>

        <div className="list">
          <ol>
            {(displayCareers as I_CAREERS[]).map((career, index) => (
              <li
                key={career.id}
                className={`${
                  showAll || index === 0 ? "opacity-100" : "opacity-30"
                }              `}
              >
                <div>
                  <h3>
                    <span>{career.company}</span>
                    {career.kor}
                  </h3>
                  {career.team && <p>{career.team}</p>}
                  <p>{career.period}</p>
                </div>
                <div className="content">
                  <p>
                    {career.position.includes("개발") ? (
                      <Code />
                    ) : career.position.includes("조경") ? (
                      <Trees />
                    ) : (
                      <SquareMousePointer />
                    )}
                    {career.position}
                  </p>
                  <ul>
                    {career.description.map((desc, i) => (
                      <li key={i} className="leading-relaxed">
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
          {!showAll && CAREERS.length > 2 && <div className="blur" />}
        </div>

        <button onClick={handleToggle} className={showAll ? "mt-6" : "-mt-16"}>
          {showAll ? "접기" : "이전 경력 보기"}
        </button>
      </section>
    </div>
  );
}
