# 포트폴리오 리뉴얼 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 노션 이력서/포트폴리오 문서를 기준으로 `stronger-deer` 포트폴리오 사이트의 Hero/Projects/Experience/Skills를 전면 갱신하고, NOVERA 4개 프로젝트를 신설하며, Page0127 상세를 "기능 나열"에서 "UI/UX 판단 과정" 구조로 재작성한다.

**Architecture:** Next.js App Router 기반 정적 콘텐츠 사이트. 데이터는 `src/data/*.ts`(TypeScript 상수)와 `projects/*.md`(frontmatter + remark→rehype 파이프라인)로 이원화되어 있으며, 컴포넌트는 이 데이터를 그대로 렌더링하는 구조. 이번 작업은 새 아키텍처를 도입하지 않고 기존 데이터 스키마(`I_PROJECTS`, `I_CAREERS` 등)를 그대로 채우거나 최소 확장한다.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript strict, Tailwind CSS, framer-motion, gray-matter + remark/rehype(마크다운 파이프라인), lucide-react.

## Global Constraints

- 회사 프로젝트(NOVERA/Weniv)는 내부 URL, 로컬 경로, 관리자 화면, 고객/주문/매출 정보를 노출하지 않는다 (노션 "공개용 포트폴리오 원칙" 그대로 적용).
- 지어낸 수치·화면·사용자 데이터를 서술하지 않는다. 모든 수치는 노션 원문에 있는 값만 사용한다.
- 커밋/푸시는 사용자가 명시적으로 요청할 때만 실행한다 (각 태스크의 "Commit" 스텝은 파일 변경만 스테이징하지 않고 **git add까지만 수행하며 실제 commit은 사용자 승인 후 일괄 진행**— 이 계획의 모든 Step "Commit"은 이 규칙에 따라 생략 또는 보류로 대체한다. 상세는 태스크별 안내 참고).
- Named export만 사용, `function` 선언식 컴포넌트 금지, `any` 금지, Props 타입 명시 — 기존 코드베이스가 이미 이 컨벤션을 따르므로 신규/수정 코드도 동일하게 따른다.
- `npm run lint`, `npm run build`가 이 프로젝트의 검증 수단이다 (별도 테스트 러너 없음 — 콘텐츠/마크업 위주 프로젝트이므로 TDD 대신 타입체크+빌드+육안 확인으로 검증한다).

---

## 작업 개요 (파일별 책임)

| 파일 | 책임 |
|---|---|
| `src/data/introduce.ts` | Hero 키워드 3개 데이터 |
| `src/components/Hero.tsx` | Hero 카피 + 키워드 렌더링 |
| `src/data/careers.ts` | 경력 배열(NOVERA 추가) |
| `src/components/Work.tsx` | 경력 렌더링 + 상단 요약 수치 |
| `projects/novera-shop.md` | NOVERA Shop 상세 (신규) |
| `projects/novera-event-dashboard.md` | 이벤트 분석 대시보드 상세 (신규) |
| `projects/novera-quality-dashboard.md` | 품질·성능 대시보드 상세 (신규) |
| `projects/nds.md` | NDS 디자인시스템 상세 (신규) |
| `projects/page0127.md` | Page0127 상세 전면 재작성 |
| `projects/weniv-analytics.md` 등 6개 | frontmatter `index`/`metrics` 조정만 |
| `src/utils/projects.ts` | Page0127 heading id 매핑 조정 |
| `src/components/project/ProjectThumb.tsx` | 이미지 없을 때 텍스트+수치 폴백 |
| `src/components/Projects.tsx` | Featured/Other 그룹 분리 렌더링 |
| `src/data/skill.ts` | TABS 5개 강점 축 + skillData 카테고리 |
| `src/components/Skills.tsx` | TabContents 텍스트 교체 |
| `src/data/experience.ts` | 강의 수강생/평점 수치 갱신 |

작업 순서: **데이터 스키마에 영향 없는 것부터 → 컴포넌트 분기 추가 → 신규 콘텐츠(md) → 통합 검증**. 이렇게 하면 각 태스크가 독립적으로 빌드 가능한 상태를 유지한다.

---

### Task 1: Hero 섹션 갱신

**Files:**
- Modify: `src/data/introduce.ts` (전체 교체)
- Modify: `src/components/Hero.tsx:1-91`

**Interfaces:**
- Produces: `HERO_KEYWORDS: { title: string; description: string; icon: LucideIcon }[]` (3개 원소) — 이후 태스크에서 참조하지 않으므로 이 파일 내에서만 사용

- [ ] **Step 1: `introduce.ts`를 키워드 3개 구조로 교체**

```typescript
import { ChartPie, MessageSquareText, Palette } from "lucide-react";

export const HERO_KEYWORDS = [
  {
    title: "UI 피드백",
    description: "버튼 상태, 로딩, 오류, 화면 전환처럼 사용자가 머뭇거리는 순간을 줄이는 UI 피드백을 설계합니다.",
    icon: MessageSquareText,
  },
  {
    title: "성과·품질 대시보드",
    description: "GA4, Search Console, 실사용자 속도 지표를 통합해 성과와 품질을 확인하는 대시보드를 구축합니다.",
    icon: ChartPie,
  },
  {
    title: "디자인 시스템",
    description: "웹디자인/퍼블리싱 경험을 바탕으로 UI 품질, 접근성, 성능, SEO를 개발 과정에 반영합니다.",
    icon: Palette,
  },
];
```

- [ ] **Step 2: `Hero.tsx`의 카피와 STRENGTHS 렌더링을 교체**

`src/components/Hero.tsx`를 다음 내용으로 전체 교체:

```tsx
"use client";
import { nanumCoding } from "@font";
import Logo from "./shared/Logo";
import { AnimatePresence, motion } from "framer-motion";
import { HERO_KEYWORDS } from "@data/introduce";

export default function Hero() {
  return (
    <div className="wrap">
      <AnimatePresence mode="wait">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className={`code ${nanumCoding.className} `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-primaryA11y">{`<strong>`}</span>
            <wbr />
            <span className="font-bold">De</span>
            {`{`}
            <span className="text-point">sign</span>
            ||
            <span className="text-point">velop</span>
            {`}`}
            <span className="font-bold">er</span>
            <wbr />
            <span className="text-primaryA11y">{`<strong>`}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Logo className="text-6xl sm:text-8xl md:text-9xl" />
          </motion.div>
          <motion.p
            className="text-xl mt-10 mb-4 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            👋 안녕하세요
          </motion.p>
          <motion.p
            className="text-2xl leading-snug font-thin sm:text-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <span className="border-b border-gray-500">
              0.1초의 피드백을 데이터로 증명하는
            </span>
            <br />
            <strong>강혜진</strong> 개발자입니다.
          </motion.p>
          <motion.div
            className="text-lg font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <p>
              0.1초는 사용자가 화면의 반응을 즉각적이라고 느끼는 기준입니다.
              저는 버튼 상태, 로딩, 오류, 화면 전환처럼 사용자가 머뭇거리는
              순간을 줄이는 UI 피드백을 설계합니다.
            </p>
            <p>
              현재 NOVERA Shop에서 상품 탐색, 주문/클레임, SEO, 실사용자 속도
              지표, 품질 대시보드를 개선하며 사용자가 빠르다고 느끼는 경험을
              수치로 검증합니다.
            </p>
          </motion.div>

          <motion.ul
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            {HERO_KEYWORDS.map(({ title, description, icon: Icon }) => (
              <li
                key={title}
                className="flex flex-col gap-2 p-4 rounded-xl border border-gray-150"
              >
                <Icon className="w-5 h-5 text-point" />
                <strong className="text-base">{title}</strong>
                <p className="text-sm text-gray-500 font-light leading-relaxed">
                  {description}
                </p>
              </li>
            ))}
          </motion.ul>
        </motion.section>
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 3: 타입체크로 검증**

Run: `npx tsc --noEmit -p /Users/dreamfulbud/Desktop/GitHub/stronger-deer/tsconfig.json`
Expected: 에러 없음. `introduce.ts`를 참조하는 다른 파일이 없으므로(`Hero.tsx`만 참조) 이 변경으로 다른 파일이 깨지지 않는다.

- [ ] **Step 4: (커밋 보류)**

Global Constraints에 따라 커밋은 사용자 승인 후 일괄 진행. `git add src/data/introduce.ts src/components/Hero.tsx`까지만 수행하고 commit은 실행하지 않는다.

---

### Task 2: Experience — NOVERA 경력 추가 및 상단 요약 갱신

**Files:**
- Modify: `src/data/careers.ts` (전체 교체)
- Modify: `src/components/Work.tsx:28-34`

**Interfaces:**
- Consumes: 없음 (독립 태스크)
- Produces: `CAREERS[0]`이 NOVERA — 이후 태스크가 참조하지 않음

- [ ] **Step 1: `careers.ts`에 NOVERA를 최상단에 추가**

`src/data/careers.ts`의 `CAREERS` 배열 시작 부분에 새 항목을 추가하고 기존 6개 항목의 `id`를 1씩 밀어 재정렬:

```typescript
export interface I_CAREERS {
  id: number;
  period: string;
  team?: string;
  kor: string;
  company: string;
  position: string;
  info: string;
  description: string[];
  location: string;
  images?: string[];
}

export const CAREERS: I_CAREERS[] = [
  {
    id: 1,
    period: "2025.02~재직중(1년 5개월)",
    company: "NOVERA",
    kor: "노베라",
    position: "프론트엔드 개발자",
    team: "플랫폼사업실 플랫폼사업팀 | 프로(대리)",
    info: "팬덤 커뮤니티·채팅 서비스 및 아티스트 커머스 서비스를 운영하는 플랫폼",
    description: [
      "NOVERA Shop 개발/운영: Next.js 16, React 19 기반 커머스 사용자 화면 운영 및 개선",
      "운영 어드민 개발: 주문·배송·반품·클레임·이벤트 매출 등 운영 업무 전반의 관리 화면 개선",
      "분석/품질 대시보드 구축: GA4, Search Console, 어드민, 실사용자 속도 지표, Lighthouse 데이터를 통합해 성과·품질을 확인하는 내부 대시보드 구축",
      "디자인 시스템 구축: React, TypeScript, Vanilla Extract 기반 공통 컴포넌트 라이브러리와 Figma 토큰 자동화 파이프라인 구축",
      "제품 개선: 회원가입, 상품 탐색, 주문/클레임, 성능, SEO 등 커머스 핵심 흐름을 데이터와 운영 이슈를 기준으로 개선",
    ],
    location: "서울",
  },
  {
    id: 2,
    period: "2022.04 ~ 2024.07 (2년 4개월)",
    company: "Weniv",
    kor: "위니브",
    position: "프론트엔드 개발자",
    info: "ICT 교육 관련 온·오프라인 강의, 전자책, 웹 서비스, 콘퍼런스 등을 제공하는 기업",
    description: [
      "Next.js, TypeScript, Storybook 등 신규 기술 도입으로 사내 개발 환경 개선 및 코드 품질 향상 주도",
      "자사 서비스 SEO 개선 작업을 통해 구글 검색 노출 개선",
      "서비스 통합 모니터링이 가능한 맞춤형 데이터 분석 대시보드 개발",
      "코드 컨벤션, SEO 개선 매뉴얼, 프로젝트 문서 작성 가이드 등 다양한 사내 개발 문서화",
      "개발자 교육 콘텐츠 제작 및 부트캠프 강의 진행",
    ],
    location: "제주",
  },
  {
    id: 3,
    period: "2019.03 ~ 2021.08 (2년 7개월)",
    company: "TeemStone",
    kor: "팀스톤",
    team: "기획팀",
    position: "웹 디자이너&퍼블리셔 / 선임연구원(과장)",
    info: "기업용 IT 인프라 모니터링 및 성능 관리 솔루션 개발 전문기업",
    description: [
      "실시간 모니터링 솔루션 UI/UX 설계, 웹 대시보드 프로토타입 제작",
      "자사 홈페이지 리뉴얼 퍼블리싱, 제품 소개 자료·브로슈어·홍보 영상 디자인",
    ],
    location: "서울",
    images: [
      "/career/teemstone_1.jpg",
      "/career/teemstone_2.jpg",
      "/career/teemstone_3.jpg",
    ],
  },
  {
    id: 4,
    period: "2017.07 ~ 2018.12 (1년 6개월)",
    company: "Geryon",
    kor: "게리온",
    team: "브랜드기획부 디자인팀",
    position: "웹 디자이너&퍼블리셔 / 대리(팀장)",
    info: "투자 상담 및 자문 서비스 제공 기업",
    description: [
      "브랜드 홈페이지 디자인·퍼블리싱, 투자 서비스 랜딩/콘텐츠 디자인",
      "광고 소재 제작, 디자인 업무 일정·품질 관리",
    ],
    location: "서울",
    images: [
      "/career/geryon_1.jpg",
      "/career/geryon_2.jpg",
      "/career/geryon_3.jpg",
    ],
  },
  {
    id: 5,
    period: "2016.03 ~ 2017.07 (1년 5개월)",
    company: "DNUNET",
    kor: "디유넷(현: 동아미디어엔)",
    team: "DBR/HBR사업팀",
    position: "웹 디자이너&퍼블리셔 / 대리",
    info: "동아미디어그룹의 방송솔루션 및 디지털서비스 운영 전문기업",
    description: [
      "DBR/HBR 등 서비스 웹·모바일 화면 디자인 및 퍼블리싱",
      "자사 홈페이지 운영, 이메일·프로모션 페이지 제작",
    ],
    location: "서울",
    images: [
      "/career/dunet_1.jpg",
      "/career/dunet_2.jpg",
      "/career/dunet_3.jpg",
    ],
  },
  {
    id: 6,
    period: "2013.09 ~ 2015.11 (2년 3개월)",
    company: "SkoInfo",
    kor: "스코인포(부산)",
    team: "디자인팀",
    position: "웹 디자이너&퍼블리셔 / 대리",
    info: "전자정부표준프레임워크 기반의 공공데이터 솔루션 개발 및 구축 전문기업",
    description: [
      "공공기관 웹·모바일 디자인 및 퍼블리싱, 웹표준·웹접근성 인증마크 프로젝트 참여",
      "반응형 화면과 콘텐츠 구조 개선",
    ],
    location: "부산",
    images: [
      "/career/skoinfo_1.jpg",
      "/career/skoinfo_2.jpg",
      "/career/skoinfo_3.jpg",
    ],
  },
  {
    id: 7,
    period: "2009.12 ~ 2012.11(3년)",
    company: "Kidan Landscape Design Group",
    kor: "기단 조경기술사 사무소",
    team: "설계팀",
    position: "조경설계사 / 기사",
    info: "",
    description: [
      "조경 설계 및 디자인",
      "CAD 도면 설계, Photoshop 2D 이미지 작업, SketchUp 3D 렌더링",
    ],
    location: "부산",
  },
];
```

- [ ] **Step 2: `Work.tsx`의 상단 경력 요약 수치 갱신**

`src/components/Work.tsx:28-34`를 찾아 교체:

```tsx
        <p>
          프론트엔드 개발 경력: <strong>3년 9개월</strong>{" "}
          <span className="block sm:inline">
            <span className="hidden sm:inline">/</span> IT 부문 경력: 총{" "}
            <strong>10년</strong>
          </span>
        </p>
```

- [ ] **Step 3: 타입체크 및 육안 확인**

Run: `npx tsc --noEmit -p /Users/dreamfulbud/Desktop/GitHub/stronger-deer/tsconfig.json`
Expected: 에러 없음.

`Work.tsx:38`의 `career.position.includes("개발")` 조건 분기를 확인 — NOVERA position이 "프론트엔드 개발자"이므로 `Code` 아이콘이 정상적으로 선택된다(기존 로직 변경 불필요).

- [ ] **Step 4: (커밋 보류)**

`git add src/data/careers.ts src/components/Work.tsx`까지만 수행.

---

### Task 3: `ProjectThumb`에 이미지 없을 때 텍스트+수치 폴백 추가

**Files:**
- Modify: `src/components/project/ProjectThumb.tsx` (전체 교체)
- Modify: `src/data/project.ts:39-59` (인터페이스에 optional 필드 추가)

**Interfaces:**
- Consumes: `I_PROJECTS`의 `thumb: string`, `metrics: string[]`
- Produces: `ProjectThumb` props에 `metrics?: string[]` 추가 — Task 4(ProjectCard 수정)와 Task 7(신규 md 4개)이 이 변경에 의존

이 프로젝트는 카드에서 `thumb`이 빈 문자열이면 이미지를 건너뛰는 기존 조건(`{thumb && <Image .../>}`)을 그대로 활용하고, 빈 경우 대체 UI를 additive로 넣는다. `I_PROJECTS`에는 새 필드를 추가하지 않는다 — `metrics`는 이미 존재하는 필드이므로 `ProjectThumb`에 prop으로 전달만 하면 된다.

- [ ] **Step 1: `ProjectThumb.tsx`에 폴백 분기 추가**

```tsx
import Image from "next/image";
import TypeIcon from "./TypeIcon";

export default function ProjectThumb({
  type,
  thumb,
  title,
  metrics,
}: {
  type: "개인" | "업무";
  thumb: string;
  title?: string;
  metrics?: string[];
}) {
  return (
    <div className="thumb">
      <TypeIcon type={type} />
      {thumb ? (
        <Image src={`/strongerDeer${thumb}`} alt="" width={480} height={360} />
      ) : (
        <div className="thumb-fallback">
          {title && <strong>{title}</strong>}
          {metrics && metrics[0] && <p>{metrics[0]}</p>}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: `ProjectCard.tsx`에서 `title`, `metrics`를 `ProjectThumb`에 전달**

`src/components/project/ProjectCard.tsx:44-46`을 찾아 교체:

```tsx
      <Link href={`/${id}`}>
        <ProjectThumb type={type} thumb={thumb} title={title} metrics={metrics} />
      </Link>
```

- [ ] **Step 3: `.thumb-fallback` 스타일 추가 확인**

이 프로젝트는 Tailwind + 전역 scss(`globals.scss` 등)를 혼용하고 있을 가능성이 높으므로, 전역 스타일 파일 위치를 먼저 확인한다.

Run: `find /Users/dreamfulbud/Desktop/GitHub/stronger-deer/src -iname "*.scss" -o -iname "globals.css"`

찾은 파일에서 `.thumb` 클래스 정의를 찾아(`grep -n "\.thumb" <파일>`) 바로 아래에 다음 스타일을 추가:

```scss
.thumb-fallback {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  height: 100%;
  padding: 1.5rem;
  text-align: center;

  strong {
    font-size: 1.125rem;
  }

  p {
    font-size: 0.875rem;
    color: theme("colors.gray.500");
  }
}
```

(정확한 스타일 파일 경로와 기존 `.thumb` 정의 방식은 Step 3 실행 시 grep 결과를 보고 해당 파일의 기존 SCSS 문법·중첩 규칙을 그대로 따라 작성한다 — 이 프로젝트는 Tailwind의 `theme()` 함수를 scss 안에서 쓰는지 여부도 기존 `.thumb` 근처 코드를 참고해서 맞춘다.)

- [ ] **Step 4: 타입체크로 검증**

Run: `npx tsc --noEmit -p /Users/dreamfulbud/Desktop/GitHub/stronger-deer/tsconfig.json`
Expected: 에러 없음.

- [ ] **Step 5: (커밋 보류)**

`git add src/components/project/ProjectThumb.tsx src/components/project/ProjectCard.tsx` 및 수정한 스타일 파일까지만 수행.

---

### Task 4: NOVERA 신규 프로젝트 4개 — frontmatter만 우선 추가 (내용 없이 build 통과 확인용)

**Files:**
- Create: `projects/novera-shop.md`
- Create: `projects/novera-event-dashboard.md`
- Create: `projects/novera-quality-dashboard.md`
- Create: `projects/nds.md`

**Interfaces:**
- Consumes: `I_PROJECTS` 인터페이스 (`src/data/project.ts:39-59`) — 필드 변경 없이 그대로 채운다
- Produces: `getAllProjects()`가 이 4개를 포함해 총 13개 프로젝트를 반환 — Task 6(Projects.tsx 그룹 분리)이 이 `index` 값에 의존

각 md는 frontmatter + 본문을 한 번에 작성한다(본문을 나중에 채우는 2단계 방식은 "No Placeholders" 원칙에 위배되므로 이 태스크에서 완성된 내용까지 작성한다).

`index` 값 정책: Featured 5개는 index 1~5(Page0127=1, NOVERA Shop=2, 이벤트 대시보드=3, 품질 대시보드=4, NDS=5), 기존 프로젝트는 index 6부터 재배치(Task 5에서 처리).

- [ ] **Step 1: `projects/novera-shop.md` 작성**

```markdown
---
index: 2
id: "novera-shop"
type: "업무"
title: "NOVERA Shop"
kor: "사용자/운영자 화면 개선"
thumb: ""
period: "2025.02~재직중"
description: "전담 기획자 없이 상품 탐색부터 주문·클레임까지 정보 구조와 상태 표현을 설계한 커머스 화면 개선"
tags: ["TypeScript", "React", "Next.js", "Design"]
skills: ["Next.js 16", "React 19", "TypeScript", "TanStack Query", "next-intl", "Tailwind CSS", "AWS Amplify"]
icon: "Building"
metrics:
  [
    "SNS 간편가입 도입 후 7일간 신규 가입자의 79.4%가 선택",
    "메인 페이지 이미지 전송량 6.6MB → 381KB, 94% 경량화",
    "운영 사이트 실사용자 속도 지표 통과: LCP 1.44초·INP 88ms·CLS 0",
  ]
url: ""
role: "TF(백엔드1·프론트엔드1·디자인1·사업2) 내 프론트엔드 단독 담당"
---

# 문제

전담 기획자가 없는 신규 커머스에서 상품 탐색, 주문, 취소, 반품, 운영 어드민까지 정보 구조와 상태 표현을 정리해야 했습니다. 구매자에게는 진행 상태와 안내가 불명확했고, 운영자에게는 반복 확인과 수동 처리 비용이 컸습니다.

# 역할

백엔드 1명, 프론트엔드 1명(담당), 디자인 1명, 사업 2명으로 구성된 신규 커머스 런칭 TF에서 프론트엔드를 단독으로 담당했습니다. 정책 정리, 화면 기획, UI 설계, 프론트엔드 개발, 운영 검증까지 수행했고, 디자이너와는 화면 시안을, 백엔드와는 결제·주문·취소·반품 API 연동 기준을 상시 협의했습니다.

# 해결

- 상품 카드, 상품 목록, 상품 상세, 주문내역, 주문상세 등 커머스 핵심 화면 개선
- 주문·배송·반품·클레임·이벤트 매출 등 운영 어드민 화면 개선, 다중 상품 일괄처리와 외부 배송조회 연동 구현
- 상품별 안내문구 영역을 신설해 해외결제·예약 판매·배송 안내를 사전에 노출
- DANAL SQUARE, SPHERE 등 캠페인/이벤트 페이지를 개발하고 댓글·투표·공유·상품 연결 등 참여형 인터랙션 구현
- 백엔드 응답 형식을 정규화해 데이터 연동 오류 가능성 감소

# 결과

- 구글·카카오 간편가입 도입 후 7일간 신규 가입자의 **79.4%가 SNS 간편가입을 선택**(어드민 가입 통계 기준)
- 메인 페이지 이미지 전송량 약 6.6MB → 381KB, **94% 경량화**
- Pretendard 3종 전체 로드(약 2.15MB)에서 페이지별 필요 글자 조각만 로드하는 방식으로 전환
- 운영 사이트 실사용자 속도 지표 통과: **LCP 1.44초 · INP 88ms · CLS 0**

# 설계 판단 기준 — 데이터가 없는 초기 단계에서

서비스가 오픈한 지 2~3개월이라 A/B 테스트나 사용자 행동 데이터로 UX 개선을 증명하기는 아직 어렵습니다. 대신 이 시점에는 아래 기준으로 상태·안내·오류 화면을 설계했습니다.

- **상품별 안내문구 영역 신설**: 해외결제, 예약 판매처럼 일반 주문과 조건이 다른 상품은 구매 전 안내가 없으면 결제 후 CS로 이어질 가능성이 높다고 판단해, 상품 상세 화면에 조건을 사전 노출하는 영역을 구조적으로 분리했습니다. 사용자 데이터로 검증하기 전이지만, CS 발생 지점을 사후 대응이 아니라 사전 안내로 옮기는 것을 원칙으로 삼았습니다.
- **운영 어드민 다중 상품 일괄처리**: 운영자가 이벤트 매출·클레임을 건별로 처리하던 반복 작업을 관찰하고, 목록에서 여러 건을 선택해 한 번에 처리할 수 있는 흐름을 우선 구현했습니다. 사용자 만족도 데이터는 없지만, 반복 작업 횟수 자체가 명확한 비효율 신호였기 때문입니다.
- **응답 형식 정규화**: 여러 API의 응답 형식이 제각각이면 화면마다 로딩·오류 처리가 다르게 구현되어 사용자 경험이 흔들립니다. 데이터가 쌓이기 전 단계이므로, 일단 상태 표현(로딩/빈 값/오류)을 화면 간에 일관되게 만드는 것을 성능 지표보다 먼저 우선했습니다.

데이터가 쌓이면 이 판단들을 실제 지표로 다시 검증할 계획입니다.

# 공개 가능한 근거 방식

실제 화면 캡처 대신 구현 범위와 성과 수치 중심으로 정리했습니다. 주문, 클레임, 어드민, 매출, 고객 정보가 포함된 화면은 포트폴리오에서 제외했습니다.
```

- [ ] **Step 2: `projects/novera-event-dashboard.md` 작성**

```markdown
---
index: 3
id: "novera-event-dashboard"
type: "업무"
title: "이벤트 성과 분석 대시보드"
kor: "SPHERE 이벤트 분석 및 내부 운영 지표"
thumb: ""
period: "2025"
description: "회차별 KPI와 상대기간 비교가 가능한 이벤트 분석 체계를 0에서 설계하고 자발적으로 구축"
tags: ["TypeScript", "React", "Next.js"]
skills: ["Next.js 16", "React 19", "TypeScript", "GA4 Data API", "Google Search Console", "Recharts", "AWS Amplify"]
icon: "ChartSpline"
metrics:
  [
    "사내 최초 이벤트 성과 분석 체계 구축",
    "SPHERE 1회차 일평균 DAU 목표 대비 122% 달성 추적",
    "이벤트 성과와 Shop 품질 지표를 통합한 대시보드 구축·배포",
  ]
url: ""
role: "자발적 제안 및 단독 구축"
---

# 문제

신규 오픈한 NOVERA Shop에서 이벤트 페이지 성과를 판단할 KPI, 오픈 시점이 다른 회차 간 비교 기준, 오프라인 유입 추적 수단이 없었습니다.

# 역할

측정 필요성을 먼저 제안하고, KPI 정의, 데이터 연결, 대시보드 화면 구성, 배포까지 단독으로 담당했습니다. 사업팀과 KPI 기준을 합의하고, 백엔드와 GA4·어드민 데이터 연동을 협의했습니다.

# 해결

- 도달(PV), 순방문, DAU, 회원가입을 KPI로 정의하고 이벤트 성과 분석 체계를 0에서 설계
- 오픈 시점이 다른 회차를 오픈 후 7/14/30일 기준 상대기간으로 정규화해 공정한 비교 뷰 구현
- QR 기반 오프라인 유입 추적, GA4·Search Console·Admin 데이터를 통합하고 식별률·커버리지를 노출해 데이터 신뢰도 표시
- 반복 조회 시 외부 API 호출이 과도해지지 않도록 캐싱 구조 적용
- KST 기준 날짜 집계, MAU 과대집계, 변화율 오류 등 실데이터 정합성 이슈를 반복 검증

# 결과

- 사내 최초의 데이터 측정·분석 체계를 구축해 이벤트 성과를 회차 단위로 비교할 수 있는 기반 마련
- SPHERE 1회차 기준 일평균 DAU **목표 대비 122% 달성**을 실시간 추적
- 이벤트 성과와 Shop 품질 지표를 통합한 대시보드를 구축·배포해 내부 의사결정 도구로 사용

# 공개 가능한 근거 방식

원본 대시보드 캡처 대신, KPI 정의와 비교 기준을 설명하는 구조로 정리했습니다. 회사 내부 수치와 비공개 이벤트 정보는 범주화해 표현했습니다.
```

- [ ] **Step 3: `projects/novera-quality-dashboard.md` 작성**

```markdown
---
index: 4
id: "novera-quality-dashboard"
type: "업무"
title: "품질·성능 모니터링 대시보드"
kor: "성능·SEO·번들·코드 건강도 관측 시스템"
thumb: ""
period: "2025"
description: "운영 커머스의 성능, 접근성, SEO, 코드 부채 악화 지점을 사전에 탐지하는 측정 체계 구축"
tags: ["TypeScript", "React"]
skills: ["Lighthouse", "Vitest", "Recharts", "Core Web Vitals"]
icon: "ChartSpline"
metrics:
  [
    "운영 사이트 실사용자 속도 지표 통과: LCP 1.44초·INP 88ms·CLS 0",
    "Lighthouse 기준 접근성 96, SEO 100 확인",
    "주간 자동 측정과 분석 코멘트 발행 흐름 구축",
  ]
url: ""
role: "측정 항목 정의부터 대시보드 구축까지 단독 수행"
---

# 문제

운영 중인 커머스의 성능, 접근성, SEO, 코드 부채 악화 지점을 사후에야 발견하는 구조였습니다. 테스트 환경 점수와 실제 사용자 경험 지표를 구분하는 기준도 없었습니다.

# 역할

측정 항목 정의, 실사용자 속도 지표·화면 품질·파일 용량·코드 오류 데이터 수집 흐름 설계, 주간 분석 코멘트 기준 마련까지 담당했습니다.

# 해결

- 실제 사용자 기준 속도 지표와 테스트 환경 점수를 분리해 측정
- 페이지별 Lighthouse, Core Web Vitals, 번들 크기, 이미지 전송량, 타입/린트 오류, 기술 부채를 주기적으로 측정하는 대시보드 구축
- 동일 배포본을 재측정해 실제 코드 회귀와 측정 노이즈를 구분하는 로직 설계
- 검색엔진 노출에 필요한 기본 설정을 자동 점검하고 주간 개선 우선순위 도출
- 주간 자동 측정과 분석 코멘트 발행 흐름 구축

# 결과

- 운영 사이트의 실사용자 속도 지표 통과: **LCP 1.44초 · INP 88ms · CLS 0**(CrUX 28일 실측)
- Lighthouse 기준 **접근성 96, SEO 100** 확인
- AWS Amplify 배포 환경에서 발생한 설정 누락과 배포 오류를 원인 분석 후 해결

# 공개 가능한 근거 방식

실제 대시보드 캡처 대신 수치와 측정 기준 중심으로 정리했습니다. 내부 URL, 배포 환경, 운영 상세는 제외했습니다.
```

- [ ] **Step 4: `projects/nds.md` 작성**

```markdown
---
index: 5
id: "nds"
type: "업무"
title: "NDS"
kor: "디자인 시스템 구축·npm 패키지 배포"
thumb: ""
period: "2025"
description: "여러 프로덕트에서 재사용 가능한 공통 컴포넌트와 Figma-코드 디자인 토큰 자동화 파이프라인 구축"
tags: ["TypeScript", "React", "Design"]
skills: ["React", "TypeScript", "Vanilla Extract", "Style Dictionary", "Storybook", "Chromatic", "tsup"]
icon: "Cpu"
metrics:
  [
    "Button, Input, Modal, Table 등 공통 컴포넌트 30종 구축",
    "Figma 토큰 → Style Dictionary → 코드 자동 변환 파이프라인 구축",
    "사내 npm 레지스트리 패키지 배포로 여러 프로덕트에서 재사용",
  ]
url: ""
role: "디자이너와 토큰 정의·컴포넌트 스펙 합의, 컴포넌트 라이브러리 구축 담당"
---

# 문제

shop client/admin 등 여러 프로덕트에서 버튼, 입력창, 모달, 테이블 등 기본 UI를 개별 구현하고 있었습니다. 스타일·접근성·동작이 프로덕트마다 달라지고, Figma와 코드 사이의 디자인 토큰을 수기로 동기화하던 상황이었습니다.

# 역할

React, TypeScript, Vanilla Extract 기반 컴포넌트 라이브러리를 구축했습니다. Figma 토큰 → 코드 토큰 변환 흐름, Storybook 문서화, 품질 체크리스트 정리를 담당했고, 디자이너와 토큰 정의·컴포넌트 스펙을 합의했습니다.

# 해결

- Button, Input, Modal, Table, Select, Accordion, Carousel, Pagination 등 컴포넌트 30종 설계 및 구현
- Figma 토큰을 코드에서 사용할 수 있는 형태로 변환하는 파이프라인 구축 및 배포
- 색상, 간격, radius, elevation, z-index, motion 토큰화 및 멀티브랜드 테마 시스템 구성
- Storybook 문서화, Chromatic 시각 회귀 테스트, Vitest, 접근성 점검, tsup 기반 번들링, Husky pre-commit 품질 게이트 구성
- 컴포넌트 개발 가이드, 토큰 가이드, 체크리스트, 테마 구조 문서화

# 결과

- 사내 npm 레지스트리로 패키지를 배포해 shop client/admin 등 여러 프로덕트에서 재사용 가능한 UI 기반 마련
- 터치 타깃 크기, 아이콘 전용 버튼의 접근성 이름, 다중 모달 포커스 등 접근성 기준을 컴포넌트 단위에서 보강
- 디자인–코드 동기화를 자동화해 반복 수작업과 불일치 가능성 감소

# 공개 가능한 근거 방식

Storybook이 외부 접근 불가하므로 캡처 없이 컴포넌트 범위와 품질 기준 중심으로 설명했습니다. 회사 테마, 패키지명, 레지스트리 주소, 비공개 저장소 URL은 제외했습니다.
```

- [ ] **Step 5: 새 icon 값이 `ICON_MAP`에 존재하는지 확인**

`src/data/project.ts:12-22`의 `ICON_MAP`에 `Building`, `ChartSpline`, `Cpu`가 이미 포함되어 있는지 확인.

Run: `grep -n "Building\|ChartSpline\|Cpu" /Users/dreamfulbud/Desktop/GitHub/stronger-deer/src/data/project.ts`
Expected: 3개 모두 `ICON_MAP` 객체 안에 이미 존재(기존 프로젝트에서 이미 사용 중인 아이콘이므로 추가 작업 불필요).

- [ ] **Step 6: build로 정적 생성 검증**

Run: `cd /Users/dreamfulbud/Desktop/GitHub/stronger-deer && npm run build`
Expected: 에러 없이 빌드 성공. 이 시점에서 `getAllProjects()`가 13개 md(기존 9개 + 신규 4개)를 모두 읽어 성공적으로 파싱하는지 확인된다.

- [ ] **Step 7: (커밋 보류)**

`git add projects/novera-shop.md projects/novera-event-dashboard.md projects/novera-quality-dashboard.md projects/nds.md`까지만 수행.

---

### Task 5: 기존 프로젝트 9개 — index 재배치 및 카드 문구 정리

**Files:**
- Modify: `projects/page0127.md` (frontmatter만 — 본문은 Task 8에서 별도 처리)
- Modify: `projects/weniv-analytics.md`
- Modify: `projects/wenivooks.md`
- Modify: `projects/jeju-ai.md`
- Modify: `projects/weniv-link.md`
- Modify: `projects/weniv-bootcamp.md`
- Modify: `projects/jeju-algorithm.md`
- Modify: `projects/teemstone.md`

**Interfaces:**
- Consumes: Task 4에서 확정된 index 1~5 (Featured)
- Produces: index 6~13 (Other) — Task 6(Projects.tsx)이 "index >= 6이면 Other"라는 경계값으로 사용

Featured 5(index 1~5) 다음으로 Other 8개를 다음 순서로 배치한다: WeniVooks(6) → Weniv Bootcamp(7) → Jeju AI Conf(8) → Weniv Analytics(9) → Weniv Link(10) → Jeju Algorithm(11) → TeemStone(12). 이 순서는 "현재 포지션과의 관련도"(SEO/성과 수치가 있는 프로젝트 우선) 기준이다.

- [ ] **Step 1: `page0127.md`의 frontmatter만 `index: 1`로 변경**

`projects/page0127.md:2` (`index: 1`)는 이미 1이므로 변경 불필요 — 확인만 한다.

Run: `head -5 /Users/dreamfulbud/Desktop/GitHub/stronger-deer/projects/page0127.md`
Expected: `index: 1` 확인.

- [ ] **Step 2: `wenivooks.md`의 index를 6으로 변경**

`projects/wenivooks.md:2`의 `index: 3`을 `index: 6`으로 교체.

- [ ] **Step 3: `weniv-bootcamp.md`의 index를 7로 변경**

`projects/weniv-bootcamp.md:2`의 `index: 6`을 `index: 7`로 교체.

- [ ] **Step 4: `jeju-ai.md`의 index를 8로 변경**

`projects/jeju-ai.md:2`의 `index: 4`를 `index: 8`로 교체.

- [ ] **Step 5: `weniv-analytics.md`의 index를 9로 변경, metrics를 1개로 축소**

`projects/weniv-analytics.md:2`의 `index: 2`를 `index: 9`로 교체.

같은 파일의 `metrics` 배열(기존 3개)을 카드에서 짧게 보이도록 1개로 축소:

```yaml
metrics:
  [
"사내 서비스 데이터를 시각화해 서비스 가치 평가와 마케팅 활용 의사결정 기준 제시"
]
```

- [ ] **Step 6: `weniv-link.md`의 index를 10으로 변경, metrics를 1개로 축소**

`projects/weniv-link.md:2`의 `index: 5`를 `index: 10`으로 교체.

`metrics` 배열(기존 3개)을 1개로 축소:

```yaml
metrics:
  [
    "QR 코드 생성 및 다운로드 기능 구현, 캐릭터 기반 인터랙션 UI 디자인",
  ]
```

- [ ] **Step 7: `jeju-algorithm.md`의 index를 11로 변경**

`projects/jeju-algorithm.md:2`의 `index: 7`을 `index: 11`로 교체. (metrics는 이미 1개이므로 그대로 유지)

- [ ] **Step 8: `teemstone.md`의 index를 12로 변경**

`projects/teemstone.md:2`의 `index: 8`을 `index: 12`로 교체. (metrics는 이미 2개, 그대로 유지)

- [ ] **Step 9: index 중복이 없는지 확인**

기존 md는 정확히 8개(`jeju-ai, jeju-algorithm, page0127, teemstone, weniv-analytics, weniv-bootcamp, weniv-link, wenivooks`)이고, Task 4에서 4개(`novera-shop, novera-event-dashboard, novera-quality-dashboard, nds`)가 추가되어 총 12개다. index는 1(page0127) ~ 12(teemstone)로 정확히 1:1 매핑된다.

Run: `grep -h "^index:" /Users/dreamfulbud/Desktop/GitHub/stronger-deer/projects/*.md | sort | uniq -c`
Expected: index 1~12가 각각 정확히 1번씩만 출현.

- [ ] **Step 10: md 파일 총 개수 확인**

Run: `ls /Users/dreamfulbud/Desktop/GitHub/stronger-deer/projects/*.md | wc -l`
Expected: `12`

- [ ] **Step 11: build로 검증**

Run: `cd /Users/dreamfulbud/Desktop/GitHub/stronger-deer && npm run build`
Expected: 에러 없이 빌드 성공, `getAllProjects()`가 12개를 index 순으로 정렬해 반환.

- [ ] **Step 12: (커밋 보류)**

`git add projects/*.md`까지만 수행.

---

### Task 6: `Projects.tsx` — Featured/Other 그룹 분리 렌더링

**Files:**
- Modify: `src/components/Projects.tsx` (전체 교체)

**Interfaces:**
- Consumes: `projects: I_PROJECTS[]` (이미 `page.tsx`에서 `getAllProjects()`로 전달됨, index 오름차순 정렬 상태), Task 5에서 확정된 index 1~5(Featured)/6~12(Other) 경계
- Produces: 없음 (최상위 렌더링 컴포넌트)

- [ ] **Step 1: `Projects.tsx`를 Featured/Other 분리 렌더링으로 교체**

```tsx
"use client";
import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { I_PROJECTS } from "@data/project";
import ProjectCard from "./project/ProjectCard";
interface ProjectProps {
  projects: I_PROJECTS[];
}

const FEATURED_COUNT = 5;

export default function Projects({ projects }: ProjectProps) {
  const featured = projects.filter((p) => p.index <= FEATURED_COUNT);
  const other = projects.filter((p) => p.index > FEATURED_COUNT);

  return (
    <>
      <div className="wrap" id="projects">
        <section>
          <h2 className="title">
            Projects <span>프로젝트</span>
          </h2>

          <AnimatePresence mode="wait">
            <motion.ul
              className="card md:grid-cols-2 xl:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {featured.map((project, index) => (
                <ProjectCard
                  key={`${project.title}-${index}`}
                  index={index}
                  project={project}
                />
              ))}
            </motion.ul>
          </AnimatePresence>

          {other.length > 0 && (
            <>
              <h3 className="title mt-16">
                Other Projects <span>보조 프로젝트</span>
              </h3>

              <AnimatePresence mode="wait">
                <motion.ul
                  className="card md:grid-cols-2 xl:grid-cols-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {other.map((project, index) => (
                    <ProjectCard
                      key={`${project.title}-${index}`}
                      index={index}
                      project={project}
                    />
                  ))}
                </motion.ul>
              </AnimatePresence>
            </>
          )}
        </section>
      </div>
    </>
  );
}
```

- [ ] **Step 2: `.title` 클래스가 `h3`에도 적용 가능한지 확인**

Run: `grep -rn "\.title" /Users/dreamfulbud/Desktop/GitHub/stronger-deer/src --include="*.scss" --include="*.css"`

찾은 스타일 정의가 `h2` 태그 셀렉터에 종속되어 있다면(`h2.title` 형태) `h3.title`에는 적용되지 않으므로, 이 경우 Step 1의 `<h3 className="title mt-16">`를 `<h2 className="title mt-16">`로 바꾼다(시맨틱상 섹션 내 하위 제목이 h2인 것이 다소 어색하지만, 기존 CSS 셀렉터 변경보다 안전한 선택 — 이 프로젝트의 다른 섹션들도 전부 `<h2 className="title">` 하나만 쓰는 구조이므로 일관성 유지). 클래스 셀렉터가 태그 무관(`.title`)이면 Step 1 그대로 둔다.

- [ ] **Step 3: 타입체크 및 빌드로 검증**

Run: `npx tsc --noEmit -p /Users/dreamfulbud/Desktop/GitHub/stronger-deer/tsconfig.json && cd /Users/dreamfulbud/Desktop/GitHub/stronger-deer && npm run build`
Expected: 에러 없이 통과.

- [ ] **Step 4: dev 서버로 육안 확인**

Run: `cd /Users/dreamfulbud/Desktop/GitHub/stronger-deer && npm run dev`

브라우저에서 `http://localhost:3000`을 열어 Projects 섹션에 Featured 5장(Page0127, NOVERA Shop, 이벤트 대시보드, 품질 대시보드, NDS)과 그 아래 "Other Projects" 소제목 + 7장이 렌더링되는지 확인. NOVERA 4개 카드가 이미지 없이 Task 3의 폴백 UI(제목 + metrics[0])로 보이는지 확인.

- [ ] **Step 5: (커밋 보류)**

`git add src/components/Projects.tsx`까지만 수행 (Step 2에서 스타일 파일도 수정했다면 함께 add).

---

### Task 7: Skills 섹션 — 강점 중심 재그룹핑

**Files:**
- Modify: `src/data/skill.ts` (전체 교체)
- Modify: `src/components/Skills.tsx:13-199` (`TabContents` 객체 전체 교체)

**Interfaces:**
- Consumes: 없음 (독립 태스크)
- Produces: `TABS`의 `name` 값 5개(`UI/UX 구현`, `데이터 시각화·성과 측정`, `성능/SEO/품질`, `디자인 시스템`, `협업/문서화`) — `Skills.tsx`의 `TabContents` 키와 정확히 일치해야 함(문자열 키 매칭이므로 오타 시 런타임에 빈 화면)

- [ ] **Step 1: `skill.ts`의 `TABS`를 5개 강점 축으로 교체**

`src/data/skill.ts`에서 `TABS` 배열과 `skillData`만 교체(`ICON_MAP`처럼 다른 파일과 무관한 부분인 `PROGRAMS`는 그대로 유지):

```typescript
import { IconType } from "react-icons";
import {
  FaFigma,
  FaMarkdown,
  FaNpm,
  FaPalette,
  FaUsers,
} from "react-icons/fa";
import { RiSpeedUpLine } from "react-icons/ri";
import { BarChart3, LayoutPanelTop } from "lucide-react";

interface I_SubItem {
  id: string;
  name: string;
  icon: IconType;
  color: string;
  size?: number;
}

export interface I_Tab {
  id: number;
  name: string;
  subItems?: I_SubItem[];
  icon: IconType;
  color: string;
  size?: number;
}

// 프로그램 아이템 인터페이스
interface I_Program {
  id: number;
  name: string;
  image: string;
  description: string;
}

export const TABS: I_Tab[] = [
  {
    id: 1,
    name: "README.md",
    icon: FaMarkdown,
    color: "#765838",
  },
  {
    id: 2,
    name: "UI/UX 구현",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: LayoutPanelTop as any,
    color: "#3178C6",
  },
  {
    id: 3,
    name: "데이터 시각화·성과 측정",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: BarChart3 as any,
    color: "#61DAFB",
  },
  {
    id: 4,
    name: "성능/SEO/품질",
    icon: RiSpeedUpLine,
    color: "#06B6D4",
  },
  {
    id: 5,
    name: "디자인 시스템",
    icon: FaPalette,
    color: "#CC6699",
  },
  {
    id: 6,
    name: "협업/문서화",
    icon: FaUsers,
    color: "#ddb67a",
  },
  {
    id: 7,
    name: "package.json",
    icon: FaNpm,
    color: "#CB3837",
    size: 20,
  },
];

export const PROGRAMS: I_Program[] = [
  {
    id: 1,
    name: "VS Code",
    image: "/program/vsc.jpg",
    description:
      "확장프로그램, 코드 스니펫, 다양한 설정들을 활용하여 개발합니다.",
  },
  {
    id: 2,
    name: "Chrome",
    image: "/program/chrome.jpg",
    description:
      "크롬, 사파리, 오페라, 파이어폭스 등 다양한 브라우저 웹 표준 작업 가능합니다.",
  },
  {
    id: 3,
    name: "Notion",
    image: "/program/notion.png",
    description:
      "문서작업은 노션을 주로 사용합니다. PPT, Word, Excel 등 다양한 문서 작업이 가능합니다.",
  },
  {
    id: 4,
    name: "Figma",
    image: "/program/figma.jpg",
    description: "프로토타입, 베리언트 기능 등 다양한 작업에 능숙합니다.",
  },
  {
    id: 5,
    name: "Photoshop",
    image: "/program/ps.jpg",
    description: "다양한 이미지 작업이 가능합니다.",
  },
  {
    id: 6,
    name: "Illustrator",
    image: "/program/ai.jpg",
    description: "다양한 벡터 이미지 작업이 가능합니다.",
  },
];

export const skillData = {
  설명: "필요에 따라 적절한 기술을 사용합니다. 아래 기술들을 사용한 경험이 있습니다.",
  "주요 활용 기술": {
    프론트엔드: ["React 19", "TypeScript(strict)", "Next.js 16(App Router)", "Tailwind CSS", "Recharts"],
    "상태 관리/데이터": ["TanStack Query v5", "react-hook-form", "yup", "GA4 Data API", "Google Search Console"],
    디자인시스템: ["Vanilla Extract", "Style Dictionary", "Storybook", "Chromatic", "tsup", "npm package"],
    "품질/테스트": ["Lighthouse", "Vitest", "Core Web Vitals", "bundle analysis", "ESLint flat config"],
    "인프라/배포": ["AWS Amplify", "Vercel", "Firebase"],
    "i18n/SEO": ["next-intl", "canonical", "hreflang", "JSON-LD", "sitemap/robots", "metadata generation"],
    도구: ["Figma", "Notion", "Jira", "GitHub", "Claude Code/Codex 기반 AI 보조 개발"],
  },
};
```

주의: `LayoutPanelTop`, `BarChart3`는 `lucide-react`(IconType이 아닌 `LucideIcon` 타입) 아이콘이라 `IconType`을 요구하는 `I_Tab.icon`과 타입이 맞지 않는다. 이 계획에서는 `as any`로 우회했지만, CLAUDE.md 컨벤션(`any` 금지)에 위배되므로 **Step 2에서 react-icons 계열 아이콘으로 교체**해 `as any`를 제거한다.

- [ ] **Step 2: `as any` 제거 — react-icons 계열 아이콘으로 교체**

Step 1의 `TABS` 배열에서 아래 2개 항목을 교체:

```typescript
  {
    id: 2,
    name: "UI/UX 구현",
    icon: FaPalette, // 임시로 동일 아이콘 사용하지 않도록 아래에서 재분배
    color: "#3178C6",
  },
```

정확히는, import를 다음과 같이 정리하고:

```typescript
import { IconType } from "react-icons";
import {
  FaChartBar,
  FaFigma,
  FaHandshake,
  FaMarkdown,
  FaNpm,
  FaPalette,
  FaTachometerAlt,
} from "react-icons/fa";
```

`TABS` 배열의 icon 필드를 모두 `react-icons/fa` 계열로 교체:

```typescript
export const TABS: I_Tab[] = [
  {
    id: 1,
    name: "README.md",
    icon: FaMarkdown,
    color: "#765838",
  },
  {
    id: 2,
    name: "UI/UX 구현",
    icon: FaFigma,
    color: "#3178C6",
  },
  {
    id: 3,
    name: "데이터 시각화·성과 측정",
    icon: FaChartBar,
    color: "#61DAFB",
  },
  {
    id: 4,
    name: "성능/SEO/품질",
    icon: FaTachometerAlt,
    color: "#06B6D4",
  },
  {
    id: 5,
    name: "디자인 시스템",
    icon: FaPalette,
    color: "#CC6699",
  },
  {
    id: 6,
    name: "협업/문서화",
    icon: FaHandshake,
    color: "#ddb67a",
  },
  {
    id: 7,
    name: "package.json",
    icon: FaNpm,
    color: "#CB3837",
    size: 20,
  },
];
```

(Step 1에서 언급한 `LayoutPanelTop`/`BarChart3`/`FaUsers` import는 사용하지 않으므로 최종 파일에는 포함하지 않는다 — 이 Step 2가 Step 1을 대체하는 최종본이다.)

- [ ] **Step 3: `Skills.tsx`의 `TabContents`를 5개 강점 축 내용으로 교체**

`src/components/Skills.tsx:13-199`(`TabContents` 객체 선언부)를 다음으로 교체:

```tsx
export const TabContents = {
  "README.md": () => (
    <>
      <ul className="list">
        <li>
          <strong>8년 이상의 웹디자인/퍼블리싱 경험</strong>을 바탕으로 UI
          품질, 접근성, 반응형 레이아웃, 디자인 토큰을 개발 품질로
          연결합니다.
        </li>
        <li>
          운영 데이터를 수집·정규화·시각화해 제품 개선 의사결정에 사용할 수
          있는 대시보드로 만듭니다.
        </li>
        <li>
          성능, SEO, 접근성, 번들 크기, 이미지 전송량을 지속 측정하고 회귀를
          탐지하는 자동화 흐름을 설계합니다.
        </li>
        <li>
          AI 도구를 품질 측정 결과 해석, API 스펙 기반 타입·문서 동기화,
          주간 개선 보고 초안 작성 등 반복 검토·정리 업무의 보조 수단으로
          활용하고, 최종 판단과 검증은 직접 수행합니다.
        </li>
      </ul>
    </>
  ),
  "UI/UX 구현": () => (
    <>
      <h3>UI/UX 구현</h3>
      <div className="hash_tag">
        <span>웹 접근성</span>
        <span>반응형</span>
        <span>상태/피드백 설계</span>
        <span>디자인 출신</span>
      </div>
      <ul className="list">
        <li>
          버튼 상태, 로딩, 오류, 빈 화면처럼 사용자가 머뭇거리는 순간을
          줄이는 UI 피드백을 설계합니다.
        </li>
        <li>
          웹디자인/퍼블리셔로 일한 경험을 바탕으로 시맨틱 마크업, 웹
          접근성, 반응형 레이아웃을 개발 단계에서부터 고려합니다.
        </li>
        <li>
          디자이너와 화면 시안을 함께 검토하고, 디자인 토큰과 컴포넌트
          스펙을 코드로 정확히 옮기는 것을 중요하게 여깁니다.
        </li>
      </ul>
    </>
  ),
  "데이터 시각화·성과 측정": () => (
    <>
      <h3>데이터 시각화·성과 측정</h3>
      <div className="hash_tag">
        <span>GA4</span>
        <span>Search Console</span>
        <span>Recharts</span>
        <span>KPI 설계</span>
      </div>
      <ul className="list">
        <li>
          GA4, Search Console, 어드민, 실사용자 속도 지표 등 흩어진 데이터를
          통합해 성과와 품질을 확인하는 대시보드를 구축합니다.
        </li>
        <li>
          Recharts로 이벤트 성과, 품질 지표, 회귀 여부를 시각화하고, 회차별
          비교가 가능하도록 기준을 정규화합니다.
        </li>
        <li>
          KST 기준 날짜 집계, 중복 집계, 변화율 오류 등 실데이터 정합성
          문제를 직접 검증합니다.
        </li>
      </ul>
    </>
  ),
  "성능/SEO/품질": () => (
    <>
      <h3>성능/SEO/품질</h3>
      <div className="hash_tag">
        <span>Lighthouse</span>
        <span>Core Web Vitals</span>
        <span>번들 분석</span>
        <span>SEO</span>
      </div>
      <ul className="list">
        <li>
          페이지별 Lighthouse, Core Web Vitals, 번들 크기, 이미지 전송량을
          주기적으로 측정하고 회귀를 탐지하는 흐름을 설계합니다.
        </li>
        <li>
          동적/정적 메타데이터, canonical, JSON-LD, sitemap/robots 등 SEO
          인프라를 직접 구축한 경험이 있습니다.
        </li>
        <li>
          이미지 경량화, 웹폰트 로딩 구조 개선 등 실측 가능한 성능
          개선으로 결과를 수치로 검증합니다.
        </li>
      </ul>
    </>
  ),
  "디자인 시스템": () => (
    <>
      <h3>디자인 시스템</h3>
      <div className="hash_tag">
        <span>Vanilla Extract</span>
        <span>Style Dictionary</span>
        <span>Storybook</span>
        <span>Chromatic</span>
      </div>
      <ul className="list">
        <li>
          공통 컴포넌트 라이브러리를 설계하고, Figma 토큰을 Style
          Dictionary로 코드에 자동 반영하는 파이프라인을 구축합니다.
        </li>
        <li>
          색상, 간격, radius, elevation, motion 등을 토큰화하고 멀티브랜드
          테마 시스템을 설계한 경험이 있습니다.
        </li>
        <li>
          Storybook 문서화, Chromatic 시각 회귀 테스트로 디자인-코드
          불일치를 자동으로 감지합니다.
        </li>
      </ul>
    </>
  ),
  "협업/문서화": () => (
    <>
      <h3>협업/문서화</h3>
      <div className="hash_tag">
        <span>부트캠프 강사</span>
        <span>코드 컨벤션</span>
        <span>문서화</span>
      </div>
      <ul className="list">
        <li>
          디자이너와 화면 시안을, 백엔드와 API 응답 형식을 상시 협의하며
          작업합니다.
        </li>
        <li>
          코드 컨벤션, SEO 개선 매뉴얼, 프로젝트 문서 작성 가이드 등 팀이
          함께 참고할 수 있는 문서를 작성합니다.
        </li>
        <li>
          부트캠프에서 HTML/CSS 강사로 수강생들을 가르친 경험을 바탕으로
          지식을 정리해 전달하는 데 익숙합니다.
        </li>
      </ul>
    </>
  ),
  "package.json": () => (
    <div className={`json ${nanumCoding.className}`}>
      <p className="colon">&#123;</p>
      <div className="pl-4">
        <p className="flex gap-1">
          <span className="label">
            &quot;설명&quot;<span className="colon">: </span>
          </span>

          <span className="desc">&quot;{skillData.설명}&quot;</span>
        </p>
        <div className="pl-4">
          <p>
            <span className="label">&quot;주요 활용 기술&quot;</span>
            <span className="colon">: &#123;</span>
          </p>
          {Object.entries(skillData["주요 활용 기술"]).map(
            ([category, skills]) => (
              <p key={category} className="pl-4 flex  gap-1">
                <span className="label">
                  &quot;{category}&quot;
                  <span className="colon">: </span>
                </span>

                <span className="array">
                  {skills.map((skill) => (
                    <span key={skill}>&quot;{skill}&quot;</span>
                  ))}
                </span>
              </p>
            )
          )}
          <p className="colon">&#125;</p>
        </div>
      </div>
      <p className="colon">&#125;</p>
    </div>
  ),
};
```

- [ ] **Step 4: `Skills.tsx`의 미사용 import 정리**

기존 `Skills.tsx` 상단에서 `import { FaHtml5 } from "react-icons/fa";`(374행 근처, `iconInfo.icon` 기본값으로 사용됨)는 유지하되, 더 이상 쓰이지 않는 `nanumCoding`을 제외한 다른 미사용 import가 있는지 확인.

Run: `npx eslint src/components/Skills.tsx --fix`

이 명령은 이 세션에서 변경한 `Skills.tsx` 한 파일에만 국한되므로 CLAUDE.md의 "전체 --fix 금지" 규칙에 저촉되지 않는다.

- [ ] **Step 5: 타입체크 및 빌드로 검증**

Run: `npx tsc --noEmit -p /Users/dreamfulbud/Desktop/GitHub/stronger-deer/tsconfig.json && cd /Users/dreamfulbud/Desktop/GitHub/stronger-deer && npm run build`
Expected: 에러 없이 통과. 특히 `Skills.tsx:229`의 `useState<I_Tab[]>(TABS)`와 `TabContents[activeTab as keyof typeof TabContents]`가 새 `TABS`의 `name` 값과 `TabContents`의 키가 정확히 일치하는지가 타입/런타임 양쪽에서 중요하다.

- [ ] **Step 6: dev 서버로 탭 전환 육안 확인**

Run: `cd /Users/dreamfulbud/Desktop/GitHub/stronger-deer && npm run dev`

브라우저에서 Skills 섹션의 5개 새 탭(UI/UX 구현, 데이터 시각화·성과 측정, 성능/SEO/품질, 디자인 시스템, 협업/문서화)을 각각 클릭해 내용이 정상적으로 전환되는지 확인. 자동 순환(3초 간격)도 정상 동작하는지 확인.

- [ ] **Step 7: (커밋 보류)**

`git add src/data/skill.ts src/components/Skills.tsx`까지만 수행.

---

### Task 8: 강의 수강생 수치 갱신

**Files:**
- Modify: `src/data/experience.ts:34-43`

**Interfaces:**
- Consumes: 없음
- Produces: 없음 (leaf 데이터)

- [ ] **Step 1: 인프런 강의 수치 갱신**

`src/data/experience.ts:34-43`을 찾아 교체:

```typescript
  {
    id: 2,
    thumb: "/thumb_inflearn.jpg",
    icon: LeafyGreen,
    title: "인프런 온라인 강의",

    contents: [
      {
        text: "<strong>아는 만큼 보이는 크롬 개발자 도구</strong><span>(2023.06)</span>",
        lists: [
          "프론트엔드 개발자가 알아야 할 크롬 개발자 도구의 기본적인 기능과 실무에 활용할 수 있는 팁을 담은 강의",
          "<strong>수강생 2,693명</strong> / <strong>평점 4.8</strong> / 수강평 85개 <span>(2026년 7월 기준)</span>",
        ],
      },
    ],

    link: { url: "https://inf.run/FQsL", text: "강의 링크" },
  },
```

- [ ] **Step 2: 타입체크로 검증**

Run: `npx tsc --noEmit -p /Users/dreamfulbud/Desktop/GitHub/stronger-deer/tsconfig.json`
Expected: 에러 없음.

- [ ] **Step 3: (커밋 보류)**

`git add src/data/experience.ts`까지만 수행.

---

### Task 9: Page0127 상세 페이지 전면 재작성 — "UI/UX 판단 과정" 구조

**Files:**
- Modify: `projects/page0127.md` (본문 전체 교체, frontmatter는 Task 5에서 이미 확정된 index=1 유지하되 다른 필드 갱신)
- Modify: `src/utils/projects.ts:19-51` (`adjustHeadingLevel()`의 section id 매핑)

**Interfaces:**
- Consumes: `src/utils/projects.ts`의 `getProject()` 파이프라인(remark→rehype, heading depth 조정) — 이 마크다운 구조를 그대로 통과해야 함
- Produces: 새 heading 텍스트 목록(아래 Step 1에서 확정) — Step 2가 이 정확한 문자열에 의존

- [ ] **Step 1: `page0127.md`의 frontmatter와 본문을 전면 교체**

```markdown
---
index: 1
id: "page0127"
type: "개인"
title: "page0127."
thumb: "/project_page0127.jpg"
period: "2024.03~진행중"
kor: "페이지 읽다"
description: "내가 읽은 책이라는 실제 데이터를 기록·통계·취향 분석·추천으로 이어지는 서비스 구조로 바꾼 개인 프로젝트"
tags: ["TypeScript", "React", "Next.js", "Design"]
skills:
  [
    "Next.js 16",
    "React 19",
    "TypeScript",
    "Supabase",
    "TanStack Query v5",
    "OpenAI API",
    "Aladin API",
    "Recharts",
    "Tailwind CSS",
  ]
icon: "Book"
metrics:
  [
    "완독·별점 기록 기반 AI 독서 취향 분석과 추천 도서 생성 기능 구현",
    "Supabase 기반 로그인, 팔로우, 좋아요, 댓글, 알림 등 소셜 기능 확장",
    "영역별 독립 로딩으로 일부 영역 오류가 전체 화면을 멈추지 않도록 구성",
  ]
url: "https://page0127.vercel.app/"
github: "https://github.com/strongerDeer/page0127"

role: "개인 작업 100% (기획/디자인/개발)"

---

# 이 프로젝트를 보는 방법

Page0127은 실무 프로젝트보다 큰 성과를 주장하는 용도가 아닙니다. 회사 프로젝트에서 보여주기 어려운 실제 화면과 제품 감각, 그리고 **내가 읽은 책이라는 실제 데이터를 기록 → 통계 → 취향 분석 → 추천으로 이어지는 흐름으로 설계한 판단 과정**을 보여주는 프로젝트입니다.

# 내 책장

## 사용자 목표

자취방처럼 물리적 책장을 두기 어려운 공간에서도, 내가 읽은 책을 한눈에 훑어보고 완독 여부를 바로 구분하고 싶습니다.

## UI 판단

완독한 책은 표지가 보이는 방향으로, 아직 안 읽었거나 기록만 해둔 책은 책등 방향으로 꽂았습니다. 인생 도서로 표시한 책만 항상 표지를 보여줍니다.

## 판단 근거

실제 책장에서 사람들은 등록 여부가 아니라 "완독했는가"와 "특별히 아끼는 책인가"를 기준으로 책을 다르게 배치합니다. 화면의 정보 위계도 데이터 필드 순서가 아니라 이 물리적 인지 습관을 따르는 것이 더 빠르게 읽힌다고 판단했습니다.

# 독서 통계

## 사용자 목표

한 해 동안 얼마나, 어떤 종류의 책을 읽었는지 확인하고 다음 목표를 세우고 싶습니다.

## UI 판단

연도별/월별 독서량은 바 차트로, 카테고리 분포는 레이더 차트로 분리해서 보여줍니다. 목표 진행률은 별도로 상단에 고정합니다.

## 판단 근거

"얼마나 읽었는가"(양)와 "무엇을 읽었는가"(분포)는 사용자가 확인하려는 질문 자체가 다릅니다. 하나의 차트에 욱여넣으면 두 질문 다 답하기 어려워지므로, 차트 유형을 질문 단위로 나눴습니다. 목표 진행률을 통계 하단이 아니라 상단에 둔 것은, 통계 화면에 들어오는 사용자의 우선 관심사가 "올해 목표에 얼마나 가까운가"라고 판단했기 때문입니다.

# AI 취향 분석

## 사용자 목표

내가 남긴 완독 기록과 별점만으로는 스스로 어떤 책을 좋아하는지 명확히 정리되지 않습니다. 내 취향을 정리해서 보고, 다음 읽을 책을 추천받고 싶습니다.

## UI 판단

완독·별점 데이터를 OpenAI API로 분석해 독서 성향 요약과 추천 도서를 함께 보여주고, 분석 결과는 다시 조회할 수 있도록 저장합니다.

## 판단 근거

매번 새로 분석을 요청하면 응답을 기다리는 시간이 매번 발생하고, 같은 데이터로 다시 분석해도 결과가 미묘하게 달라질 수 있습니다. 분석 시점의 결과를 저장해두면 사용자가 이전 분석과 현재 분석을 비교하며 자신의 취향 변화를 확인할 수 있다고 판단했습니다.

# 기술적으로 보강한 부분

- Next.js 구조를 활용해 랭킹·캘린더 등 영역을 독립적으로 로딩시켜, 한 영역에서 오류가 나도 전체 화면이 멈추지 않도록 구성했습니다.
- 알라딘 도서 API를 서버에서 중계하고 1시간 캐시를 적용해 외부 API 호출량과 브라우저 보안 제약을 줄였습니다.
- 팔로잉 활동 피드에 무한 스크롤을 적용해 목적 없이 탐색하는 흐름을 자연스럽게 만들었고, 반대로 내 책 리스트처럼 특정 책을 찾는 목적성이 뚜렷한 화면에는 페이지네이션을 적용해 탐색 방식을 화면 목적에 맞게 구분했습니다.

# 로드맵

현재 계속 개발 중인 개인 서비스입니다. 아래는 진행 상태를 있는 그대로 표시한 것입니다.

## 구현 완료

개인 책장, 도서 등록·수정·삭제, 완독 기록, 별점 기록, 독서 통계

## 구현·개선 중

활동 피드, 공개 책장, 팔로우, 좋아요, 댓글, 알림 — 완성도에 따라 포트폴리오에는 일부만 노출합니다.

## 확장 기능

완독·별점 기반 AI 독서 취향 분석과 추천 도서 생성 — 동작 화면과 결과 예시가 갖춰지는 대로 강조할 예정입니다.
```

- [ ] **Step 2: `src/utils/projects.ts`의 heading id 매핑을 새 구조에 맞춰 조정**

`src/utils/projects.ts:19-51`(`adjustHeadingLevel()` 함수)을 찾아 교체:

```typescript
function adjustHeadingLevel() {
  return (tree: Root) => {
    visit(tree, "heading", (node: Heading) => {
      // h1(#)를 h3로 변경
      if (node.depth === 1) {
        node.depth = 3;
      } else if (node.depth === 2) {
        node.depth = 4;
      } else if (node.depth === 3) {
        node.depth = 5;
      }

      const headingText = node.children
        .map((child) => (child.type === "text" ? child.value : ""))
        .join("");

      if (headingText === "🤔 배경") {
        node.data = { ...node.data, hProperties: { id: "section1" } };
      } else if (headingText === "📝 기획") {
        node.data = { ...node.data, hProperties: { id: "section2" } };
      } else if (headingText === "🛠️ 기술 스택") {
        node.data = { ...node.data, hProperties: { id: "section3" } };
      } else if (headingText === "🔍 기능") {
        node.data = { ...node.data, hProperties: { id: "section4" } };
      } else if (headingText === "🚨 트러블슈팅") {
        node.data = { ...node.data, hProperties: { id: "section5" } };
      } else if (headingText === "🎯 성과 및 기여") {
        node.data = { ...node.data, hProperties: { id: "section6" } };
      } else if (headingText === "💡 인사이트") {
        node.data = { ...node.data, hProperties: { id: "section7" } };
      } else if (headingText === "📈 향후 개선 계획") {
        node.data = { ...node.data, hProperties: { id: "section8" } };
      } else if (headingText === "문제") {
        node.data = { ...node.data, hProperties: { id: "section1" } };
      } else if (headingText === "역할") {
        node.data = { ...node.data, hProperties: { id: "section2" } };
      } else if (headingText === "해결") {
        node.data = { ...node.data, hProperties: { id: "section3" } };
      } else if (headingText === "결과") {
        node.data = { ...node.data, hProperties: { id: "section4" } };
      } else if (
        headingText === "설계 판단 기준 — 데이터가 없는 초기 단계에서" ||
        headingText === "공개 가능한 근거 방식"
      ) {
        node.data = { ...node.data, hProperties: { id: "section5" } };
      } else if (headingText === "이 프로젝트를 보는 방법") {
        node.data = { ...node.data, hProperties: { id: "section1" } };
      } else if (headingText === "로드맵") {
        node.data = { ...node.data, hProperties: { id: "section8" } };
      }
    });
  };
}
```

이 변경은 기존 8개 프로젝트(문제/해결/결과 heading이 없는 8단계 포맷)에는 영향을 주지 않는다 — `else if` 체인이므로 새로 추가된 조건은 새 heading 텍스트와 정확히 일치할 때만 매칭되고, 기존 md 파일들의 heading(🤔 배경 등)은 기존 조건에서 그대로 매칭된다.

- [ ] **Step 3: build로 검증**

Run: `cd /Users/dreamfulbud/Desktop/GitHub/stronger-deer && npm run build`
Expected: 에러 없이 빌드 성공.

- [ ] **Step 4: dev 서버로 Page0127 상세 페이지 육안 확인**

Run: `cd /Users/dreamfulbud/Desktop/GitHub/stronger-deer && npm run dev`

브라우저에서 `http://localhost:3000/page0127`을 열어:
- "이 프로젝트를 보는 방법" → "내 책장" → "독서 통계" → "AI 취향 분석" → "기술적으로 보강한 부분" → "로드맵" 순서로 렌더링되는지 확인
- 각 화면 섹션 안에 "사용자 목표 / UI 판단 / 판단 근거" 3단 구조(h4로 렌더링됨)가 보이는지 확인
- 기존 이미지(책장/차트 등)는 이번 재작성에서 본문에 포함하지 않았으므로 표시되지 않는 것이 정상 — 이미지 삽입은 이 계획의 범위 밖(캡처 우선순위 문서 참고, 향후 별도 작업)

- [ ] **Step 5: 다른 프로젝트 상세 페이지가 기존과 동일하게 렌더링되는지 회귀 확인**

브라우저에서 `http://localhost:3000/teemstone` 등 8단계 포맷을 쓰지 않는 기존 md 하나를 열어 정상 렌더링 확인 (Step 2의 id 매핑 변경이 다른 프로젝트에 영향 없음을 실제로 확인).

- [ ] **Step 6: (커밋 보류)**

`git add projects/page0127.md src/utils/projects.ts`까지만 수행.

---

### Task 10: NOVERA 카드 스타일 세부 조정 및 전체 통합 검증

**Files:**
- Modify: 없음(Task 3에서 이미 생성한 스타일 파일을 필요 시 미세 조정)

**Interfaces:**
- Consumes: Task 1~9의 모든 결과물
- Produces: 없음 (최종 검증 태스크)

- [ ] **Step 1: 전체 lint 실행 (변경 파일 한정)**

Run:
```bash
cd /Users/dreamfulbud/Desktop/GitHub/stronger-deer
npx eslint src/data/introduce.ts src/components/Hero.tsx src/data/careers.ts src/components/Work.tsx src/components/project/ProjectThumb.tsx src/components/project/ProjectCard.tsx src/components/Projects.tsx src/data/skill.ts src/components/Skills.tsx src/data/experience.ts src/utils/projects.ts
```
Expected: 에러 없음(경고는 확인 후 판단).

- [ ] **Step 2: 전체 빌드**

Run: `cd /Users/dreamfulbud/Desktop/GitHub/stronger-deer && npm run build`
Expected: 에러 없이 빌드 성공, 12개 프로젝트 정적 페이지 생성 로그 확인.

- [ ] **Step 3: dev 서버로 전체 페이지 통합 확인**

Run: `cd /Users/dreamfulbud/Desktop/GitHub/stronger-deer && npm run dev`

브라우저에서 `http://localhost:3000`을 열어 위에서 아래로 스크롤하며 확인:
1. Hero: "0.1초의 피드백을 데이터로 증명하는" 카피와 키워드 3개 카드
2. Featured Projects 5장 + Other Projects 7장
3. Work: NOVERA가 최상단, 상단 요약이 "3년 9개월"
4. Skills: 새 5개 탭 전환 확인
5. Education/Certifications: 기존 그대로 유지되어 있는지 확인

- [ ] **Step 4: 반응형 확인 (모바일 뷰포트)**

Chrome DevTools에서 뷰포트를 375px로 좁혀 Featured 카드의 텍스트 폴백 레이아웃(Task 3)이 깨지지 않는지, Skills 탭이 모바일에서 정상 동작하는지 확인 (`Skills.tsx:227-237`의 `width <= 1024` 분기가 `package.json` 탭을 숨기는 기존 로직과 충돌하지 않는지 확인).

- [ ] **Step 5: (커밋 보류 — 사용자 승인 대기)**

이 계획의 모든 태스크에서 `git add`만 수행하고 실제 `git commit`은 실행하지 않았다. 전체 변경사항을 사용자에게 보고하고, 커밋 여부와 커밋 메시지 분리 방식(예: 태스크 단위로 여러 커밋 vs 단일 커밋)을 확인한 뒤 사용자 승인이 있을 때만 커밋을 진행한다.

---

## Self-Review 결과

**Spec coverage:**
- Hero 갱신 → Task 1 ✅
- Featured Projects 5장(Page0127+NOVERA 4개) → Task 4, 6 ✅
- Other Projects 축소 → Task 5 ✅
- Experience(NOVERA 추가, Weniv 유지, 웹디자인 축약) → Task 2 ✅
- Skills 재그룹핑 → Task 7 ✅
- 강의 수치 갱신 → Task 8 ✅
- Page0127 "판단 과정" 구조 재작성 → Task 9 ✅
- NOVERA Shop "데이터 없는 초기 단계" 리프레이밍 → Task 4 Step 1(novera-shop.md 본문에 포함) ✅
- 이미지 없는 카드 폴백 UI → Task 3 ✅
- 캡처 우선순위 목록·최종 검수 체크리스트 → 설계 문서에 이미 존재, 코드 변경 대상이 아니므로 이 구현 계획에서는 별도 태스크 없음(콘텐츠 작성이 이 계획의 결과물이므로 최종 검수는 Task 10 완료 후 사용자와 함께 문서의 체크리스트 4항목을 확인하는 것으로 충분)

**Placeholder scan:** 각 태스크의 코드 블록은 완성된 내용이며 "TODO"/"나중에" 표현 없음. Task 5의 md 파일 개수(기존 8개 + 신규 4개 = 12개)는 실제 `ls` 결과로 재확인 완료.

**Type consistency:** `I_PROJECTS` 인터페이스는 전 태스크에서 필드 추가 없이 그대로 사용. `ProjectThumb` props에 `title?`, `metrics?`를 추가했고 `ProjectCard.tsx`에서 이 두 값을 정확히 전달하도록 Step 2에서 반영함. `TABS`의 `name`과 `TabContents`의 키 문자열이 정확히 일치하는지 Task 7 Step 5에서 명시적으로 검증하도록 안내함.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-09-portfolio-renewal.md`. 실행 방식을 선택해주세요.

**1. Subagent-Driven (추천)** — 태스크마다 새 subagent를 띄워 작업시키고 태스크 사이마다 검토, 빠른 반복

**2. Inline Execution** — 이 세션에서 executing-plans로 배치 실행, 체크포인트마다 검토

어떤 방식으로 진행할까요?
