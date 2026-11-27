import {
  DATA_ATTRIBUTE_KEYS,
  DEFAULT_SETTINGS,
  DisplaySettings,
} from '@/data/displaySettings';

// 직접 고른 강조색이 덮어쓰는 토큰들
const CUSTOM_ACCENT_TOKENS = ['--accent-base', '--accent-soft', '--on-accent'];

// <html>에 data-* 속성만 바꾼다. 색·글꼴 값 계산은 globals.css 토큰이 맡는다
export function applyDisplaySettings(settings: DisplaySettings) {
  const root = document.documentElement;

  for (const key of DATA_ATTRIBUTE_KEYS) {
    const value = settings[key];
    // 기본값이면 속성을 지워서 CSS 기본 토큰을 그대로 쓰게 한다
    if (value === DEFAULT_SETTINGS[key]) {
      root.removeAttribute(`data-${key}`);
    } else {
      root.setAttribute(`data-${key}`, value);
    }
  }

  // 직접 고른 색은 프리셋 규칙이 없으니 html style로 토큰을 덮어쓴다 (인라인이 CSS 규칙보다 우선)
  if (settings.accent === 'custom') {
    const { color, textColor } = settings.customAccent;
    root.style.setProperty('--accent-base', color);
    root.style.setProperty(
      '--accent-soft',
      `color-mix(in srgb, ${color} 16%, var(--background))`
    );
    root.style.setProperty('--on-accent', textColor);
  } else {
    CUSTOM_ACCENT_TOKENS.forEach((token) => root.style.removeProperty(token));
  }
}
