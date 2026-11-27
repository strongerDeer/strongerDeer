import { ButtonLink } from '@/components/common/ButtonLink';
import { SectionTabs } from '@/components/common/SectionTabs';
import { PORTFOLIO_PDF_URL } from '@/data/contact';

export function Header() {
  return (
    <header className='site-header sticky top-0 z-30 h-(--header-h) border-b'>
      <div className='mx-auto flex h-full w-full max-w-page items-center justify-between px-4'>
        strongerDeer
        <ButtonLink size='sm' href={PORTFOLIO_PDF_URL} target='_blank'>
          포트폴리오 PDF
        </ButtonLink>
      </div>
      <SectionTabs />
    </header>
  );
}
