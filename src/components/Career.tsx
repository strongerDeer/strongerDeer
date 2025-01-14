"use client";

import { CAREERS, I_CAREERS } from "@data/careers";
import { Code, SquareMousePointer, Trees } from "lucide-react";
import { useRef, useState } from "react";
import MoreToggleBtn from "./shared/MoreToggleBtn";
import Image from "next/image";

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
        <h2 className="title">
          Career<span>경력</span>
        </h2>
        <p>
          프론트엔드 개발 경력: <strong>2년 3개월</strong>{" "}
          <span className="block sm:inline">
            <span className="hidden sm:inline">/</span> IT 부문 경력: 총{" "}
            <strong>10년</strong>
          </span>
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
                    {career.kor} / {career.location}
                  </h3>
                  <p className="mb-3">{career.period}</p>
                  <p className="mb-3">{career.info}</p>
                  {career.team && <p>{career.team}</p>}
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

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 full">
                    {career.images &&
                      career.images.map((image, i) => (
                        <Image
                          key={i}
                          src={`/strongerDeer${image}`}
                          alt=""
                          width={200}
                          height={200}
                          className="rounded-xl w-full max-w-72"
                        />
                      ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
          {!showAll && CAREERS.length > 2 && <div className="blur" />}
        </div>

        <MoreToggleBtn
          text="이전 경력 보기"
          className={showAll ? "mt-6" : "-mt-16"}
          showAll={showAll}
          onClick={handleToggle}
        />
      </section>
    </div>
  );
}
