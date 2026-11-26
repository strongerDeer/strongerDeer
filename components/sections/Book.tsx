'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/common/Button';
import { ButtonLink } from '@/components/common/ButtonLink';
import { Section } from '@/components/common/Section';
import { Shelf } from '@/components/sections/book/Shelf';
import { BOOKS } from '@/data/books';
import { asset } from '@/lib/asset';

export function Book() {
  // 책장에서 고른 책 (두 단이 같이 씀). 아직 안 골랐으면 null
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const selectedBook = BOOKS.find((book) => book.id === selectedBookId);

  return (
    <Section
      id='book'
      label='개발 책장'
      title='당신의 인생 개발책은?'
      description='제가 읽은 개발·디자인 책이에요. 책을 눌러 보세요.'
    >
      <Shelf
        category='dev'
        label='개발 책'
        selectedBookId={selectedBookId}
        onSelect={setSelectedBookId}
      />
      <Shelf
        category='design'
        label='디자인·UX 책'
        selectedBookId={selectedBookId}
        onSelect={setSelectedBookId}
      />

      <p
        aria-live='polite'
        className='mx-auto mt-4 flex min-h-24 items-center justify-center gap-3.5 text-left text-foreground-muted'
      >
        {selectedBook && (
          <>
            <Image
              src={asset(`/images/books/${selectedBook.id}.webp`)}
              alt=''
              width={60}
              height={74}
              className='h-18.5 w-auto shrink-0 rounded-[3px] shadow-md'
            />
            <span>
              <b className='text-foreground'>{selectedBook.title}</b>
              <br />
              {selectedBook.author}
            </span>
          </>
        )}
      </p>

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
