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

export interface I_PROJECTS {
  index: number;
  id: string;
  type: "개인" | "업무";
  period: string;
  thumb: string;
  title: string;
  kor: string;
  description: string;

  tags: SkillType[];
  icon: string;
  metrics: string[];
  url: string;
  github?: string;

  skills: string[];
  person: string;
  role: string;
  content: string;
}
