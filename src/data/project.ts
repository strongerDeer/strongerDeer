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
