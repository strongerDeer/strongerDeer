import Link from "next/link";

import { ProjectHeading } from "@data/project";

import styles from "./Nav.module.scss";

type NavProps = {
  headings: ProjectHeading[];
};

// 헤딩 원문이 긴 경우에만 Nav 표시용 짧은 라벨로 대체한다.
// 여기에 없는 헤딩은 원문을 그대로 노출한다.
const SHORT_LABEL: Record<string, string> = {
  "이 프로젝트를 보는 방법": "소개",
  "기술적으로 어려웠던 문제": "기술 문제",
  "기술적으로 보강한 부분": "기술 보강",
  "설계 판단 기준 — 데이터가 없는 초기 단계에서": "판단 기준",
  "공개 가능한 근거 방식": "공개 근거",
  "배경과 문제": "배경·문제",
  "왜 이 기술을 사용했나": "기술 선택",
  "운영·경영진용 성과 대시보드": "성과 대시보드",
  "프론트엔드 품질 모니터링": "품질 모니터링",
};

const Nav = ({ headings }: NavProps) => {
  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className={styles.nav}>
      {headings.map(({ id, text }) => (
        <Link key={id} href={`#${id}`}>
          {SHORT_LABEL[text] ?? text}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
