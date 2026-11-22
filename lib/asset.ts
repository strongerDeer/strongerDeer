// 문자열 이미지 경로엔 Next가 basePath를 붙여 주지 않아서 직접 붙인다
export function asset(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;
}
