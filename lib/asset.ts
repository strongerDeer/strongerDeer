/**
 * public 폴더 파일 경로에 basePath(/strongerDeer)를 붙여 준다.
 * 문자열 경로는 Next가 basePath를 자동으로 안 붙이기 때문.
 * 예: asset('/images/books/123.webp') → '/strongerDeer/images/books/123.webp'
 */
export function asset(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;
}
