import Link from "next/link";

import styles from "./Nav.module.scss";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <Link href="#section1">배경</Link>
      <Link href="#section2">기획</Link>
      <Link href="#section3">기술</Link>
      <Link href="#section4">기능</Link>
      <Link href="#section5">트러블슈팅</Link>
      <Link href="#section6">성과</Link>
      <Link href="#section7">인사이트</Link>
    </nav>
  );
}
