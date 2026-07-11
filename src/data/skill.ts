import {
  Boxes,
  Gauge,
  LayoutDashboard,
  LucideIcon,
  Palette,
  SquareStack,
} from "lucide-react";
import { IconType } from "react-icons";
import { FaGithub } from "react-icons/fa";
import { SiClaude } from "react-icons/si";

export interface I_SkillDomain {
  id: string;
  title: string;
  description: string;
  evidence: string;
  projectId?: string;
  icon: LucideIcon;
}

// 이력서의 "맡길 수 있는 기술 영역"을 실무 근거(evidence)와 함께 정리.
// evidence는 실제 프로젝트에서 만든 결과라 "할 수 있다"가 아니라 "해봤다"로 읽힌다.
export const SKILL_DOMAINS: I_SkillDomain[] = [
  {
    id: "product-ui",
    title: "Product UI",
    description:
      "상품 탐색, 주문/클레임, 운영 어드민처럼 상태가 복잡한 화면의 로딩·오류·빈 화면·권한 상태를 일관되게 설계하고 구현합니다.",
    evidence:
      "NOVERA Shop 커머스 핵심 화면의 상태 표현을 정리해 CS 발생 지점을 사전 안내로 전환",
    projectId: "novera-shop",
    icon: SquareStack,
  },
  {
    id: "frontend-architecture",
    title: "Frontend Architecture",
    description:
      "Next.js App Router, React 19, TypeScript strict, TanStack Query v5 기반으로 서버/클라이언트 경계, 데이터 캐싱, 폼 흐름을 구성합니다.",
    evidence:
      "SSR 데이터와 클라이언트 캐시를 prefetch/dehydrate로 연결하고, 무한 스크롤 필터 빈 화면까지 방어",
    projectId: "novera-shop",
    icon: Boxes,
  },
  {
    id: "design-system",
    title: "Design System",
    description:
      "Vanilla Extract, Style Dictionary, Storybook 기반으로 공통 컴포넌트와 디자인 토큰을 정리하고 제품 간 UI 기준을 맞춥니다.",
    evidence:
      "NDS 공통 컴포넌트 30종, Figma 토큰 변환 흐름, 런타임 스타일 계산을 줄이는 타입 안전한 variant 구조 구성",
    projectId: "nds",
    icon: Palette,
  },
  {
    id: "performance-seo",
    title: "Performance & SEO",
    description:
      "Core Web Vitals, Lighthouse, 이미지 전송량, 웹폰트, canonical, JSON-LD, sitemap/robots를 점검해 검색 노출과 초기 경험을 개선합니다.",
    evidence:
      "이미지 전송량·웹폰트 로드 방식을 실사용자 지표와 Lighthouse로 교차 확인해 개선 우선순위를 도출(운영 사이트 SEO 100·접근성 96)",
    projectId: "novera-shop",
    icon: Gauge,
  },
  {
    id: "data-dashboard",
    title: "Data Dashboard",
    description:
      "GA4 Data API, Google Search Console, 어드민 데이터를 연결해 이벤트 성과와 품질 지표를 Recharts 기반 대시보드로 시각화합니다.",
    evidence:
      "이벤트 성과 분석 체계와 대시보드 6종을 구축하고, SPHERE 1회차 DAU를 사업팀과 합의한 내부 목표 대비 122%로 추적",
    projectId: "novera-dashboard",
    icon: LayoutDashboard,
  },
];

export const MAIN_STACK = [
  "React 19",
  "Next.js 16",
  "TypeScript",
  "TanStack Query v5",
  "Vanilla Extract",
  "Style Dictionary",
  "Storybook",
  "Recharts",
  "GA4 Data API",
  "Tailwind CSS",
  "AWS Amplify",
];

// 도구 아이템 인터페이스
interface I_Program {
  id: number;
  name: string;
  image?: string;
  icon?: IconType;
  description: string;
}

export const PROGRAMS: I_Program[] = [
  {
    id: 1,
    name: "VS Code",
    image: "/program/vsc.jpg",
    description: "기술 스택 관점 — 확장 프로그램, 스니펫 등 코드 작성 환경.",
  },
  {
    id: 2,
    name: "Chrome",
    image: "/program/chrome.jpg",
    description: "사용자 관점 — 개발자 도구로 실제 사용자가 보는 화면을 점검.",
  },
  {
    id: 3,
    name: "Notion",
    image: "/program/notion.png",
    description: "협업 관점 — 정책·기준·문서를 팀이 함께 참고하도록 정리.",
  },
  {
    id: 4,
    name: "Figma",
    image: "/program/figma.jpg",
    description: "디자인·협업 관점 — 디자이너와 화면 시안, 토큰을 함께 검토.",
  },
  {
    id: 5,
    name: "GitHub",
    icon: FaGithub,
    description: "버전관리 관점 — 코드 리뷰, 커밋 컨벤션으로 협업 이력 관리.",
  },
  {
    id: 6,
    name: "Claude",
    icon: SiClaude,
    description:
      "AI 도구 활용 — 품질 측정 해석, 문서 동기화를 보조로 활용하고 최종 판단은 직접 수행.",
  },
];
