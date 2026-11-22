import Image from 'next/image';

import { Button } from '@/components/common/Button';
import logo from '@/public/strongerDeer.svg';

export function Footer() {
  return (
    <footer className='border-t border-line'>
      {/* pb-24: 오른쪽 아래 플로팅 버튼이 맨 아래 내용을 덮지 않게 비워 둠 */}
      <div className='mx-auto flex w-full max-w-page flex-wrap items-center justify-between gap-2 px-6 pt-10 pb-24 text-sm text-foreground-muted'>
        <p>
          <Image src={logo} alt='strongerDeer' className='h-5 w-auto' />
        </p>
        {/* Hero와 같은 색 규칙: {sign || velop}만 강조색 */}
        <p>
          <code>
            De<span className='text-accent'>{'{sign || velop}'}</span>er
          </code>
        </p>
        {/* 자리 표시: 9~10일차에 플로팅 버튼 컴포넌트로 분리 */}
        <Button variant='solid' size='sm' className='fixed right-6 bottom-12'>
          내 방문 기록
        </Button>
      </div>
    </footer>
  );
}
