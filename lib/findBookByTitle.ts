import { type Book, BOOKS } from '@/data/books';

// 띄어쓰기·기호를 빼고 소문자로: "모던 리액트 Deep Dive" → "모던리액트deepdive"
function normalizeTitle(text: string) {
  return text.replace(/[^\p{L}\p{N}]/gu, '').toLowerCase();
}

// 입력한 제목과 책장의 책을 느슨하게 비교한다.
// 입력이 제목의 일부이거나("리액트 딥다이브" X, "모던 리액트" O),
// 입력 안에 짧은 이름이 들어 있으면("훅 추천해요" → 훅) 같은 책으로 본다.
export function findBookByTitle(query: string): Book | undefined {
  const normalizedQuery = normalizeTitle(query);
  if (normalizedQuery === '') return undefined;

  return BOOKS.find((book) => {
    const fullTitle = normalizeTitle(book.title);
    const shortTitle = normalizeTitle(book.shortTitle ?? book.title);
    return (
      fullTitle.includes(normalizedQuery) ||
      normalizedQuery.includes(shortTitle)
    );
  });
}
