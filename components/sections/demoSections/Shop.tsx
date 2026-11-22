import Image from 'next/image';

import { Button } from '@/components/common/Button';
import { DemoCard } from '@/components/sections/demoSections/DemoCard';
import { TagList } from '@/components/sections/demoSections/TagList';
import { SHOP_TAGS } from '@/data/shop';
import { asset } from '@/lib/asset';

export function Shop() {
  return (
    <DemoCard
      index={3}
      id='shop'
      category='NOVERA Shop · 쇼핑몰'
      title='이 개발자, 장바구니에 담아 보실래요?'
      direction='col'
    >
      <div className='grid grid-cols-[150px_minmax(0,1fr)] items-start gap-x-3.5 gap-y-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:items-stretch sm:gap-5'>
        <div className='relative col-start-1 row-span-4 row-start-1 aspect-square overflow-hidden rounded-2xl bg-background-soft sm:row-span-1'>
          <span className='absolute top-3 left-3 z-10 rounded-lg bg-accent px-2 py-0.5 text-xs font-extrabold text-on-accent'>
            NEW
          </span>
          <Image
            src={asset('/images/hj/hj-01-focus.webp')}
            alt=''
            fill
            sizes='(min-width: 640px) 360px, 150px'
            className='object-cover'
          />
          <span
            aria-hidden='true'
            className='absolute right-2.5 bottom-2.5 rounded-lg bg-white/85 px-2 py-0.5 text-xs font-bold text-[#3a3340]'
          >
            코딩 중…
          </span>
        </div>

        <div className='contents sm:flex sm:flex-col sm:gap-2.5'>
          <p className='col-start-2 row-start-1 text-[13px] font-bold text-foreground-muted'>
            strongerDeer
          </p>
          <h4 className='col-start-2 row-start-2 text-lg font-bold sm:text-[22px]'>
            강혜진 · 프론트엔드 개발자
          </h4>

          <div className='col-span-2 row-start-5'>
            <TagList tags={SHOP_TAGS} />
          </div>

          <dl className='col-start-2 row-start-3 flex flex-col gap-1 text-sm sm:my-1 sm:text-[15px]'>
            <div className='flex flex-col sm:flex-row sm:gap-3'>
              <dt className='text-foreground-muted sm:w-12 sm:shrink-0'>
                연봉
              </dt>
              <dd className='font-bold'>협의</dd>
            </div>
            <div className='flex flex-col sm:flex-row sm:gap-3'>
              <dt className='text-foreground-muted sm:w-12 sm:shrink-0'>
                구성
              </dt>
              <dd className='font-bold'>디자인 보는 눈 + 개발하는 손</dd>
            </div>
          </dl>

          <div className='col-span-2 row-start-6 flex gap-2 sm:mt-auto'>
            <Button className='flex-1' aria-pressed={false}>
              <Heart />
              좋아요
            </Button>
            <Button className='flex-1' variant='solid'>
              장바구니 담기
            </Button>
          </div>
          <p
            aria-live='polite'
            className='col-span-2 row-start-7 min-h-[1.6em] text-[13px] text-foreground-muted'
          >
            연타해 보세요. 담는 중에 누른 건 한 번으로 쳐요.
          </p>
        </div>
      </div>
    </DemoCard>
  );
}

function Heart() {
  return (
    <svg
      viewBox='0 0 24 24'
      className='size-[1em]'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      focusable='false'
    >
      <path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' />
    </svg>
  );
}
