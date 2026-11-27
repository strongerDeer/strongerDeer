// 요소 안의 글자를 마우스로 드래그한 것처럼 선택해 둔다.
// 복사가 막혔을 때 방문자가 복사 키만 누르면 되도록
export function selectElementText(element: Element) {
  const range = document.createRange();
  range.selectNodeContents(element);

  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}
