import { ButtonLink } from '@/components/common/ButtonLink';

export function StrongerDeer() {
  return (
    <section id='stronger-deer' className='text-center'>
      <h1>StrongerDeer</h1>
      <p>조금씩</p>
      <p>강해진 개발자.</p>
      <div className='mt-4 flex justify-center gap-2'>
        <ButtonLink variant='solid' href='#balance-game'>
          밸런스 게임 시작
        </ButtonLink>
        <ButtonLink href='#shop'>장바구니 담으러 가기</ButtonLink>
      </div>

      <code>
        font-weight: <span className='font-black'>900</span>;
      </code>
    </section>
  );
}
