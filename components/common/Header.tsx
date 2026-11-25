import { Button } from '@/components/common/Button';

export function Header() {
  return (
    <header className='sticky top-0 z-30 h-(--header-h) border-b border-line bg-background'>
      <div className='mx-auto flex h-full w-full max-w-page items-center justify-between px-4'>
        strongerDeer
        <Button size='sm'>포트폴리오 PDF</Button>
      </div>
    </header>
  );
}
