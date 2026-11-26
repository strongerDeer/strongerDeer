import Image from 'next/image';

import { ButtonLink } from '@/components/common/ButtonLink';
import { type Choice, GAMES } from '@/data/games';
import { asset } from '@/lib/asset';

type BalanceResultProps = {
  answers: (Choice | null)[];
};

// 겹친 비율이 이 값 이상이면 해당 문구 (위에서부터 차례로 확인)
const RESULT_MESSAGES = [
  { minRatio: 1, text: '혹시 저세요? 점심 단골집 같이 가요.' },
  { minRatio: 0.66, text: '꽤 겹치네요. 노동요 플레이리스트 공유해 주세요.' },
  {
    minRatio: 0.34,
    text: '반반이네요. 서로 취향 소개하며 친해지기 딱 좋아요.',
  },
  { minRatio: 0, text: '정반대! 그래서 더 궁금해요.' },
];

function pickResultMessage(sameRatio: number) {
  const matched = RESULT_MESSAGES.find(
    (message) => sameRatio >= message.minRatio
  );
  return matched?.text ?? '';
}

export function BalanceResult({ answers }: BalanceResultProps) {
  const differentGames = GAMES.filter(
    (game, index) => answers[index] !== game.hj
  );
  const sameCount = GAMES.length - differentGames.length;
  const message = pickResultMessage(sameCount / GAMES.length);

  return (
    <div>
      <div className='flex flex-col items-center gap-3.5 text-center'>
        <p className='text-[clamp(2rem,7vw,3.25rem)] font-black tracking-tight tabular-nums'>
          {GAMES.length}개 중{' '}
          <em className='text-accent not-italic'>{sameCount}개</em> 겹쳤어요
        </p>
        <p className='text-lg'>{message}</p>
        <ButtonLink href='#contact' variant='solid' className='mt-1'>
          결과 들고 인사하기
        </ButtonLink>
      </div>

      {differentGames.length > 0 ? (
        <>
          <p className='mt-8 text-center font-bold text-foreground-muted'>
            저는 반대를 골랐던 {differentGames.length}개, 이유는요
          </p>
          <ol className='mt-3 grid gap-3'>
            {differentGames.map((game) => (
              <li
                key={game.id}
                className='grid grid-cols-[auto_1fr] items-start gap-3 rounded-2xl border border-line bg-background-card px-4 py-3.5'
              >
                <Image
                  src={asset(
                    `/images/balance/balance-${game[game.hj].image}.webp`
                  )}
                  alt=''
                  width={72}
                  height={54}
                  className='h-13.5 w-18 rounded-lg object-cover'
                />
                <div className='min-w-0'>
                  <p className='text-sm font-bold text-foreground-muted'>
                    {game.title}
                  </p>
                  <p className='mt-0.5'>{game.talk}</p>
                </div>
              </li>
            ))}
          </ol>
        </>
      ) : (
        <p className='mt-8 text-center font-bold text-foreground-muted'>
          전부 겹쳤어요. 이유까지 같을지 궁금하네요!
        </p>
      )}
    </div>
  );
}
