import { DEFAULT_SETTINGS } from '@/data/displaySettings';
import { STORAGE_KEY } from '@/lib/displaySettingsStore';

// 새로고침 깜빡임 막기: React보다 먼저, 화면을 그리기 전에 <head>에서 실행된다.
// 저장된 설정을 읽어 <html data-*>를 붙여 두면 첫 화면부터 고른 테마로 그려진다.
// 문자열로 그대로 들어가는 코드라 import를 쓸 수 없어서, 값은 밖에서 넣어 준다
export const DISPLAY_SETTINGS_SCRIPT = `
(function () {
  var defaults = ${JSON.stringify(DEFAULT_SETTINGS)};
  try {
    var settings = Object.assign({}, defaults, {
      contrast: matchMedia('(prefers-contrast: more)').matches ? 'high' : 'normal'
    });
    var saved = localStorage.getItem('${STORAGE_KEY}');
    if (saved) Object.assign(settings, JSON.parse(saved));
    for (var key in defaults) {
      if (settings[key] !== defaults[key]) {
        document.documentElement.setAttribute('data-' + key, settings[key]);
      }
    }
  } catch (error) {}
})();
`;
