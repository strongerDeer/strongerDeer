import { ButtonLink } from '@/components/common/ButtonLink';

export function StrongerDeer() {
  return (
    <section
      id='stronger-deer'
      aria-labelledby='hero-title'
      className='px-4 text-center'
    >
      <div className='relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center gap-5 py-10'>
        <p className='text-[clamp(28px,6vw,48px)] font-bold tracking-tight'>
          strongerDeer
        </p>
        <h1
          id='hero-title'
          aria-label='조금씩 강해진 개발자, 강혜진입니다.'
          className='text-[clamp(44px,10vw,104px)] leading-[1.1] font-black tracking-[-0.04em]'
        >
          <span aria-hidden='true'>
            강<span className='text-accent'>혜</span>진 개발자.
          </span>
        </h1>
        <div className='mt-2 flex flex-wrap justify-center gap-2.5'>
          <ButtonLink href='#balance-game' variant='solid'>
            밸런스 게임 시작
          </ButtonLink>
          <ButtonLink href='#shop'>장바구니 담으러 가기</ButtonLink>
        </div>
        <span
          aria-hidden='true'
          className='absolute inset-x-0 bottom-[8%] font-mono text-sm text-foreground-muted tabular-nums'
        >
          font-weight: <b className='text-foreground'>900</b>;
        </span>
      </div>
    </section>
  );
}
