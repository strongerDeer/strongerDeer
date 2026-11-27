'use client';

import Image from 'next/image';
import { type SubmitEvent, useState } from 'react';

import { Button } from '@/components/common/Button';
import { ButtonLink } from '@/components/common/ButtonLink';
import { Section } from '@/components/common/Section';
import { Shelf } from '@/components/sections/book/Shelf';
import { BOOKS } from '@/data/books';
import { EMAIL } from '@/data/contact';
import { asset } from '@/lib/asset';
import { findBookByTitle } from '@/lib/findBookByTitle';
import { sendBookRecommend } from '@/lib/sendBookRecommend';

// 추천하기를 누른 뒤 보여줄 결과. 누르기 전엔 null
type RecommendResult =
  | { kind: 'empty' } // 아무것도 안 적음
  | { kind: 'alreadyRead' } // 제 책장에 있는 책
  | { kind: 'newBook'; title: string }; // 아직 없는 책 → 메일로 추천받기

export function Book() {
  // 책장에서 고른 책 (두 단이 같이 씀). 아직 안 골랐으면 null
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const selectedBook = BOOKS.find((book) => book.id === selectedBookId);
  const [recommendResult, setRecommendResult] =
    useState<RecommendResult | null>(null);

  function handleRecommend(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault(); // 페이지 새로고침 막기
    // 제출할 때만 값이 필요해서 state 없이 폼에서 바로 읽는다 (비제어 입력)
    const query = String(new FormData(event.currentTarget).get('title')).trim();

    if (query === '') {
      setRecommendResult({ kind: 'empty' });
      return;
    }

    const matchedBook = findBookByTitle(query);
    sendBookRecommend(query, matchedBook !== undefined);

    if (!matchedBook) {
      setRecommendResult({ kind: 'newBook', title: query });
      return;
    }

    setRecommendResult({ kind: 'alreadyRead' });
    // 책장에서 그 책을 꺼내 보여 준다 (가로 스크롤 중이면 그 책이 보이게)
    setSelectedBookId(matchedBook.id);
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    document.getElementById(`book-${matchedBook.id}`)?.scrollIntoView({
      block: 'nearest',
      inline: 'center',
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }

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

      <form
        onSubmit={handleRecommend}
        className='mx-auto mt-5 mb-3 max-w-110 text-left'
      >
        <label
          htmlFor='book-recommend'
          className='mb-1.5 block text-sm font-bold'
        >
          당신의 인생 개발책을 알려 주세요
        </label>
        <div className='flex gap-2'>
          <input
            id='book-recommend'
            name='title'
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
        >
          {recommendResult?.kind === 'empty' && '책 제목을 적어 주세요.'}
          {recommendResult?.kind === 'alreadyRead' &&
            '어! 저도 읽었어요. 취향이 통하네요!'}
          {recommendResult?.kind === 'newBook' && (
            <>
              제 서재엔 아직 없는 책이에요! 추천해 주시면 읽고 꽂아 둘게요.{' '}
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(`인생 개발책 추천: ${recommendResult.title}`)}`}
                className='font-bold text-accent underline underline-offset-2'
              >
                메일로 추천하기
              </a>
            </>
          )}
        </p>
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
