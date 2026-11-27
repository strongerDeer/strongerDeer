// 클립보드에 글자를 복사하고 성공 여부를 돌려준다.
// 권한이 막혔거나(https가 아님 등) 브라우저가 지원하지 않으면 false
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
