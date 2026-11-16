import { Button } from '@/components/common/Button';

export function StrongerDeer() {
  return (
    <section id='stronger-deer' className='text-center'>
      <h1>StrongerDeer</h1>
      <p>조금씩</p>
      <p>강해진 개발자.</p>
      <div className='mt-4 flex justify-center gap-2'>
        <Button variant='solid'>밸런스 게임 시작</Button>
        <Button>장바구니 담으러 가기</Button>
      </div>
    </section>
  );
}
