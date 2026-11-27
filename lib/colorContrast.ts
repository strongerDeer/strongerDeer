// WCAG 대비율 계산. 강조색 위 글자색 고르기와 '배경 대비' 안내에 쓴다
// 공식은 WCAG 2.x 정의(상대 휘도·대비율)를 그대로 옮김: https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio

type Rgb = [number, number, number];

const WHITE: Rgb = [255, 255, 255];
const DARK_TEXT: Rgb = [17, 17, 17];

export const WHITE_TEXT_COLOR = '#ffffff';
export const DARK_TEXT_COLOR = '#111111';

// 작은 글자까지 읽히는 WCAG AA 기준
export const MIN_TEXT_CONTRAST = 4.5;

export function hexToRgb(hex: string): Rgb {
  const value = hex.replace('#', '');
  return [0, 2, 4].map((start) =>
    parseInt(value.slice(start, start + 2), 16)
  ) as Rgb;
}

// 사람 눈은 어두운 쪽 차이에 더 민감해서, 화면 값(0~255)을 실제 빛의 양으로 바꿔 계산한다
function toLinear(channel: number) {
  const ratio = channel / 255;
  return ratio <= 0.03928 ? ratio / 12.92 : ((ratio + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance([red, green, blue]: Rgb) {
  return (
    0.2126 * toLinear(red) + 0.7152 * toLinear(green) + 0.0722 * toLinear(blue)
  );
}

// 1:1(같은 색) ~ 21:1(흰 바탕 검정 글자)
export function contrastRatio(first: Rgb, second: Rgb) {
  const [lighter, darker] = [
    relativeLuminance(first),
    relativeLuminance(second),
  ].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

// 강조색 위 글자는 흰색·검정 중 대비가 더 큰 쪽으로
export function pickTextColor(backgroundHex: string) {
  const background = hexToRgb(backgroundHex);
  return contrastRatio(background, WHITE) >=
    contrastRatio(background, DARK_TEXT)
    ? WHITE_TEXT_COLOR
    : DARK_TEXT_COLOR;
}

// CSS 변수가 실제로 칠하는 색을 읽는다.
// 고대비의 color-mix처럼 '식'인 값도 있어서, 요소에 칠해 본 뒤 1px 캔버스로 RGB를 뽑는다
function readPaintedColor(variableName: string): Rgb {
  const probe = document.createElement('span');
  probe.style.color = `var(${variableName})`;
  document.body.appendChild(probe);
  const computedColor = getComputedStyle(probe).color;
  probe.remove();

  const context = document.createElement('canvas').getContext('2d');
  if (!context) return WHITE;
  context.fillStyle = computedColor;
  context.fillRect(0, 0, 1, 1);
  const [red, green, blue] = context.getImageData(0, 0, 1, 1).data;
  return [red, green, blue];
}

export function measureAccentContrast() {
  return contrastRatio(
    readPaintedColor('--accent'),
    readPaintedColor('--background')
  );
}
