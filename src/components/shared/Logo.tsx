import { raleway } from "@font/font";

import styles from "./Logo.module.scss";

export default function Logo({ className }: { className?: string }) {
  return (
    <span
      className={`text-3xl ${raleway.className} ${styles.logo} ${className}`}
    >
      <span>s</span>
      <span>t</span>
      <span>r</span>
      <span>o</span>
      <span>n</span>
      <span>g</span>
      <span>e</span>
      <span>r</span>
      <span>Deer</span>
    </span>
  );
}
