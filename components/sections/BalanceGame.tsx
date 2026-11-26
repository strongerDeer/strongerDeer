'use client';

import { useState } from 'react';

import { Button } from '@/components/common/Button';
import { Section } from '@/components/common/Section';
import { ChoiceCard } from '@/components/sections/balance/ChoiceCard';
import { type Choice, GAMES } from '@/data/games';

export function BalanceGame() {
  // 지금 보고 있는 문항 번호 (0부터)
  const [currentIndex, setCurrentIndex] = useState(0);
  // 문항마다 고른 답. 아직 안 고른 문항은 null
  const [answers, setAnswers] = useState<(Choice | null)[]>(() =>
    GAMES.map(() => null)
  );

  const { id, title, a, b } = GAMES[currentIndex];
  const pickedCount = answers.filter((answer) => answer !== null).length;
  const isFirstGame = currentIndex === 0;
  const isLastGame = currentIndex === GAMES.length - 1;
  const hasPickedCurrent = answers[currentIndex] !== null;

  function pick(choice: Choice) {
    setAnswers((prev) =>
      prev.map((answer, index) => (index === currentIndex ? choice : answer))
    );
  }

  function goPrev() {
    setCurrentIndex((index) => index - 1);
  }

  function goNext() {
    setCurrentIndex((index) => index + 1);
  }

  return (
    <Section
      id='balance-game'
      label='밸런스 게임'
      title='몇 개의 취향이 저와 겹칠까요?'
      description='재미로 보는 밸런스 게임. 끌리는 쪽을 고르면 마지막에 제 선택과 비교해 드려요. 고른 답은 언제든 바꿀 수 있어요.'
    >
      <div className='mx-auto mt-8 max-w-4xl rounded-[28px] bg-background-soft px-[max(16px,4vw)] py-7 text-left'>
        <div className='mb-3 flex items-center justify-between text-sm text-foreground-muted tabular-nums'>
          <span>
            {currentIndex + 1} / {GAMES.length}
          </span>
          <span>{pickedCount}개 골랐어요</span>
        </div>
        <div className='mb-6 h-1.5 overflow-hidden rounded-full bg-line'>
          <div
            className='h-full bg-accent transition-[width] duration-300'
            style={{ width: `${(pickedCount / GAMES.length) * 100}%` }}
          />
        </div>

        <fieldset>
          <legend className='mb-4 w-full text-center font-bold text-foreground-muted'>
            Feat. {title}
          </legend>

          <div className='grid grid-cols-1 items-center gap-3 sm:grid-cols-[1fr_auto_1fr] sm:gap-4'>
            <ChoiceCard
              gameId={id}
              side='a'
              card={a}
              checked={answers[currentIndex] === 'a'}
              onPick={pick}
            />
            <span
              aria-hidden='true'
              className='px-[0.12em] text-center text-[44px] leading-none font-black tracking-[-0.06em] italic sm:text-6xl'
            >
              <span className='text-info'>V</span>
              <span className='text-accent'>S</span>
            </span>
            <ChoiceCard
              gameId={id}
              side='b'
              card={b}
              checked={answers[currentIndex] === 'b'}
              onPick={pick}
            />
          </div>
        </fieldset>

        <div className='mt-6 flex flex-wrap justify-between gap-2.5'>
          <Button
            size='sm'
            disabled={isFirstGame}
            onClick={goPrev}
            className='disabled:opacity-40'
          >
            이전
          </Button>
          <Button
            variant='solid'
            size='sm'
            disabled={!hasPickedCurrent || isLastGame}
            onClick={goNext}
            className='disabled:opacity-40'
          >
            {isLastGame ? '결과 보기' : '다음'}
          </Button>
        </div>
      </div>
    </Section>
  );
}
