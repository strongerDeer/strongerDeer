'use client';

import {
  Children,
  type ReactNode,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from 'react';

import { useScrollFrame } from '@/hooks/useScrollFrame';
import { clamp01, ease, prefersReducedMotion } from '@/lib/motion';

// 카드 한 장이 올라와 쌓이는 데 드는 스크롤 (화면 높이의 0.75배)
const SCROLL_PER_CARD = 0.75;
// 마지막 카드가 다 올라온 뒤 잠깐 머무는 여유 스크롤 (카드 한 장 분량의 0.4배)
const END_PAUSE = 0.4;
// 위에 한 장 덮일 때마다 아래 카드가 위로 밀리는 거리·작아지는 비율
const STACK_LIFT_PX = 14;
const STACK_SCALE_STEP = 0.045;
// 올라올 카드가 출발하는 곳: 카드 칸 아래 끝에서 40px 더 아래 (화면 밖)
const RISE_START_GAP_PX = 40;
// 무대 안에서 카드가 쓸 수 없는 세로 여백 (무대 위아래 py-5 + 카드 위 pt-8)
const STAGE_SPACING_PX = 40 + 32;

// stack: 섹션이 화면에 멈추고 카드가 한 장씩 올라와 쌓임
// flat: 그냥 차례로 놓음 (첫 렌더·동작 줄이기·카드가 화면보다 큰 작은 화면)
type Layout = 'stack' | 'flat';

export function CardDeck({ children }: { children: ReactNode }) {
  const cards = Children.toArray(children);
  const [layout, setLayout] = useState<Layout>('flat');

  const scrollBoxRef = useRef<HTMLDivElement>(null); // 스크롤 길이를 만드는 바깥 상자
  const stageRef = useRef<HTMLDivElement>(null); // 화면에 멈춰 있는 무대
  const deckRef = useRef<HTMLDivElement>(null); // 카드가 겹쳐 놓이는 칸
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 쌓을지 펼칠지 정한다. 카드 높이가 바뀌거나(설정 변경·글꼴) 창 크기가 바뀌면 다시 판단
  useEffect(() => {
    const decideLayout = () => {
      const headerHeight = document.querySelector('header')?.offsetHeight ?? 0;
      const availableHeight =
        window.innerHeight - headerHeight - STAGE_SPACING_PX;
      const tallestCard = Math.max(
        ...cardRefs.current.map(
          (card) => card?.firstElementChild?.scrollHeight ?? 0
        )
      );
      const fitsOnScreen = tallestCard <= availableHeight;
      setLayout(!prefersReducedMotion() && fitsOnScreen ? 'stack' : 'flat');
    };

    const observer = new ResizeObserver(decideLayout);
    cardRefs.current.forEach((card) => card && observer.observe(card));
    window.addEventListener('resize', decideLayout);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', decideLayout);
    };
  }, []);

  // 스크롤 위치에 맞춰 카드마다 위치·크기·어둡기를 정한다
  function placeCards() {
    const scrollBox = scrollBoxRef.current;
    const stage = stageRef.current;
    const deck = deckRef.current;
    if (layout !== 'stack' || !scrollBox || !stage || !deck) return;

    const scrollPerCard = window.innerHeight * SCROLL_PER_CARD;
    const lastIndex = cards.length - 1;

    // 무대가 머무는 동안 스크롤할 길이 = 무대 높이 + 카드 넘기는 거리
    scrollBox.style.height = `${stage.offsetHeight + scrollPerCard * (lastIndex + END_PAUSE)}px`;

    // 무대가 멈춘 뒤 얼마나 내렸는지 → 0 ~ lastIndex (1이면 두 번째 카드가 다 올라옴)
    const stickyTop = parseFloat(getComputedStyle(stage).top);
    const scrolled = stickyTop - scrollBox.getBoundingClientRect().top;
    const progress = Math.min(lastIndex, Math.max(0, scrolled / scrollPerCard));

    // 카드마다 올라온 정도 (0 = 아직 아래, 1 = 제자리). 첫 카드는 처음부터 제자리
    const enterAmounts = cards.map((_, index) =>
      index === 0 ? 1 : ease(clamp01(progress - (index - 1)))
    );
    const riseDistance = deck.clientHeight + RISE_START_GAP_PX;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      // 내 위에 몇 장이 덮였는지 (0 ~ ). 덮일수록 위로 밀리고 작아지고 어두워진다
      const coveredBy = enterAmounts
        .slice(index + 1)
        .reduce((sum, amount) => sum + amount, 0);
      const y =
        (1 - enterAmounts[index]) * riseDistance - coveredBy * STACK_LIFT_PX;
      const scale = 1 - coveredBy * STACK_SCALE_STEP;
      card.style.transform = `translateY(${y.toFixed(1)}px) scale(${scale.toFixed(4)})`;
      card.style.setProperty('--covered', coveredBy.toFixed(3));
    });
  }

  // 펼침으로 바뀌면 스크롤로 넣었던 높이·위치를 지운다
  function clearStack() {
    if (scrollBoxRef.current) scrollBoxRef.current.style.height = '';
    cardRefs.current.forEach((card) => {
      card?.style.removeProperty('transform');
      card?.style.removeProperty('--covered');
    });
  }

  useScrollFrame(placeCards);

  // 쌓기로 바뀐 순간엔 스크롤이 없어도 바로 한 번 그려야 해서 effect에서 부른다.
  // useEffectEvent: 최신 layout·카드를 읽되, 이 함수 때문에 effect가 다시 돌지는 않게
  const onLayoutChange = useEffectEvent((nextLayout: Layout) => {
    if (nextLayout === 'stack') placeCards();
    else clearStack();
  });
  useEffect(() => {
    onLayoutChange(layout);
  }, [layout]);

  const isStack = layout === 'stack';

  return (
    <div ref={scrollBoxRef} data-layout={layout} className='relative'>
      <div
        ref={stageRef}
        className={
          isStack
            ? 'sticky top-(--header-h) flex h-[calc(100svh-var(--header-h))] flex-col overflow-clip py-5'
            : ''
        }
      >
        <div
          ref={deckRef}
          className={
            isStack
              ? 'grid min-h-0 flex-1 content-start pt-8'
              : 'flex flex-col gap-6'
          }
        >
          {cards.map((card, index) => (
            <div
              key={index}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              // 쌓기: 모든 카드를 같은 칸에 겹쳐 놓는다. 덮인 만큼 어둡게 (::after 덮개)
              className={`relative mx-auto grid w-full max-w-4xl origin-top ${
                isStack
                  ? '[grid-area:1/1] after:pointer-events-none after:absolute after:inset-0 after:rounded-3xl after:bg-foreground after:opacity-[calc(var(--covered,0)*0.06)]'
                  : ''
              }`}
            >
              {card}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
