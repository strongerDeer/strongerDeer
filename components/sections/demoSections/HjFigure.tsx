'use client';

import { Lightbulb, Music, Music2 } from 'lucide-react';
import type { CSSProperties } from 'react';
import { preload } from 'react-dom';

import { asset } from '@/lib/asset';

export type HjFace = 'focus' | 'idea' | 'smile';

// 세 그림은 같은 자세에 표정만 다르다
const FACE_IMAGES: Record<HjFace, string> = {
  focus: asset('/images/hj/hj-01-focus.webp'),
  idea: asset('/images/hj/hj-02-idea.webp'),
  smile: asset('/images/hj/hj-03-smile.webp'),
};

type HjFigureProps = {
  face: HjFace;
};

// 같은 그림을 4장 겹쳐 놓고, 얼굴·손 자리만 마스크로 잘라 따로 움직인다
// 움직임과 전구·음표는 globals.css의 .hj-* 규칙이 data-face를 보고 정한다
export function HjFigure({ face }: HjFigureProps) {
  // 표정이 바뀌는 순간 빈 화면이 보이지 않게 세 그림을 미리 받아 둔다
  Object.values(FACE_IMAGES).forEach((src) => preload(src, { as: 'image' }));

  const imageStyle = {
    '--hj-image': `url(${FACE_IMAGES[face]})`,
  } as CSSProperties;

  return (
    <span
      aria-hidden='true'
      data-face={face}
      className='hj-figure'
      style={imageStyle}
    >
      <i className='hj-layer' />
      <i className='hj-layer hj-head' />
      <i className='hj-layer hj-hand-left' />
      <i className='hj-layer hj-hand-right' />

      {/* 아이디어 표정일 때 머리 위 전구 */}
      <span className='hj-bulb'>
        <BulbRays />
        <Lightbulb className='hj-bulb-icon' />
      </span>
      {/* 노래 표정일 때 이어폰 쪽에서 음표가 하나씩 떠오름 */}
      <Music className='hj-note' />
      <Music2 className='hj-note hj-note-2' />
      <Music className='hj-note hj-note-3' />
    </span>
  );
}

// 전구 위로 퍼지는 짧은 선 3개 (왼쪽 위 → 위 → 오른쪽 위)
// 전구 아이콘(24×24)의 유리 부분 가운데(12, 9)를 중심으로, 사방 12px씩 여유를 둔 판에 그린다
function BulbRays() {
  return (
    <svg
      className='hj-bulb-rays'
      viewBox='-12 -12 48 48'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
    >
      <line x1='2.8' y1='-0.2' x2='0' y2='-3' />
      <line x1='12' y1='-4' x2='12' y2='-8' />
      <line x1='21.2' y1='-0.2' x2='24' y2='-3' />
    </svg>
  );
}
