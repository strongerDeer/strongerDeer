import { Button } from '@/components/common/Button';

export function Header() {
  return (
    <header className='border-b border-line'>
      <div className='mx-auto flex w-full max-w-page items-center justify-between px-4 py-2'>
        strongerDeer
        <Button size='sm'>포트폴리오 PDF</Button>
      </div>
    </header>
  );
}
