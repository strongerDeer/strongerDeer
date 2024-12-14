"use client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { DEV_ICON_MAP, DevIconName, PROGRAMS, TABS } from "@data/skill";
import { Files } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import useInterval from "@hooks/useInterval";
import { AnimatePresence, motion } from "framer-motion";

export const TabContents = {
  "README.md": () => (
    <SyntaxHighlighter
      language="markdown"
      style={a11yDark}
      customStyle={{ backgroundColor: "#374151", padding: 0, margin: 0 }}
    >
      {`# strongerDeer

- 파일 및 아이콘을 클릭해보세요!
`}
    </SyntaxHighlighter>
  ),
  "HTML.html": () => (
    <>
      <h3>HTML</h3>
      <div className="hash_tag">
        <span>웹 접근성</span>
        <span>시맨틱</span>
        <span>SEO</span>
        <span>HTML/CSS 강사 경력</span>
      </div>
      <ul className="list">
        <li>시맨틱 마크업과 웹 접근성 준수를 중요하게 여깁니다.</li>
        <li>SEO(검색엔진 최적화)를 고려하여 시맨틱한 코드를 작성합니다.</li>
        <li>부트캠프에서 HTML/CSS 강사로 수강생들을 가르친 경험이 있습니다.</li>
        <li>
          웹 디자이너/퍼블리셔로 시/군청 웹 접근성 인증 마크 프로젝트를 다수
          진행했습니다.(부산시청, 고산군청, 울산시청 등)
        </li>
      </ul>
    </>
  ),
  CSS: () => (
    <>
      <h3>CSS</h3>
      <div className="hash_tag">
        <span>애니메이션</span>
        <span>Sass</span>
        <span>UI/UX</span>
        <span>HTML/CSS 강사 경력</span>
      </div>
      <ul className="list">
        <li>
          CSS, Sass, Vanilla Extract, Tailwind, Emotion, styled-components 등
          다양한 CSS 기술들을 사용할 수 있으며, 그중 Sass(scss) 사용을 가장
          선호합니다.
        </li>
        <li>부트캠프에서 HTML/CSS 강사로 수강생들을 가르친 경험이 있습니다.</li>
        <li>
          사용자 UI/UX를 고려하여 다양한 애니메이션 효과와 디테일한 속성을
          사용하는 것을 좋아합니다!
        </li>
      </ul>
    </>
  ),
  JavaScript: () => (
    <>
      <h3>JavaScript</h3>
      <ul className="list">
        <li>
          바닐라 JS, React, Next.js 등의 프로젝트 경험이 있고, Next.js
          프레임워크를 활용하여 웹을 구축하는 것을 가장 선호합니다.
        </li>
        <li>
          TypeScript를 통해 정적 타입 검사를 수행하여 코드의 안정성과
          유지보수성을 향상시키려 노력합니다.
        </li>

        <li>
          TypeScript를 통해 정적 타입 검사를 수행하여 코드의 안정성과
          유지보수성을 향상시키려 노력합니다.
        </li>
      </ul>
    </>
  ),
  React: () => (
    <>
      <h3>React</h3>
      <ul className="list">
        <li>
          Next.js App Router SSG, SSR, ISR로 데이터 처리 및 서버 작동방식을
          이해하고 있습니다.
        </li>
        <li>
          적절한 렌더링 방식 사용, 동적 import, Suspense 등을 활용하여 서비스의
          로딩 속도를 개선하기위해 노력합니다.
        </li>
        <li>
          CRUD 작업을 구현하면서, RESTful 서비스의 핵심 개념인 리소스 중심
          설계와 상태 없는 통신 원칙을 실제로 적용했습니다.(프로젝트 적용)
        </li>
        <li>
          React의 Hook 기능을 활용하여 컴포넌트 로직을 모듈화하고 재사용성이
          높은 코드를 작성합니다.
        </li>
        <li>
          React Context API를 활용하여 전역 테마 관리 시스템을 구현, 사용자
          설정에 따른 동적 UI 변경 기능 개발(프로젝트 적용)
        </li>
      </ul>
    </>
  ),
  "package.json": () => (
    <SyntaxHighlighter
      language="json"
      style={a11yDark}
      customStyle={{
        backgroundColor: "transparent",
        padding: 0,
        margin: 0,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        overflow: "wrap",
        height: "100%",
      }}
      showLineNumbers={true}
      wrapLines={true}
      wrapLongLines={true}
    >
      {`{
  "description":"필요에 따라 적절한 라이브러리 사용합니다", 
  "dependencies": {
    "firebase": "Firebase를 활용한 프로젝트 경험을 통해 REST API의 기본 원칙과 데이터 통신 방식에 대한 이해를 갖추었습니다",
    "chart.js": "^4",
    "lodash.debounce": "^4",
    "react-query": "^3",
    "recoil": "^0"
  }
}`}

      {/* 
        <li>
          REST API를 통한 데이터 통신에 대한 이해도 및 프로젝트 경험이 있습니다.
        </li>
        <li>
          CRUD 작업을 구현하면서, RESTful 서비스의 핵심 개념인 리소스 중심
          설계와 상태 없는 통신 원칙을 실제로 적용했습니다.(프로젝트 적용)
        </li> */}
    </SyntaxHighlighter>
  ),
};

const IconComponent = ({ icon }: { icon: DevIconName }) => {
  const IconComponent = DEV_ICON_MAP[icon].icon;
  const iconStyle = DEV_ICON_MAP[icon];

  return <IconComponent color={iconStyle.color} size={iconStyle.size || 16} />;
};

export default function Skill() {
  const [activeTab, setActiveTab] = useState<string>("README.md");
  const [isPaused, setIsPaused] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);

  const currentIndex = TABS.findIndex((tab) => tab.name === activeTab);

  const autoClick = () => {
    const nextIndex = (currentIndex + 1) % TABS.length;
    setActiveTab(TABS[nextIndex].name);
  };

  useInterval(
    () => {
      autoClick();
    },
    isPaused ? null : 3000
  );

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="wrap" id="skill">
      <section>
        <h2 className="title">
          Skill <span>기술</span>
        </h2>

        <div
          className="pc"
          onClick={() => {
            setIsClicked(true);
            setIsGlowing(false);
          }}
          onMouseEnter={() => {
            setIsPaused(true);
            !isClicked && setIsGlowing(true);
          }}
          onMouseLeave={() => {
            setIsPaused(false);
            setIsGlowing(false);
          }}
        >
          <div className="vs-viewer">
            <div className="top">
              <span className="dot">
                {[...Array(3)].map((_, i) => (
                  <span key={i}></span>
                ))}
              </span>
              <p>strongerDeer</p>
            </div>

            <div>
              <div className="icon">
                <Files />
              </div>

              <ul className="tab">
                {TABS.map((tab) => (
                  <li key={tab.id}>
                    {tab.subItems ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handleTabClick(tab.name)}
                          className={`
                            ${activeTab === tab.name ? "active" : ""}
                            ${isGlowing ? "glow" : ""}
                          `}
                        >
                          <span>
                            <IconComponent icon={tab.icon} />
                            {tab.name}
                          </span>
                          {tab.subItems.map((subItem) => (
                            <span key={subItem.id}>
                              <IconComponent icon={subItem.icon} />
                              {subItem.name}
                            </span>
                          ))}
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleTabClick(tab.name)}
                        className={`
                          ${activeTab === tab.name ? "active" : ""}
                          ${isGlowing ? "glow" : ""}
                        `}
                      >
                        <span>
                          <IconComponent icon={tab.icon} />
                          {tab.name}
                        </span>
                      </button>
                    )}
                  </li>
                ))}
              </ul>

              <div className="viewer">
                <div className="open_tab">
                  <div>
                    <IconComponent
                      icon={
                        TABS.find((tab) => tab.name === activeTab)?.icon || "MD"
                      }
                    />
                    {activeTab}
                  </div>
                </div>
                <div className="view-con">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {TabContents[activeTab as keyof typeof TabContents]?.()}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          <div className="program">
            {PROGRAMS.map((program) => (
              <button
                key={program.id}
                type="button"
                className={`${isGlowing ? "glow" : ""}`}
              >
                <Image src={program.image} alt="" width={100} height={100} />
                <span>
                  <strong>{program.name}</strong>
                  {program.description}
                </span>
              </button>
            ))}
          </div>

          <Image src="/program/bg.png" alt="" width={1000} height={1000} />
        </div>
      </section>
    </div>
  );
}
