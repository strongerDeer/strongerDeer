import Image from 'next/image';

import type { Game } from '@/data/games';
import { asset } from '@/lib/asset';

type ChoiceCardProps = {
  gameId: string;
  side: 'a' | 'b';
  card: Game['a'];
};

const sideClass = {
  a: 'bg-info-soft text-info',
  b: 'bg-accent-soft text-accent',
};

const tiltClass = {
  a: '-rotate-[1.5deg]',
  b: 'rotate-[1.5deg]',
};

const pinColor = {
  a: { dark: '#2f5fb8', light: '#5b8def' },
  b: { dark: '#4f4bd6', light: '#8f8cff' },
};

function Pin({ side }: { side: 'a' | 'b' }) {
  const { dark, light } = pinColor[side];
  return (
    <svg
      aria-hidden='true'
      viewBox='0 0 44 44'
      className='absolute -top-4 left-3.5 size-9.5 drop-shadow-[0_2px_2px_rgba(0,0,0,0.12)] sm:left-1/2 sm:-translate-x-1/2'
    >
      <ellipse cx='26' cy='27' rx='13' ry='11' fill='rgba(30,30,60,.16)' />
      <circle cx='21' cy='21' r='12' fill={dark} />
      <circle
        cx='20'
        cy='19'
        r='11.5'
        fill={light}
        stroke={dark}
        strokeWidth='1.6'
      />
      <circle cx='20' cy='19' r='5' fill={dark} opacity='.35' />
      <ellipse
        cx='15.5'
        cy='13.5'
        rx='4'
        ry='2.6'
        fill='rgba(255,255,255,.75)'
        transform='rotate(-35 15.5 13.5)'
      />
    </svg>
  );
}

export function ChoiceCard({ gameId, side, card }: ChoiceCardProps) {
  const inputId = `game-${gameId}-${side}`;

  return (
    <div>
      <input
        type='radio'
        name={`game-${gameId}`}
        id={inputId}
        className='peer sr-only'
      />
      <label
        htmlFor={inputId}
        className={`relative flex min-h-55 cursor-pointer flex-col items-center justify-center gap-3 rounded-[20px] border-2 border-line bg-background-card px-4 pt-7 pb-5 text-center shadow-card transition-transform ${tiltClass[side]} peer-checked:scale-[1.02] peer-checked:rotate-0 peer-checked:border-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:-translate-y-1 hover:rotate-0`}
      >
        <Pin side={side} />
        <Image
          src={asset(`/images/balance/balance-${card.image}.webp`)}
          alt=''
          width={600}
          height={450}
          className='aspect-4/3 h-auto w-full max-w-65 rounded-xl object-cover'
        />
        <span className='text-lg leading-snug font-bold'>{card.text}</span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${sideClass[side]}`}
        >
          {side.toUpperCase()}
        </span>
      </label>
    </div>
  );
}
