import Image from 'next/image';

import { Button } from '@/components/common/Button';
import logo from '@/public/strongerDeer.svg';

export function Footer() {
  return (
    <footer className='border-t border-line'>
      <div className='mx-auto flex w-full max-w-page flex-wrap items-center justify-between gap-2 px-4 pt-10 pb-24 text-sm text-foreground-muted'>
        <p>
          <Image src={logo} alt='strongerDeer' className='h-5 w-auto' />
        </p>
        <p>
          <code>
            De<span className='text-accent'>{'{sign || velop}'}</span>er
          </code>
        </p>
        <Button variant='solid' size='sm' className='fixed right-4 bottom-4'>
          내 방문 기록
        </Button>
      </div>
    </footer>
  );
}
