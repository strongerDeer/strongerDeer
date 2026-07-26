import {
  Book,
  BookOpenText,
  Building,
  ChartSpline,
  Cpu,
  Link,
  Tent,
} from "lucide-react";

export const ICON_MAP = {
  Book,
  BookOpenText,
  Building,
  ChartSpline,
  Cpu,
  Link,
  Tent,
} as const;

export type ICON_TYPE = keyof typeof ICON_MAP;

export const SKILL = [
  "HTML",
  "CSS",
  "Sass",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Design",
] as const;

export type SkillType = (typeof SKILL)[number];

export type ProjectHeading = {
  id: string;
  text: string;
};

export type I_PROJECTS = {
  index: number;
  id: string;
  type: "개인" | "업무";
  period: string;
  thumb: string;
  title: string;
  kor: string;
  description: string;
  detailLabel?: string;

  tags: SkillType[];
  icon: string;
  metrics: string[];
  // 상세 페이지 "핵심 결과"를 KPI 스타일(큰 값 + 설명)로 보여줄 때 쓰는 선택 필드.
  // 없으면 metrics 문장으로 그대로 렌더한다(숫자 없는 프로젝트 안전).
  // 카드(ProjectCard)는 계속 metrics만 쓰므로 영향 없음.
  highlights?: { value: string; label: string }[];
  url: string;
  urlType?: "site" | "slides";
  urlLabel?: string;
  github?: string;
  codeDisclosure?: string;

  skills: string[];
  person: string;
  role: string;
  headings: ProjectHeading[];
  content: string;
};

/**
 * 홈 카드(ProjectCard)가 실제로 쓰는 필드만 추린 타입.
 *
 * 홈은 클라이언트 컴포넌트(Projects)에 목록을 넘기므로, I_PROJECTS 를 그대로 주면
 * 상세 본문 HTML(content)까지 RSC 페이로드에 직렬화된다 — 홈에서 쓰지도 않는
 * 9개 프로젝트의 상세 내용이 통째로 실려 왔다.
 */
export type I_PROJECT_SUMMARY = Pick<
  I_PROJECTS,
  | "index"
  | "id"
  | "type"
  | "thumb"
  | "title"
  | "kor"
  | "description"
  | "detailLabel"
  | "skills"
  | "icon"
  | "metrics"
  | "url"
  | "urlType"
  | "urlLabel"
  | "github"
>;
