'use client';

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
// 움직임은 globals.css의 .hj-* 규칙이 data-face를 보고 정한다
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
    </span>
  );
}
