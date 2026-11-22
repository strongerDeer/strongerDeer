import Image from 'next/image';

import { type Book, BOOKS } from '@/data/books';
import { asset } from '@/lib/asset';

type ShelfProps = {
  category: Book['category'];
  label: string;
};

/**
 * 책장 한 단
 * - 보이는 제목(h3)과 목록(ul)을 aria-labelledby로 연결
 * - id는 category로 만들어서 두 단이 겹치지 않게 함
 * - 책이 많아 넘치면 줄바꿈 대신 가로 스크롤, 책은 선반(아래 두꺼운 선) 위에 바닥 정렬
 */
export function Shelf({ category, label }: ShelfProps) {
  const titleId = `shelf-${category}-title`;
  const books = BOOKS.filter((book) => book.category === category);

  return (
    <div className='mx-auto w-full max-w-4xl'>
      <h3 id={titleId} className='mt-6 text-sm font-bold text-foreground-muted'>
        {label}
      </h3>
      <ul
        aria-labelledby={titleId}
        className='flex items-end justify-center-safe gap-0.75 overflow-x-auto border-b-10 border-line px-3 pt-6'
      >
        {books.map(({ id, title }) => (
          <li key={id} className='shrink-0'>
            <button
              type='button'
              className='mx-1 block cursor-pointer overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_6px_14px_rgba(0,0,0,0.14)] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent'
            >
              <Image
                src={asset(`/images/books/${id}.webp`)}
                alt={title}
                width={80}
                height={120}
                className='h-30 w-auto'
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
