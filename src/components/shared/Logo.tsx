import { raleway } from "@font/font";

import styles from "./Logo.module.scss";

export default function Logo({ className }: { className?: string }) {
  return (
    <span
      className={`${raleway.className} ${styles.logo} ${
        className ? className : `text-xl sm:text-3xl`
      }`}
    >
      <span>s</span>
      <span>t</span>
      <span>r</span>
      <span>o</span>
      <span>n</span>
      <span>g</span>
      <span>e</span>
      <span>r</span>
      <wbr />
      <span>Deer</span>
    </span>
  );
}
