import Image from 'next/image';

import { type Book, BOOKS } from '@/data/books';
import { asset } from '@/lib/asset';

type ShelfProps = {
  category: Book['category'];
  label: string;
  selectedBookId: string | null;
  onSelect: (bookId: string) => void;
};

export function Shelf({
  category,
  label,
  selectedBookId,
  onSelect,
}: ShelfProps) {
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
        {books.map(({ id, title, author }) => (
          <li key={id} className='shrink-0'>
            <button
              type='button'
              id={`book-${id}`}
              aria-pressed={id === selectedBookId}
              aria-label={`${title}, ${author}`}
              onClick={() => onSelect(id)}
              className='mx-1 block cursor-pointer overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_6px_14px_rgba(0,0,0,0.14)] transition-transform duration-250 hover:-translate-y-3.5 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent aria-pressed:-translate-y-3.5'
            >
              <Image
                src={asset(`/images/books/${id}.webp`)}
                alt=''
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
