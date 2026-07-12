---
index: 1
id: "novera-shop"
type: "업무"
title: "NOVERA Shop"
kor: "커머스 프론트엔드 구축·운영"
thumb: "/project_noverashop.jpg"
period: "2025.02~재직중"
description: "기획자가 없는 신규 커머스의 주문·클레임 흐름을 어떻게 설계했을까?"
detailLabel: "화면 정책과 상태 설계 과정 보기"
tags: ["TypeScript", "React", "Next.js", "Design"]
skills: ["Next.js 16", "React 19", "TypeScript", "TanStack Query v5", "next-intl", "Tailwind CSS", "AWS Amplify"]
icon: "Building"
metrics:
  [
    "홈 이미지 6,645KB → 381KB, 94% 경량화",
    "SNS 간편가입 도입 후 신규 가입자의 79.4%가 선택",
    "주문·클레임·운영 어드민의 화면 정책과 상태 흐름 설계",
  ]
url: "https://shop.novera.town/"
codeDisclosure: "회사 코드와 운영 데이터는 비공개이며, 상세 내용과 코드 예시는 공개 가능한 범위에서 구조를 단순화·비식별화해 재구성했습니다."
role: "신규 커머스 TF에서 화면 정책·UI 설계·개발·운영 검증까지 프론트엔드 전반 주도"
---

# 프로젝트 소개

아티스트 상품 판매와 팬덤 이벤트를 위한 커머스 서비스. 상품 탐색·상세, 주문/클레임, 운영 어드민, 캠페인 랜딩 구축 및 운영.

# 배경과 문제

전담 기획자 없이 시작한 신규 커머스. 상품 탐색부터 주문·취소·반품·운영 어드민까지 화면 정책과 상태 표현 기준이 필요한 상황. 구매자에게는 진행 상태와 사전 안내가 부족했고, 운영자에게는 반복 확인과 수동 처리 비용이 발생.

# 역할

**팀 구성**: 디자인 1 · 프론트엔드 1 · 백엔드 1 · 운영 1

**담당 범위**: 화면 정책 정리, UI 설계, 사용자·운영 화면 개발, API 연동, 배포 후 검증까지 프론트엔드 전반. 결제·주문·취소·반품 연동 기준을 백엔드와 협의하고, 운영 정책을 화면 흐름과 문서로 구체화. 커밋·코드 컨벤션과 개발 요청·화면 정책 문서 정비.

## 협업 방식

기존에 사용하던 Jira는 개발 이슈 중심이어서 기획·디자인·프론트엔드·백엔드·운영이 함께 협업하기 어려웠다. 협업 도구를 Notion으로 전환하고, 팀별 요청과 진행 상태를 하나의 보드에서 관리. 요청 문서는 배경·대상 화면·필요한 동작·완료 기준을 같은 형식으로 작성해 직군 간 요청과 의사결정을 한곳에서 확인할 수 있게 정리.

![](/strongerDeer/project/novera-shop_architecture.png)

사용자 화면과 운영 어드민이 하나의 백엔드 API를 공유하고, 성과·품질 지표는 별도 대시보드로 연결되는 구조. Figma 토큰과 공통 컴포넌트를 두 화면에서 함께 사용.

# 왜 이 기술을 사용했나

- **Next.js 16 · React 19**: 상품 페이지의 검색 노출과 초기 렌더링, 마이페이지의 상호작용을 함께 처리하기 위한 App Router 기반 구조
- **TypeScript**: 주문·결제·클레임처럼 상태 조합이 많은 도메인의 API 응답과 화면 상태를 타입으로 제한
- **TanStack Query v5**: 서버 상태 캐싱, mutation 이후 주문 도메인 무효화, 무한 스크롤 데이터 흐름 관리
- **Tailwind CSS**: 빠른 화면 확장과 반응형 UI 구현, 공통 상태 스타일 정리
- **AWS Amplify**: 기존 AWS 환경과 연결한 브랜치별 배포·운영

# 구현

![상품 목록(PLP) — 카테고리 필터·정렬·상품 카드 상태 배지](/strongerDeer/project/novera-shop_plp.jpg)

카테고리 필터, 정렬, 무료배송·품절임박 상태 배지를 포함한 상품 탐색 화면.

- 상품 카드, 상품 목록, 상품 상세, 주문내역, 주문상세 등 커머스 핵심 화면 구현
- 취소·반품 요청/거절 사유를 상품 인라인으로 개편하고, 클레임 상세에 반품배송비·환불금액 breakdown을 통합해 구매자가 예상 환불금액을 결제 전 확인하도록 구성
- 주문·배송·반품·클레임·이벤트 매출 등 운영 어드민 기능 구현, 다중 상품 일괄처리와 외부 택배 배송조회 연동, 배송중 주문 송장번호 수정 구현
- 상품별 안내문구 영역을 신설해 해외결제·예약 판매·배송 안내를 사전에 노출
- DANAL SQUARE, SPHERE(FANCAST 포토카드·덕력고사 퀴즈·호흡 투표 등 다회차) 캠페인/이벤트 페이지를 개발하고 댓글·투표·공유·상품 연결 등 참여형 인터랙션 구현
- 로그인 진입 경로를 `/sign-in`으로 통일하고 로그인·가입 후 원래 페이지로 복귀하도록 정리
- 백엔드 응답 형식을 정규화해 데이터 연동 오류 가능성 감소

![상품 상세(PDP) — 가격·배송 조건과 상품별 안내사항 영역](/strongerDeer/project/novera-shop_pdp.jpg)

가격·배송 조건 아래에 안내사항 영역을 분리해 이벤트 상품의 발송 시점, 주문 변경 조건, 해외 진행 방식을 결제 전에 노출.

![SPHERE 호흡 투표 이벤트 랜딩 — 발동 카운터·투표·공유·상품 연결](/strongerDeer/project/novera-shop_sphere.jpg)

누적 발동 카운터, 투표·공유·상품 연결을 포함한 참여형 캠페인 랜딩. 포토카드·퀴즈·투표 등 회차별 형식으로 확장.

# 기술 문제와 해결

## 운영자가 올린 이미지가 화면을 느리게 만드는 문제

**문제**: 배너·상품·기획전 이미지가 원본 크기로 올라가고, 세로로 긴 상품 상세 이미지는 일괄 리사이즈 후 가로 해상도가 크게 줄어들었다.

**해결**: 어드민 업로드 시점에서 용도별 압축 정책을 분리. 썸네일·배너·본문·서류마다 최대 가로폭과 용량을 다르게 적용하고, 압축본이 더 큰 경우는 원본을 사용. Shop에서는 `next/image`와 WebP 포맷을 사용하고 첫 상품 이미지의 우선순위를 조정. 품질 대시보드의 동일 홈 화면 Lighthouse 전송량 기록에서 **6,645KB → 381KB(약 94.3%)**로 감소한 것을 확인.

![Quality 측정 이력 — 홈 이미지 전송량이 6,645KB에서 381KB로 감소한 추세](/strongerDeer/project/novera-shop_image-trend.svg)

6월 19일 최적화 반영 후 전송량이 6MB대에서 400KB대로 낮아졌고, 이후 주간 측정에서도 유지. `shop-chart` Quality가 Lighthouse `resource-summary` 전송 바이트를 동일 Home 기준으로 누적한 결과.

## 웹폰트가 초기 로드에 주는 부담

**문제**: Pretendard 3개 굵기의 전체 파일 약 2.15MB를 처음부터 로드.

**해결**: 한글 글자 범위를 `unicode-range`로 나눈 다이나믹 서브셋으로 전환. 현재 페이지에 필요한 조각만 받도록 하고, 기존 굵기 매핑과 캐시 정책은 유지. 커밋 측정 기준으로 페이지당 약 320KB까지 감소.

## 서버 렌더링과 클라이언트 캐시의 경계

상품 목록·상세의 초기 노출과 마이페이지의 상호작용을 함께 고려해야 하는 문제. 서버에서 선조회할 데이터와 사용자 행동에 따라 갱신할 데이터를 분리하고, TanStack Query의 prefetch/dehydrate로 서버 데이터와 클라이언트 캐시 연결.

아래 예시는 실제 QueryClient 정책 중 서버 렌더링 데이터가 클라이언트에서 즉시 재요청되지 않도록 한 핵심 설정을 공개 가능한 범위로 단순화한 코드.

```ts
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});
```

초기 렌더링은 서버 데이터를 활용하고, 장바구니·주문·클레임 변경 후 관련 query를 무효화해 화면 간 상태 일관성 유지.

## 무한 스크롤에서 필터 후 빈 화면이 생기는 문제

현재 페이지의 필터 결과는 0개지만 다음 페이지에는 결과가 남아 빈 화면이 먼저 노출되는 문제. 다음 페이지 존재 여부와 fetch 상태를 확인해 필요한 경우에만 추가 조회.

- `loadedPageCount`를 ref로 기억해 같은 페이지에서 중복 fetch 방지
- `isFetching`과 `isFetchingNextPage`를 함께 확인해 연속 호출 방지
- 에러 상태와 빈 상태를 분리해 `ListErrorComponent`와 `ListEmptyComponent`를 따로 노출

## SEO metadata 병합에서 robots가 의도치 않게 풀리는 문제

하위 metadata의 `robots: undefined`가 상위 layout의 `noindex` 정책을 덮는 문제. `robots`가 명시된 경우에만 metadata 객체에 포함해 비기본 locale과 민감 페이지의 색인 차단 유지.

아래 예시는 robots 값이 명시된 경우에만 병합 객체에 포함하는 실제 해결 구조를 단순화한 코드.

```ts
return {
  title: finalTitle,
  description: finalDescription,
  ...(robots !== undefined && { robots }),
  openGraph: { title: ogTitle, description: finalDescription, url },
};
```

## 운영 어드민의 다중 처리와 캐시 무효화

한 주문 안에서 상품별 취소·반품·구매확정 상태가 다르게 움직이는 문제. 선택 상태와 상세 조회를 분리하고 선택 id를 `useQueries`로 병렬 조회. mutation 이후 주문 도메인 query를 일괄 무효화해 목록·상세·대시보드 상태 동기화.

아래 예시는 선택된 클레임 id별 상세 조회를 병렬 구성한 핵심 흐름을 비식별화한 코드.

```ts
useQueries({
  queries: ids.map((id) => ({
    queryKey: ['order', 'cancel', id],
    queryFn: () => getOrderCancel(id),
    enabled: session.status === 'authenticated',
  })),
});
```

# 결과

- 2026년 4월 오픈 후 별도 대규모 마케팅 없이 **MAU 최대 3,436명**을 기록한 운영 서비스에서 성능·SEO·회원가입 흐름을 지속 점검
- 구글·카카오 간편가입 도입 후 7일간 신규 가입자의 **79.4%가 SNS 간편가입을 선택**(어드민 가입 통계 기준)
- 어드민 업로드 압축, Shop 이미지 최적화, WebP 제공 정책을 연결해 홈 이미지 전송량을 **6,645KB에서 381KB로 약 94% 경량화**(품질 대시보드 Lighthouse 이력 기준)
- Pretendard 웹폰트 전체 로드(약 2.15MB)를 페이지별 다이나믹 서브셋 로드 방식으로 전환해 초기 렌더링 부담을 완화
- 주문·배송·반품·클레임·이벤트 매출 관리 화면을 정리해 운영자가 반복 확인하던 업무 흐름을 줄임
- SPHERE 이벤트를 1회차(포토카드)부터 다회차(덕력고사 퀴즈·호흡 투표)까지 확장 개발하며, 오픈 전 가드·URL 진행 복원·전용 OG 정비 등 캠페인 운영에 필요한 프론트엔드 기반을 함께 정리함

개선 이후 Core Web Vitals, Lighthouse, 이미지 전송량을 별도 성과·품질 대시보드에서 지속 점검.
