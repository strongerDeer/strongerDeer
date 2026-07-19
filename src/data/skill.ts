import {
  Accessibility,
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

export type I_SkillDomain = {
  id: string;
  title: string;
  // JSX 컴포넌트처럼 보이게 쓰는 PascalCase 이름 (<ProductUI /> eyebrow).
  // title은 공백이 있어 태그로 못 쓰므로 별도 필드로 둔다.
  component: string;
  description: string;
  evidence: string;
  image?: string;
  projectId?: string;
  icon: LucideIcon;
};

// 이력서의 "맡길 수 있는 기술 영역"을 실무 근거(evidence)와 함께 정리.
// evidence는 실제 프로젝트에서 만든 결과라 "할 수 있다"가 아니라 "해봤다"로 읽힌다.
export const SKILL_DOMAINS: I_SkillDomain[] = [
  {
    id: "design-system",
    title: "Design System",
    component: "DesignSystem",
    description:
      "Vanilla Extract, Style Dictionary, Storybook 기반 공통 컴포넌트·디자인 토큰을 사내 패키지로 관리합니다.",
    evidence:
      "오픈 초기부터 화면마다 반복될 UI·접근성·토큰 판단을 API·테스트·패키지로 구조화해 NOVERA Shop 고객 화면에 적용",
    image: "/project/nds_button.jpg",
    projectId: "nds",
    icon: Palette,
  },
  {
    id: "browser-accessibility",
    title: "Browser & Accessibility",
    component: "BrowserAccessibility",
    description:
      "포인터·키보드·포커스·뷰포트 등 브라우저 동작을 접근 가능한 컴포넌트 기본값과 테스트로 연결합니다.",
    evidence:
      "모달의 포커스 복귀·다중 오버레이 순서·포인터 입력 판정과 아이콘 버튼 접근성 이름·최소 44px 크기의 터치 영역을 기본 동작과 테스트로 고정",
    image: "/project/nds_modal.jpg",
    projectId: "nds",
    icon: Accessibility,
  },
  {
    id: "product-ui",
    title: "Product UI",
    component: "ProductUI",
    description:
      "상품 탐색, 주문/클레임, 운영 어드민처럼 상태가 많은 화면을 로딩·오류·빈 화면·권한 상태까지 포함해 설계·구현합니다.",
    evidence: "NOVERA Shop에서 문의가 잦던 지점을 화면 내 사전 안내로 전환",
    image: "/project/novera-shop_plp.jpg",
    projectId: "novera-shop",
    icon: SquareStack,
  },
  {
    id: "frontend-architecture",
    title: "Frontend Architecture",
    component: "FrontendArchitecture",
    description:
      "Next.js App Router, React 19, TypeScript strict, TanStack Query v5 기반의 서버/클라이언트 데이터 흐름과 폼을 설계합니다.",
    evidence:
      "SSR 데이터를 prefetch/dehydrate로 클라이언트 캐시에 이어받아 중복 요청 제거, 무한 스크롤·필터 조합의 빈 결과 화면까지 처리",
    image: "/project/novera-shop_architecture.png",
    projectId: "novera-shop",
    icon: Boxes,
  },
  {
    id: "performance-seo",
    title: "Performance & SEO",
    component: "PerformanceSEO",
    description:
      "Core Web Vitals·Lighthouse 기반 이미지·웹폰트 최적화와 canonical, JSON-LD, sitemap 등 SEO 설정 점검으로 초기 로딩·검색 노출을 개선합니다.",
    evidence: "실사용자 지표와 Lighthouse를 교차 확인해 개선 우선순위 도출",
    image: "/project/nad_crux.jpg",
    projectId: "novera-dashboard",
    icon: Gauge,
  },
  {
    id: "data-dashboard",
    title: "Data Dashboard",
    component: "DataDashboard",
    description:
      "GA4 Data API, Search Console, 어드민 데이터를 연결한 성과·품질 지표를 Recharts 대시보드로 시각화합니다.",
    evidence:
      "이벤트 성과 분석 체계 구축·대시보드 배포. 회차별 오픈 시점 차이를 상대기간으로 정규화해 공정 비교하고, 지표의 귀속 한계·데이터 커버리지를 함께 노출해 오독 방지",
    image: "/project/nad_quality.jpg",
    projectId: "novera-dashboard",
    icon: LayoutDashboard,
  },
];

export const MAIN_STACK = [
  "React 19",
  "Next.js 16",
  "TypeScript",
  "TanStack Query v5",
  "react-hook-form",
  "yup",
  "Tailwind CSS",
  "Vanilla Extract",
  "Style Dictionary",
  "Storybook",
  "Vite",
  "tsup",
  "Vitest",
  "Playwright",
  "Chromatic",
  "GitHub Actions",
  "Nexus",
  "Recharts",
  "GA4 Data API",
  "Google Search Console",
  "Core Web Vitals",
  "AWS Amplify",
  "Vercel",
  "Figma",
  "Jira",
  "Notion",
  "GitHub",
];

// 도구 아이템 인터페이스
type I_Program = {
  id: number;
  name: string;
  image?: string;
  icon?: IconType;
  description: string;
};

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
