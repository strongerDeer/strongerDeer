"use client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { I_Tab, PROGRAMS, TABS } from "@data/skill";
import { Files } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useInterval from "@hooks/useInterval";
import { AnimatePresence, motion } from "framer-motion";
import useWindowSize from "@utils/useWindowSize";
import { FaHtml5 } from "react-icons/fa";

export const TabContents = {
  "HTML.html": () => (
    <>
      <h3>HTML</h3>
      <div className="hash_tag">
        <span>웹 접근/표준</span>
        <span>시맨틱 마크업</span>
        <span>SEO</span>
        <span>HTML/CSS 강사</span>
      </div>
      <ul className="list">
        <li>시맨틱 마크업과 웹 접근성 준수를 중요하게 여깁니다.</li>
        <li>
          SEO(검색엔진 최적화)를 위한 메타데이터 작성 및 구조화된 마크업을
          구현합니다.
        </li>
        <li>부트캠프에서 HTML/CSS 강사로 수강생들을 가르친 경험이 있습니다.</li>
        <li>
          공공기관(부산시청, 울산시청 등) 웹 접근성 인증 마크 프로젝트를 다수
          수행하였습니다.(웹디자인/퍼블리셔 경력)
        </li>
      </ul>
    </>
  ),
  CSS: () => (
    <>
      <h3>CSS</h3>
      <div className="hash_tag">
        <span>Sass</span>
        <span>반응형</span>
        <span>애니메이션</span>
        <span>UI/UX</span>
        <span>HTML/CSS 강사</span>
      </div>
      <ul className="list">
        <li>
          CSS, Sass, Vanilla Extract, Tailwind, Emotion, styled-components 등
          다양한 CSS 기술들을 사용할 수 있으며, 그중 Sass(scss) 사용을 가장
          선호합니다.
        </li>
        <li>
          Sass의 variables, mixins, functions를 활용한 효율적인 스타일 관리가
          가능합니다.
        </li>
        <li>
          Context API와 CSS 변수를 활용한 라이트/다크 테마 구현 경험이 있습니다.
        </li>
        <li>반응형 웹 디자인 및 크로스 브라우저 호환 작업이 가능합니다.</li>
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
      <div className="hash_tag">
        <span>로컬 스토리지</span>
        <span>안정성</span>
        <span>유지 보수</span>
        <span>API 통신</span>
      </div>
      <ul className="list">
        <li>
          바닐라 JS, React, Next.js 등의 프로젝트 경험이 있고, Next.js
          프레임워크를 활용하여 웹을 구축하는 것을 가장 선호합니다.
        </li>
        <li>이벤트 처리 및 DOM 조작을 통한 동적 UI 구현 경험이 있습니다.</li>
        <li>
          로컬 스토리지를 활용하여 로그인 상태 유지, 테마설정 등 사용자 데이터를
          관리했습니다.
        </li>
        <li>
          TypeScript를 통해 정적 타입 검사를 수행하여 코드의 안정성과 유지
          보수성을 향상하려 노력합니다.
        </li>
        <li>
          Firebase를 활용한 프로젝트 경험을 통해 REST API의 기본 원칙과 데이터
          통신 방식에 대한 이해를 갖추었습니다.
        </li>
      </ul>
    </>
  ),
  React: () => (
    <>
      <h3>React</h3>
      <div className="hash_tag">
        <span>Hook</span>
        <span>React-Query</span>
        <span>렌더링</span>
        <span>성능 최적화</span>
      </div>
      <ul className="list">
        <li>
          React의 Hook 기능을 활용하여 컴포넌트 로직을 모듈화하고 재사용성이
          높은 코드를 작성합니다.
        </li>
        <li>Context API, React-Query, Recoil 상태관리 경험이 있습니다.</li>
        <li>
          React-Query를 사용하여 페이지네이션, 무한스크롤을 구현할 수 있습니다.
        </li>
        <li>
          Next.js App Router SSG, SSR, ISR로 데이터 처리 및 서버 작동방식을
          이해하고 있습니다.
        </li>
        <li>
          적절한 렌더링 방식 사용, 동적 import, Suspense 등을 활용하여 서비스의
          로딩 속도를 개선하기 위해 노력합니다.
        </li>
        <li>
          API 통신, Modal, 테마 적용, 폼 데이터 등에 커스텀 훅을 사용합니다.
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
  "설명": "필요에 따라 적절한 기술을 사용합니다. 아래 기술들을 사용한 경험이 있습니다.", 
  "주요 활용 기술": {
    "상태 관리": ["React-Query", "Recoil", "Context API"],
    "데이터시각화": ["Chart.js"],
    "백엔드통신": ["Firebase", "REST API", "Axios"],
    "성능 최적화": ["Lodash", "Date-fns"],
    "코드 품질": ["ESLint", "Prettier"],
    "버전 관리": ["Git", "GitHub"],
    "문서화": ["Storybook", "JSDoc"],
    "배포/자동화": ["GitHub Actions", "Vercel", "AWS Amplify"]
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

export default function Skill() {
  const { width } = useWindowSize();
  const [tabs, setTabs] = useState<I_Tab[]>(TABS);
  const [activeTab, setActiveTab] = useState<string>("HTML.html");
  const [isPaused, setIsPaused] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);

  const currentIndex = tabs.findIndex((tab) => tab.name === activeTab);

  const autoClick = () => {
    const nextIndex = (currentIndex + 1) % tabs.length;
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

  useEffect(() => {
    if (width <= 1024) {
      setTabs(TABS.filter((tab) => tab.name !== "package.json"));
      if (activeTab === "package.json") {
        setActiveTab("HTML.html");
      }
    } else {
      setTabs(TABS);
    }
  }, [width, activeTab]);

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
            if (!isClicked) {
              setIsGlowing(true);
            }
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
              <div className="icon hidden lg:block">
                <Files />
              </div>
              <div className="bg-gray-800">
                <p className="py-2 px-3 text-xs text-gray-400 hidden lg:block">
                  탐색기
                </p>
                <ul className="tab">
                  {tabs.map((tab) => (
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
                              {React.createElement(tab.icon, {
                                color: tab.color,
                                size: tab.size || 16,
                                className: "all",
                              })}
                              {React.createElement(tab.subItems[0].icon, {
                                className: "mobile",
                                color: tab.subItems[0].color,
                                size: tab.subItems[0].size || 16,
                              })}

                              {tab.name}
                            </span>
                            {tab.subItems.map((subItem) => (
                              <span key={subItem.id}>
                                {React.createElement(subItem.icon, {
                                  color: subItem.color,
                                  size: subItem.size || 16,
                                })}
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
                            {React.createElement(tab.icon, {
                              color: tab.color,
                              size: tab.size || 16,
                            })}
                            {tab.name.split(".")[0]}
                            <span className="all">
                              .{tab.name.split(".")[1]}
                            </span>
                          </span>
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="viewer">
                <div className="open_tab">
                  <div>
                    {(() => {
                      const activeTabInfo = tabs.find(
                        (tab) => tab.name === activeTab
                      );
                      // subItems가 있으면 첫 번째 subItem의 아이콘 정보 사용, 없으면 탭의 기본 아이콘 정보 사용
                      const iconInfo = activeTabInfo?.subItems
                        ? {
                            icon: activeTabInfo.subItems[0].icon,
                            color: activeTabInfo.subItems[0].color,
                            size: activeTabInfo.subItems[0].size || 16,
                          }
                        : {
                            icon: activeTabInfo?.icon || FaHtml5,
                            color: activeTabInfo?.color || "#E34F26",
                            size: activeTabInfo?.size || 16,
                          };

                      return React.createElement(iconInfo.icon, {
                        color: iconInfo.color,
                        size: iconInfo.size,
                      });
                    })()}
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
                <Image
                  src={`/strongerDeer${program.image}`}
                  width={100}
                  height={100}
                  alt=""
                />
                <span>
                  <strong>{program.name}</strong>
                  {program.description}
                </span>
              </button>
            ))}
          </div>

          <Image
            src="/strongerDeer/program/bg.png"
            alt=""
            width={1000}
            height={1000}
          />
        </div>
      </section>
    </div>
  );
}
