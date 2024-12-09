"use client";
import { useState } from "react";

export default function Experience() {
  const [toggle, setToggle] = useState(false);
  return (
    <section>
      <h2>Work Experience</h2>
      <ol>
        <li>
          <h3>위니브 Weniv</h3>
          <p>2022.04 ~ 2024.07(2년 3개월)</p>

          <h4>프론트엔드 개발</h4>
          <ul>
            <li>내용 삽입</li>
            <li>내용 삽입</li>
            <li>내용 삽입</li>
          </ul>
        </li>
      </ol>
      {toggle ? (
        <ol>
          <li>
            <h3>팀스톤</h3>
            <ul>
              <li>내용 삽입</li>
              <li>내용 삽입</li>
              <li>내용 삽입</li>
            </ul>
          </li>
        </ol>
      ) : (
        <button type="button" onClick={() => setToggle((prev) => !prev)}>
          이전 경력 보기
        </button>
      )}
    </section>
  );
}
