import Image from 'next/image';

import { ButtonLink } from '@/components/common/ButtonLink';
import page0127Icon from '@/public/images/brand/page0127-icon.webp';

const brandVars =
  '[--brand:#1e69cb] [--brand-light:#438ef2] [--brand-mint:#5fe0b4] [--brand-ink:#14294e] [--brand-sub:#3b4e70]';

export function Banner() {
  return (
    <section
      id='banner'
      aria-labelledby='banner-title'
      className={`${brandVars} bg-linear-to-r from-[#f4f8ff] via-[#eaf2ff] to-[#e7f7f1] text-(--brand-ink)`}
    >
      <div className='relative mx-auto flex w-full max-w-page justify-between gap-6 px-6 py-10 md:items-center'>
        <div className='absolute top-6 right-6'>
          <span
            aria-hidden='true'
            className='rounded border border-(--brand-ink)/15 bg-white/75 px-1.5 text-xs font-extrabold tracking-[0.08em] text-(--brand-sub)'
          >
            AD
          </span>
          <span className='sr-only'>광고</span>
        </div>

        <div className='flex flex-col gap-4'>
          <p className='flex items-center gap-1.5'>
            <Image src={page0127Icon} alt='' width={22} height={22} />
            <span className='font-black'>
              page0127<span className='text-(--brand-mint)'>.</span>
            </span>
            <span className='rounded-full border border-[#cfe0fb] bg-white px-2 py-0.5 text-xs font-extrabold tracking-[0.06em] text-(--brand)'>
              BETA
            </span>
          </p>

          <h2 id='banner-title' className='text-2xl'>
            <span className='font-normal text-(--brand-sub)'>
              읽은 책을 꽂아 두면,
            </span>
            <br />
            <span className='font-bold'>
              책장이 <span className='text-(--brand)'>취향을</span> 말해 줍니다
            </span>
          </h2>

          <div className='flex max-w-60 flex-wrap gap-2 md:max-w-full'>
            <ButtonLink
              variant='solid'
              href='https://page0127.com'
              target='_blank'
              className='w-full bg-(--brand)! text-white! md:w-60'
            >
              내 책장 만들어 보기
            </ButtonLink>
            <ButtonLink
              href='https://page0127.com/stronger_khj'
              target='_blank'
              className='w-full border-(--brand)/30! bg-white! text-(--brand) md:w-60'
            >
              강혜진 개발자의 서재 보기
            </ButtonLink>
          </div>
        </div>

        <Image
          src={page0127Icon}
          alt=''
          width={104}
          height={104}
          className='self-center'
        />
      </div>
    </section>
  );
}
