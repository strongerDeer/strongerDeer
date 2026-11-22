import { Button } from '@/components/common/Button';
import { ButtonLink } from '@/components/common/ButtonLink';
import { Section } from '@/components/common/Section';
import { Shelf } from '@/components/sections/book/Shelf';

export function Book() {
  return (
    <Section
      id='book'
      label='개발 책장'
      title='당신의 인생 개발책은?'
      description='제가 읽은 개발·디자인 책이에요. 책을 눌러 보세요.'
    >
      <Shelf category='dev' label='개발 책' />
      <Shelf category='design' label='디자인·UX 책' />

      <p
        aria-live='polite'
        className='mx-auto mt-4 flex min-h-24 items-center justify-center gap-3.5 text-foreground-muted'
      />

      <form className='mx-auto mt-5 mb-3 max-w-110 text-left'>
        <label
          htmlFor='book-recommend'
          className='mb-1.5 block text-sm font-bold'
        >
          당신의 인생 개발책을 알려 주세요
        </label>
        <div className='flex gap-2'>
          <input
            id='book-recommend'
            type='text'
            autoComplete='off'
            placeholder='예: 클린코드'
            className='min-w-0 flex-1 rounded-xl border border-line bg-background-card px-3.5 py-2.5 text-foreground placeholder:text-foreground-muted'
          />
          <Button type='submit' variant='solid' size='sm'>
            추천하기
          </Button>
        </div>
        <p
          aria-live='polite'
          className='mt-2 min-h-[1.6em] text-sm text-foreground-muted'
        />
      </form>

      <ButtonLink
        variant='text'
        size='sm'
        href='https://page0127.com/stronger_khj'
        target='_blank'
      >
        강혜진 개발자 서재 전체 보기 →
      </ButtonLink>
    </Section>
  );
}
