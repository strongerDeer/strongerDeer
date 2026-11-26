// 구글 시트에 연결된 Apps Script 웹 앱 주소.
// 배포된 JS에 어차피 그대로 보이는 값이라 .env 대신 상수로 둔다.
// (이 주소로는 시트에 한 줄 추가만 가능하고, 입력 검사는 스크립트 쪽에서 한다)
const BOOK_RECOMMEND_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbxYoKkJFrTZJ2jptMObbPX-C7oRMG8PBV4b2mzdDJv6gb9epwxopL5u1HtTJIEuqg9b/exec';

// 방문자가 적은 책을 시트에 보낸다. 화면은 이 결과를 기다리지 않는다.
export function sendBookRecommend(title: string, alreadyRead: boolean) {
  fetch(BOOK_RECOMMEND_ENDPOINT, {
    method: 'POST',
    // Apps Script는 다른 사이트가 응답을 읽도록 허용하지 않아서(CORS)
    // 응답은 포기하고 보내기만 한다. 이 모드에선 text/plain만 보낼 수 있다.
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ title, alreadyRead }),
  }).catch(() => {
    // 저장에 실패해도 방문자 화면엔 영향 없게 조용히 넘긴다
  });
}
