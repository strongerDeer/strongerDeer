import { AccentId } from '@/data/accents';

export type Theme = 'system' | 'light' | 'dark';
export type Contrast = 'normal' | 'high';
export type FontId = 'sans' | 'serif' | 'system';

// 화면 설정 한 묶음. 키 이름이 그대로 <html data-키="값"> 속성 이름이 된다
export type DisplaySettings = {
  theme: Theme;
  contrast: Contrast;
  accent: AccentId;
  font: FontId;
};

export const DEFAULT_SETTINGS: DisplaySettings = {
  theme: 'system',
  contrast: 'normal',
  accent: 'purple',
  font: 'sans',
};

export type Option<T extends string> = { value: T; label: string };

export const THEME_OPTIONS: Option<Theme>[] = [
  { value: 'system', label: '시스템' },
  { value: 'light', label: '라이트' },
  { value: 'dark', label: '다크' },
];

export const CONTRAST_OPTIONS: Option<Contrast>[] = [
  { value: 'normal', label: '기본' },
  { value: 'high', label: '고대비' },
];

export const FONT_OPTIONS: Option<FontId>[] = [
  { value: 'sans', label: '고딕' },
  { value: 'serif', label: '명조' },
  { value: 'system', label: '기기 기본' },
];
