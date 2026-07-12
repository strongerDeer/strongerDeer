import {
  Binary,
  Book,
  BookOpenText,
  Building,
  ChartSpline,
  Cpu,
  Link,
  Tent,
} from "lucide-react";

export const ICON_MAP = {
  Binary,
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
