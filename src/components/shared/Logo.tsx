import { pretendard } from "@font";

import styles from "./Logo.module.scss";

const Logo = ({ className }: { className?: string }) => {
  return (
    <span
      className={`${pretendard.className} ${styles.logo} ${
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
      <span>Deer</span>
    </span>
  );
};

export default Logo;
