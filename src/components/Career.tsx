"use client";

import { CAREERS, I_CAREERS } from "@data";
import { useState } from "react";

export default function Career() {
  const [showAll, setShowAll] = useState(false);

  const displayCareers = showAll ? CAREERS : CAREERS.slice(0, 2);

  return (
    <div className="w-full max-w-3xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-gray-800">Career</h2>
      <p className="mt-4 mb-8 text-gray-600">
        프론트엔드 개발 경력: <strong>2년 3개월</strong> / IT 부문 경력: 총{" "}
        <strong>10년</strong>
      </p>

      <div className="relative flex flex-col gap-4">
        {(displayCareers as I_CAREERS[]).map((career, index) => (
          <div
            key={career.id}
            className={`
              p-6 rounded-lg border border-gray-200 
              transition-all duration-500 bg-white
              ${showAll || index === 0 ? "opacity-100" : "opacity-30"}
            `}
          >
            <div className="mb-4 text-gray-600">{career.period}</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              {career.company}
            </h3>
            <div className="text-gray-700 mb-4">{career.position}</div>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
              {career.description.map((desc, i) => (
                <li key={i} className="leading-relaxed">
                  {desc}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {!showAll && CAREERS.length > 2 && (
          <div className="absolute top-[200px] left-0 w-full h-full bg-gradient-to-b from-transparent from-0% via-white/80 to-white pointer-events-none" />
        )}

        <button
          onClick={() => setShowAll((prev) => !prev)}
          className={`px-6 py-2 text-sm border border-gray-600 rounded-full hover:bg-gray-50 transition-colors mx-auto block relative ${
            showAll ? "mt-6" : "-mt-32"
          }`}
        >
          {showAll ? "접기" : "이전 경력 보기"}
        </button>
      </div>
    </div>
  );
}
