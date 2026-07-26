// 키보드 사용자가 헤더 메뉴를 매번 통과하지 않고 본문으로 바로 이동하기 위한 링크.
// 각 페이지의 최상단(헤더보다 앞)에 두어 Tab 첫 정류장이 되도록 한다.
//
// 대상은 <main> 이 아니라 본문 첫 제목이다. <main> 은 높이가 수천 px 라
// 초점 링이 화면 밖이나 고정 헤더 뒤에 걸려 "포커스가 사라진 것"처럼 보였다.
// 대상 요소에는 .skipTarget 과 tabIndex={-1} 을 함께 붙인다.
const SkipLink = ({ targetId }: { targetId: string }) => (
  <a href={`#${targetId}`} className="skipLink">
    본문 바로가기
  </a>
);

export default SkipLink;
