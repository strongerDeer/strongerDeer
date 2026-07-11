import fs from "fs";

const W = 800;
const H = 600;

const palette = [
  [246, 247, 249],
  [255, 255, 255],
  [232, 236, 243],
  [212, 219, 230],
  [151, 161, 178],
  [45, 54, 69],
  [28, 34, 44],
  [65, 191, 116],
  [231, 249, 239],
  [77, 121, 255],
  [238, 243, 255],
  [236, 0, 168],
  [255, 236, 248],
  [255, 105, 132],
  [255, 201, 67],
  [136, 158, 255],
  [245, 247, 250],
  [120, 132, 150],
  [20, 130, 82],
  [226, 49, 83],
  [247, 250, 252],
  [110, 219, 150],
  [120, 160, 255],
  [250, 103, 204],
  [235, 239, 246],
  [180, 190, 205],
  [248, 250, 252],
  [0, 0, 0],
];

while (palette.length < 256) palette.push([0, 0, 0]);

const C = {
  bg: 0,
  white: 1,
  line: 2,
  lineDark: 3,
  muted: 4,
  text: 5,
  textDark: 6,
  green: 7,
  greenSoft: 8,
  blue: 9,
  blueSoft: 10,
  pink: 11,
  pinkSoft: 12,
  red: 13,
  yellow: 14,
  indigo: 15,
  panel: 16,
  subtext: 17,
  ok: 18,
  danger: 19,
  fill: 20,
  green2: 21,
  blue2: 22,
  pink2: 23,
  shadow: 24,
  shadowDark: 25,
  section: 26,
};

const FONT = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  C: ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  F: ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
  G: ["01111", "10000", "10000", "10111", "10001", "10001", "01111"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  J: ["00111", "00010", "00010", "00010", "10010", "10010", "01100"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  Q: ["01110", "10001", "10001", "10001", "10101", "10010", "01101"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  V: ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
  W: ["10001", "10001", "10001", "10101", "10101", "10101", "01010"],
  X: ["10001", "10001", "01010", "00100", "01010", "10001", "10001"],
  Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
  Z: ["11111", "00001", "00010", "00100", "01000", "10000", "11111"],
  0: ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
  1: ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
  2: ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
  3: ["11110", "00001", "00001", "01110", "00001", "00001", "11110"],
  4: ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
  5: ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
  6: ["00110", "01000", "10000", "11110", "10001", "10001", "01110"],
  7: ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
  8: ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
  9: ["01110", "10001", "10001", "01111", "00001", "00010", "01100"],
  ".": ["00000", "00000", "00000", "00000", "00000", "00110", "00110"],
  "+": ["00000", "00100", "00100", "11111", "00100", "00100", "00000"],
  "-": ["00000", "00000", "00000", "11111", "00000", "00000", "00000"],
  "/": ["00001", "00010", "00010", "00100", "01000", "01000", "10000"],
  "%": ["11001", "11010", "00010", "00100", "01000", "01011", "10011"],
  " ": ["00000", "00000", "00000", "00000", "00000", "00000", "00000"],
};

function makeCanvas() {
  return new Uint8Array(W * H).fill(C.bg);
}

function setPixel(img, x, y, color) {
  if (x >= 0 && x < W && y >= 0 && y < H) img[y * W + x] = color;
}

function rect(img, x, y, w, h, color) {
  const x0 = Math.max(0, x);
  const y0 = Math.max(0, y);
  const x1 = Math.min(W, x + w);
  const y1 = Math.min(H, y + h);
  for (let yy = y0; yy < y1; yy++) {
    img.fill(color, yy * W + x0, yy * W + x1);
  }
}

function roundRect(img, x, y, w, h, r, color) {
  if (r <= 0) return rect(img, x, y, w, h, color);
  for (let yy = y; yy < y + h; yy++) {
    for (let xx = x; xx < x + w; xx++) {
      const dx = xx < x + r ? x + r - xx : xx >= x + w - r ? xx - (x + w - r - 1) : 0;
      const dy = yy < y + r ? y + r - yy : yy >= y + h - r ? yy - (y + h - r - 1) : 0;
      if (dx * dx + dy * dy <= r * r) setPixel(img, xx, yy, color);
    }
  }
}

function borderRoundRect(img, x, y, w, h, r, color, bw = 2) {
  roundRect(img, x, y, w, h, r, color);
  roundRect(img, x + bw, y + bw, w - bw * 2, h - bw * 2, Math.max(0, r - bw), C.white);
}

function circle(img, cx, cy, r, color) {
  for (let y = cy - r; y <= cy + r; y++) {
    for (let x = cx - r; x <= cx + r; x++) {
      const dx = x - cx;
      const dy = y - cy;
      if (dx * dx + dy * dy <= r * r) setPixel(img, x, y, color);
    }
  }
}

function drawText(img, text, x, y, scale, color, align = "left") {
  const width = [...text].reduce((sum, ch) => sum + ((FONT[ch] ? 6 : 4) * scale), 0);
  let xx = align === "center" ? x - Math.floor(width / 2) : align === "right" ? x - width : x;
  for (const raw of text) {
    const ch = raw.toUpperCase();
    const glyph = FONT[ch] || FONT[" "];
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 5; col++) {
        if (glyph[row][col] === "1") {
          rect(img, xx + col * scale, y + row * scale, scale, scale, color);
        }
      }
    }
    xx += 6 * scale;
  }
}

function line(img, x, y, w, color, h = 2) {
  rect(img, x, y, w, h, color);
}

const themes = [
  { name: "TYPE A", primary: C.green, soft: C.greenSoft, tint: C.green2, radius: 16, price: C.green },
  { name: "TYPE B", primary: C.blue, soft: C.blueSoft, tint: C.blue2, radius: 0, price: C.blue },
  { name: "TYPE C", primary: C.pink, soft: C.pinkSoft, tint: C.pink2, radius: 18, price: C.pink },
];

function drawMiniImage(img, x, y, w, h, colorA, colorB, radius) {
  roundRect(img, x, y, w, h, radius, colorA);
  rect(img, x, y + Math.floor(h * 0.58), w, Math.ceil(h * 0.42), colorB);
  for (let i = 0; i < w; i += 12) {
    line(img, x + i, y + h - 14 - (i % 24), 18, C.white, 2);
  }
}

function drawUiFrame(theme) {
  const img = makeCanvas();

  drawText(img, "NDS", 400, 60, 8, C.textDark, "center");
  roundRect(img, 338, 105, 124, 22, 6, theme.soft);
  drawText(img, "DESIGN SYSTEM", 400, 111, 1, theme.primary, "center");

  roundRect(img, 68, 148, 664, 380, 22, C.shadow);
  roundRect(img, 80, 136, 640, 380, 18, C.white);
  rect(img, 80, 136, 640, 28, C.white);
  line(img, 80, 164, 640, C.line);
  circle(img, 100, 150, 4, C.red);
  circle(img, 116, 150, 4, C.yellow);
  circle(img, 132, 150, 4, theme.primary);
  drawText(img, "NDS THEME", 395, 146, 2, C.text, "center");
  roundRect(img, 628, 143, 70, 16, 5, theme.primary);
  drawText(img, theme.name, 663, 148, 1, C.white, "center");

  drawText(img, "DESIGN SYSTEM", 400, 190, 4, C.textDark, "center");
  drawText(img, "TOKENS COMPONENTS THEMES", 400, 226, 2, C.muted, "center");

  const r = theme.radius;
  borderRoundRect(img, 112, 265, 170, 72, r, C.lineDark);
  circle(img, 144, 301, 22, theme.primary);
  drawText(img, "AX LAB", 178, 286, 2, C.text);
  drawText(img, "TEAM CARD", 178, 310, 1, C.subtext);

  borderRoundRect(img, 112, 356, 170, 112, r, C.lineDark);
  drawText(img, "LOGIN", 134, 381, 2, C.textDark);
  borderRoundRect(img, 134, 412, 126, 26, Math.max(0, r - 6), C.lineDark, 1);
  drawText(img, "NAME", 151, 421, 1, C.muted);
  roundRect(img, 134, 447, 126, 20, Math.max(0, r - 8), theme.primary);
  drawText(img, "SUBMIT", 197, 454, 1, C.white, "center");

  borderRoundRect(img, 315, 265, 170, 92, r, C.lineDark);
  circle(img, 382, 291, 15, C.indigo);
  circle(img, 400, 291, 15, C.yellow);
  circle(img, 418, 291, 15, theme.primary);
  drawText(img, "TEAM EMPTY", 400, 326, 2, C.text, "center");
  roundRect(img, 370, 341, 60, 18, Math.max(0, r - 8), theme.primary);
  drawText(img, "INVITE", 400, 347, 1, C.white, "center");

  borderRoundRect(img, 315, 377, 170, 94, r, C.lineDark);
  drawText(img, "THUMBNAIL", 338, 398, 2, C.textDark);
  drawMiniImage(img, 338, 425, 34, 34, C.green2, C.blue2, Math.max(0, r - 8));
  drawMiniImage(img, 378, 425, 34, 34, C.blue2, theme.soft, Math.max(0, r - 8));
  roundRect(img, 418, 425, 34, 34, Math.max(0, r - 8), theme.soft);
  drawText(img, "+", 435, 433, 3, theme.primary, "center");

  borderRoundRect(img, 520, 265, 168, 206, r, C.lineDark);
  drawText(img, "PRODUCTS", 544, 292, 2, C.textDark);
  line(img, 544, 316, 118, C.lineDark, 1);
  const products = [
    ["CARDHOLDER", "17800"],
    ["TRADING", "11900"],
    ["KEYRING", "20900"],
  ];
  for (let i = 0; i < products.length; i++) {
    const yy = 335 + i * 44;
    drawMiniImage(img, 544, yy, 34, 34, i % 2 ? C.blue2 : C.green2, i % 2 ? C.green2 : C.yellow, Math.max(0, r - 10));
    drawText(img, products[i][0], 590, yy + 2, 1, C.textDark);
    drawText(img, "41%", 590, yy + 17, 1, C.danger);
    drawText(img, products[i][1], 622, yy + 17, 1, C.textDark);
    roundRect(img, 590, yy + 28, 36, 12, Math.max(0, r - 12), theme.soft);
    drawText(img, "TAG", 608, yy + 31, 1, theme.primary, "center");
  }

  const px = [566, 598, 630, 662];
  for (let i = 0; i < px.length; i++) {
    roundRect(img, px[i], 447, 24, 24, Math.max(0, r - 10), i === 0 ? C.textDark : C.white);
    if (i > 0) borderRoundRect(img, px[i], 447, 24, 24, Math.max(0, r - 10), C.lineDark, 1);
    drawText(img, String(i + 1), px[i] + 12, 455, 1, i === 0 ? C.white : C.subtext, "center");
  }

  for (let i = 0; i < 3; i++) {
    roundRect(img, 126 + i * 52, 492, 38, 8, 4, i === 0 ? theme.primary : C.lineDark);
  }
  drawText(img, "MULTI BRAND THEME TOKENS", 400, 494, 1, C.muted, "center");

  return img;
}

function writeShort(out, value) {
  out.push(value & 255, (value >> 8) & 255);
}

function writeSubBlocks(out, bytes) {
  for (let i = 0; i < bytes.length; i += 255) {
    const block = bytes.slice(i, i + 255);
    out.push(block.length, ...block);
  }
  out.push(0);
}

function lzwEncode(indices) {
  const minCodeSize = 8;
  const clearCode = 1 << minCodeSize;
  const eoiCode = clearCode + 1;
  let codeSize = minCodeSize + 1;
  let nextCode = eoiCode + 1;

  const bytes = [];
  let bitBuffer = 0;
  let bitCount = 0;

  function writeCode(code) {
    bitBuffer |= code << bitCount;
    bitCount += codeSize;
    while (bitCount >= 8) {
      bytes.push(bitBuffer & 255);
      bitBuffer >>= 8;
      bitCount -= 8;
    }
  }

  writeCode(clearCode);

  // Emit literal color indices and mirror the decoder's code-size growth.
  // This is less compact than dictionary compression, but very predictable
  // across GIF decoders and still small enough for an 800x600 thumbnail.
  let hasPreviousCode = false;
  for (const index of indices) {
    writeCode(index);
    if (hasPreviousCode) {
      nextCode++;
      if (nextCode === 1 << codeSize && codeSize < 12) codeSize++;
      if (nextCode >= 4096) {
        writeCode(clearCode);
        codeSize = minCodeSize + 1;
        nextCode = eoiCode + 1;
        hasPreviousCode = false;
        continue;
      }
    }
    hasPreviousCode = true;
  }

  writeCode(eoiCode);
  if (bitCount > 0) bytes.push(bitBuffer & 255);
  return bytes;
}

function encodeGif(frames) {
  const out = [];
  out.push(...Buffer.from("GIF89a", "ascii"));
  writeShort(out, W);
  writeShort(out, H);
  out.push(0xf7, C.bg, 0);
  for (const [r, g, b] of palette) out.push(r, g, b);

  out.push(0x21, 0xff, 0x0b, ...Buffer.from("NETSCAPE2.0", "ascii"), 0x03, 0x01);
  writeShort(out, 0);
  out.push(0);

  for (const frame of frames) {
    out.push(0x21, 0xf9, 0x04, 0x08);
    writeShort(out, 90);
    out.push(0, 0);
    out.push(0x2c);
    writeShort(out, 0);
    writeShort(out, 0);
    writeShort(out, W);
    writeShort(out, H);
    out.push(0);
    out.push(8);
    writeSubBlocks(out, lzwEncode(frame));
  }
  out.push(0x3b);
  return Buffer.from(out);
}

const frames = themes.map(drawUiFrame);
fs.writeFileSync("public/project_nds.gif", encodeGif(frames));
