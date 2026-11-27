import { DEFAULT_SETTINGS, DisplaySettings } from '@/data/displaySettings';
import { applyDisplaySettings } from '@/lib/applyDisplaySettings';

// 화면 설정을 이 기기(localStorage)에 저장하고, 바뀌면 구독한 컴포넌트에 알린다.
// React 바깥 저장소라서 컴포넌트는 useSyncExternalStore로 읽는다

// <head> 스크립트(displaySettingsScript.ts)도 같은 키로 읽는다
export const STORAGE_KEY = 'display-settings';

// 브라우저에서 처음 읽을 때 채운다. 같은 값이면 같은 객체를 돌려줘야 React가 무한 렌더하지 않는다
let currentSettings: DisplaySettings | null = null;
const listeners = new Set<() => void>();

// 저장된 설정이 없을 때 기본값. 대비는 OS의 '대비 증가' 설정을 따른다
function getSystemDefaults(): DisplaySettings {
  const prefersHighContrast = window.matchMedia(
    '(prefers-contrast: more)'
  ).matches;
  return {
    ...DEFAULT_SETTINGS,
    contrast: prefersHighContrast ? 'high' : 'normal',
  };
}

function readSavedSettings(): DisplaySettings {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    // 저장 뒤에 설정 항목이 늘어나도 빠진 키는 기본값으로 채운다
    if (saved) return { ...getSystemDefaults(), ...JSON.parse(saved) };
  } catch {
    // 시크릿 창·저장 차단이면 읽기가 실패할 수 있다 → 기본값
  }
  return getSystemDefaults();
}

function notify() {
  listeners.forEach((listener) => listener());
}

export function subscribeSettings(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSettings(): DisplaySettings {
  if (!currentSettings) currentSettings = readSavedSettings();
  return currentSettings;
}

// 서버에는 localStorage가 없으니 기본값으로 그린다. 하이드레이션 뒤에 저장된 값으로 바뀐다
export function getServerSettings(): DisplaySettings {
  return DEFAULT_SETTINGS;
}

export function updateSettings(nextSettings: DisplaySettings) {
  currentSettings = nextSettings;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSettings));
  } catch {
    // 저장이 막혀도 이번 방문 동안은 바뀐 설정 그대로 쓴다
  }
  applyDisplaySettings(nextSettings);
  notify();
}

export function resetSettings() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // 지울 수 없어도 화면은 처음 설정으로 돌린다
  }
  currentSettings = getSystemDefaults();
  applyDisplaySettings(currentSettings);
  notify();
}
