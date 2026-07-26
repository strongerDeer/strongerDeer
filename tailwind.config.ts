import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryA11y: "var(--primary-a11y)",
        point: "var(--point)",
        background: "var(--background)",
        foreground: "var(--foreground)",

        // 의미 기반 색 토큰(globals.scss 의 :root 참고).
        // gray-* 를 직접 쓰지 말고 이쪽을 쓰면 다크 모드가 자동으로 따라온다.
        surface: "var(--surface)",
        "surface-sunken": "var(--surface-sunken)",
        "surface-subtle": "var(--surface-subtle)",
        "surface-muted": "var(--surface-muted)",
        "surface-inverse": "var(--surface-inverse)",

        line: "var(--line)",
        "line-subtle": "var(--line-subtle)",
        "line-strong": "var(--line-strong)",

        ink: "var(--ink)",
        "ink-body": "var(--ink-body)",
        "ink-soft": "var(--ink-soft)",
        "ink-faint": "var(--ink-faint)",
        "ink-inverse": "var(--ink-inverse)",

        accent: "var(--accent)",
        "accent-text": "var(--accent-text)",
        "accent-surface": "var(--accent-surface)",
        "accent-soft": "var(--accent-soft)",
        "accent-line": "var(--accent-line)",
        "accent-tint": "var(--accent-tint)",
      },
    },
  },
  plugins: [],
} satisfies Config;
