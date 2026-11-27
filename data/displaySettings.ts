import { AccentId } from '@/data/accents';

export type Theme = 'system' | 'light' | 'dark';
export type Contrast = 'normal' | 'high';
export type FontId = 'sans' | 'serif' | 'system';

// 직접 고른 강조색. 글자색은 고를 때 계산해 같이 저장한다
// (새로고침 직후 head 스크립트가 계산 없이 바로 쓸 수 있게)
export type CustomAccent = { color: string; textColor: string };

export type DisplaySettings = {
  theme: Theme;
  contrast: Contrast;
  accent: AccentId | 'custom';
  font: FontId;
  customAccent: CustomAccent;
  // 모서리 둥글기 배율 (0 = 각짐, 1 = 기본, 2 = 두 배)
  radiusScale: number;
};

export const RADIUS_SCALE_RANGE = { min: 0, max: 2, step: 0.1 };

// <html data-키="값"> 속성이 되는 설정들
export const DATA_ATTRIBUTE_KEYS = [
  'theme',
  'contrast',
  'accent',
  'font',
] as const;

export const DEFAULT_SETTINGS: DisplaySettings = {
  theme: 'system',
  contrast: 'normal',
  accent: 'purple',
  font: 'sans',
  customAccent: { color: '#615ef0', textColor: '#ffffff' },
  radiusScale: 1,
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
