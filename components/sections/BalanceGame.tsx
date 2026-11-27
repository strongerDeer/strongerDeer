'use client';

import { useRef, useState } from 'react';

import { Button } from '@/components/common/Button';
import { Section } from '@/components/common/Section';
import { BalanceResult } from '@/components/sections/balance/BalanceResult';
import { ChoiceCard } from '@/components/sections/balance/ChoiceCard';
import { type Choice, GAMES } from '@/data/games';

// 모든 문항을 "아직 안 고름(null)" 상태로
function createEmptyAnswers(): (Choice | null)[] {
  return GAMES.map(() => null);
}

export function BalanceGame() {
  // 지금 보고 있는 문항 번호 (0부터)
  const [currentIndex, setCurrentIndex] = useState(0);
  // 마지막 문항에서 "결과 보기"를 누르면 true
  const [isResultOpen, setIsResultOpen] = useState(false);
  // 문항마다 고른 답. 아직 안 고른 문항은 null
  const [answers, setAnswers] = useState(createEmptyAnswers);
  // 결과가 열리거나 다시 시작할 때, 화면을 게임 상자 맨 위로 맞추는 데 씀
  const gameBoxRef = useRef<HTMLDivElement>(null);

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

  // 상자는 결과 화면·문항 화면 모두에 그대로 있어서, 렌더 전에 바로 옮겨도 된다
  function moveToGameBox() {
    const box = gameBoxRef.current;
    if (!box) return;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    box.scrollIntoView({
      block: 'start',
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
    // 누른 버튼이 사라지므로 키보드 포커스를 상자로 옮긴다
    box.focus({ preventScroll: true });
  }

  function goNext() {
    if (isLastGame) {
      setIsResultOpen(true);
      moveToGameBox();
      return;
    }
    setCurrentIndex((index) => index + 1);
  }

  function restart() {
    setAnswers(createEmptyAnswers());
    setCurrentIndex(0);
    setIsResultOpen(false);
    moveToGameBox();
  }

  return (
    <Section
      id='balance-game'
      label='밸런스 게임'
      title='몇 개의 취향이 저와 겹칠까요?'
      description='재미로 보는 밸런스 게임. 끌리는 쪽을 고르면 마지막에 제 선택과 비교해 드려요. 고른 답은 언제든 바꿀 수 있어요.'
    >
      <div
        ref={gameBoxRef}
        tabIndex={-1}
        className='mx-auto mt-8 max-w-4xl scroll-mt-20 rounded-panel bg-background-soft px-[max(16px,4vw)] py-7 text-left outline-none'
      >
        {isResultOpen ? (
          <BalanceResult answers={answers} onRestart={restart} />
        ) : (
          <>
            <div className='mb-3 flex items-center justify-between text-sm text-foreground-muted tabular-nums'>
              <span>
                {currentIndex + 1} / {GAMES.length}
              </span>
              <span>{pickedCount}개 골랐어요</span>
            </div>
            <div className='mb-6 h-1.5 overflow-hidden rounded-pill bg-line'>
              <div
                className='h-full bg-accent transition-[width] duration-300'
                style={{ width: `${(pickedCount / GAMES.length) * 100}%` }}
              />
            </div>

            <fieldset>
              <legend className='mb-4 w-full text-center font-bold text-foreground-muted'>
                Feat. {title}
              </legend>

              {/* 모바일도 두 카드를 나란히: 위아래로 쌓으면 한 화면에 둘 다 안 보여서 비교가 안 된다 */}
              <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-1.5 sm:gap-4'>
                <ChoiceCard
                  gameId={id}
                  side='a'
                  card={a}
                  checked={answers[currentIndex] === 'a'}
                  onPick={pick}
                />
                <span
                  aria-hidden='true'
                  className='px-[0.12em] text-center text-[26px] leading-none font-black tracking-[-0.06em] italic sm:text-6xl'
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
                disabled={!hasPickedCurrent}
                onClick={goNext}
                className='disabled:opacity-40'
              >
                {isLastGame ? '결과 보기' : '다음'}
              </Button>
            </div>
          </>
        )}
      </div>
    </Section>
  );
}
