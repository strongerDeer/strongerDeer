import { Button } from '@/components/common/Button';
import { Section } from '@/components/common/Section';
import { ChoiceCard } from '@/components/sections/balance/ChoiceCard';
import { GAMES } from '@/data/games';

export function BalanceGame() {
  // 정적 화면: 첫 문항만 그림. 몇 번째 문항인지·고른 개수는 5일차에 상태로
  const { id, title, a, b } = GAMES[0];
  const pickedCount = 0;

  return (
    <Section
      id='balance-game'
      label='밸런스 게임'
      title='몇 개의 취향이 저와 겹칠까요?'
      description='재미로 보는 밸런스 게임. 끌리는 쪽을 고르면 마지막에 제 선택과 비교해 드려요. 고른 답은 언제든 바꿀 수 있어요.'
    >
      <div className='mx-auto mt-8 max-w-4xl rounded-[28px] bg-background-soft px-[max(16px,4vw)] py-7 text-left'>
        {/* 진행 상황 */}
        <div className='mb-3 flex items-center justify-between text-sm text-foreground-muted tabular-nums'>
          <span>1 / {GAMES.length}</span>
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

          {/* 넓은 화면: A | VS | B 3칸, 좁은 화면: 세로로 쌓기 */}
          <div className='grid grid-cols-1 items-center gap-3 sm:grid-cols-[1fr_auto_1fr] sm:gap-4'>
            <ChoiceCard gameId={id} side='a' card={a} />
            <span
              aria-hidden='true'
              className='px-[0.12em] text-center text-[44px] leading-none font-black tracking-[-0.06em] italic sm:text-6xl'
            >
              <span className='text-info'>V</span>
              <span className='text-accent'>S</span>
            </span>
            <ChoiceCard gameId={id} side='b' card={b} />
          </div>
        </fieldset>

        <div className='mt-6 flex flex-wrap justify-between gap-2.5'>
          <Button size='sm' disabled className='disabled:opacity-40'>
            이전
          </Button>
          <Button variant='solid' size='sm'>
            다음
          </Button>
        </div>
      </div>
    </Section>
  );
}
