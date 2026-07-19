---
index: 1
id: "nds"
type: "업무"
title: "NDS"
kor: "디자인 시스템 구축"
thumb: "/project_nds.gif"
period: "2025.02~운영 중"
description: "화면마다 반복될 UI 판단을 처음부터 하나의 시스템으로 고정한 과정."
detailLabel: "NDS 설계·운영 과정 보기"
tags: ["TypeScript", "React", "Design"]
skills: ["React", "TypeScript", "Vanilla Extract", "Style Dictionary", "Storybook", "Vitest", "GitHub Actions"]
icon: "Cpu"
metrics:
  [
    "배포한 공통 모듈 대부분을 Shop에서 실사용 — 로그인·주문·상품·이벤트 등 코드 166개 파일 적용",
    "모달의 포커스·다중 오버레이·포인터 입력 판정을 기본 동작·테스트로 고정",
    "별도 저장소에서 GitHub Actions·Nexus를 거쳐 Shop 고정 버전으로 배포·운영",
  ]
highlights:
  [
    { value: "166개 파일", label: "로그인·주문·상품·이벤트 등 자사 쇼핑몰(Shop) 코드에서 디자인 시스템 직접 사용" },
    { value: "대부분 실사용", label: "배포한 공통 모듈 대부분을 Shop 화면에서 실제 사용" },
    { value: "배포 자동화", label: "GitHub Actions로 빌드·배포 자동화, 사내 저장소에서 고정 버전으로 운영" },
  ]
url: "https://www.figma.com/slides/H3he12dIt9FBNioyo72JvK"
urlType: "slides"
urlLabel: "NDS 설계 슬라이드"
codeDisclosure: "회사 저장소는 비공개이며, 설계 내용과 코드 예시는 공개 가능한 범위에서 구조를 단순화해 재구성함."
role: "디자인 시스템 설계 방향 주도 · 컴포넌트 라이브러리·토큰 변환 파이프라인 구축"
---

# 프로젝트 소개

신규 커머스 오픈 초기부터 후속 제품 확장을 전제로, 화면마다 반복될 UI·접근성·토큰 판단을 하나의 기준으로 고정하기 위해 제안·설계한 사내 디자인 시스템(이하 NDS). Figma 토큰을 CSS 변수·TypeScript 상수로 변환하고, 복잡한 브라우저 동작을 컴포넌트 API·테스트에 담아 사내 npm 패키지로 배포. 운영 중인 자사 쇼핑몰(이하 Shop)의 고객 화면에 적용해 운영 환경에서 검증함.

# 설계·운영 요약

- **문제** — 공통 기준 없이 시작한 신규 커머스. 화면마다 개별 구현하면 UI 동작·접근성·토큰 판단과 검수가 반복
- **판단** — 디자인 토큰·공통 컴포넌트 API·테스트·패키지 배포를 하나의 변경 흐름으로 연결
- **적용** — Shop 전역에 NDS 테마 주입, 로그인·주문·상품·이벤트 등 코드 166개 파일에서 직접 사용
- **대표 사례** — 모바일에서 모달을 드래그한 뒤 바깥에서 손을 놓을 때 나던 오닫힘을 포인터 입력 판정·테스트로 해결
- **한계** — 한 운영 제품에서만 검증. 담당 종료 예정으로 후속 제품 확장·장기 마이그레이션 지표까지는 확인 못 함

![Figma에서 운영 제품까지 이어지는 NDS 토큰·컴포넌트·배포 흐름](/strongerDeer/project/nds_flow.svg)

# 배경과 문제

신규 커머스를 시작하며 공통 UI 기준이 없는 상태. 화면마다 Button·Input·Modal·Table을 개별 구현하면 스타일·접근성·동작이 갈라지고, Figma와 코드 사이 토큰도 수기 동기화로 이름·값이 쉽게 어긋나는 구조.

개별 구현의 비용은 중복 코드만이 아님. 화면마다 다른 포커스·터치 동작, 누락된 접근성 이름, 같은 UI를 두 번 검수하는 QA 반복으로 이어짐. 오픈 초기부터 후속 제품 확장까지 전제해 토큰·컴포넌트·검증 기준을 한곳에 두는 구조가 필요하다고 판단.

# 역할

**팀 구성**: 디자인 1 · 프론트엔드 1

**직접 제안·구현**: 디자인 시스템 구조·도입 방향, 컴포넌트 API, 접근성 기준, Figma 토큰 → 코드 토큰 변환, Storybook 문서, tsup 번들링·Nexus 배포 흐름.

**디자이너와 합의**: Primitive·Semantic·Component 토큰 계층, 네이밍 규칙, 상태별 컴포넌트 스펙·제품 적용 기준.

# 왜 이 기술을 사용했나

- **React · TypeScript**: 제품별로 허용할 속성 조합을 타입으로 제한하고 공통 컴포넌트 API 제공
- **Vanilla Extract**: 소비하는 제품 앱의 스타일 파이프라인(Shop은 Tailwind)에 의존하지 않고 정적 CSS로 배포할 수 있어 선택 — 런타임 스타일 계산 없이 허용되지 않은 속성 조합을 타입 단계에서 차단
- **Style Dictionary**: Figma 토큰을 CSS 변수와 TypeScript 상수로 자동 변환
- **Storybook**: 상태·접근성·사용 예시를 컴포넌트 단위로 문서화하고 디자인 검수 기준 공유
- **tsup · Nexus**: CJS·ESM·타입 선언·정적 CSS를 함께 빌드하고 사내 npm 패키지로 배포
- **Vitest · Playwright**: 포인터 경계 조건과 접근성 규칙을 브라우저·마크업 테스트로 고정

# 구현

- **복잡한 동작을 컴포넌트 기본값으로 고정** — 모달의 포커스 복귀·다중 오버레이 순서·포인터 입력 판정·모바일 화면 높이를 공통 처리. 검색형 선택 상자의 키보드 탐색, 수량 입력의 외부 상태 제어를 API로 제공
- **제품 환경을 강제하지 않는 확장 API** — Carousel·Avatar에 `renderImage` 렌더 함수를 제공해 소비 제품이 `next/image` 같은 이미지 구현을 외부에서 주입
- **공통 UI 모듈** — Button·Input·Modal·Table·Select·Accordion·Carousel·Pagination·Stepper 등과 색상·간격·타이포 기초 토큰 설계·구현
- **토큰·테마 시스템** — 색상·간격·모서리·그림자·쌓임 순서를 토큰화하고 멀티브랜드 테마·Figma 토큰 코드 변환 흐름 구성
- **문서화·배포 자동화** — Storybook 상태별 케이스·ADR·토큰 네이밍·컴포넌트 체크리스트 정리. develop 병합 후 Storybook 빌드·Chromatic 배포, main 반영 후 Nexus 배포를 GitHub Actions로 자동화

# UX와 DX를 함께 설계한 기준

- **사용자 UX** — 모달의 포커스 복귀, 다중 오버레이 순서, 아이콘 버튼 접근성 이름, 터치 환경 최소 44px 터치 영역, 모바일 화면 높이·로딩·오류·비활성 상태를 컴포넌트 기본 동작·테스트로 고정
- **개발자 DX** — 타입 자동완성·속성 조합 제한, CJS·ESM·`.d.ts`·정적 CSS 패키지, Storybook 사용 예시, 토큰 자동 변환으로 올바른 구현 경로 제공
- **협업 기준** — Figma와 코드가 같은 토큰 이름을 사용하고, 상태·반응형·접근성·에셋 조건을 핸드오프 전에 확인하도록 문서화

반복 설명을 늘리는 대신, 같은 질문·실수가 반복되지 않도록 판단 기준을 타입·도구·문서에 외부화하는 것을 DX 목표로 삼음.

![Storybook — 색상 토큰 3계층(Primitive·Semantic·Brand)과 코드 사용 예시](/strongerDeer/project/nds_colors.jpg)

Primitive(원시 값) → Semantic(용도·의미) → Brand(브랜드) 3계층 색상 토큰과 타입 기반 코드 사용 예시. 컴포넌트는 Semantic 토큰 우선.

![Storybook — Button 표현 조합 갤러리(Semantic·Solid·Outline·Ghost × 컬러)](/strongerDeer/project/nds_button.jpg)

Semantic·Color × Solid·Outline·Ghost 조합을 한곳에서 관리하는 Button 표현 기준.

![Storybook — Modal(기본/Alert/Dialog) 크기별 오버레이](/strongerDeer/project/nds_modal.jpg)

Modal·Alert·Dialog 3유형과 크기, 버튼 배치, 스크롤, 비동기 로딩, 다중 모달 포커스를 하나의 API로 관리.

# 제품 채택과 운영

- **채택 범위** — Shop 앱 전체를 NDS `ThemeProvider`로 감싸 토큰·테마를 전역 적용. 배포한 공통 모듈 대부분을 Shop에서 실사용하고, 로그인·주문·상품·이벤트 등 코드 166개 파일이 NDS를 직접 import
- **토큰 적용** — Style Dictionary가 생성한 CSS 변수 276개 제공. Shop은 타입 있는 토큰 객체·프로젝트 테마 설정으로 값을 소비
- **배포 구조** — NDS와 Shop을 별도 Git 저장소로 운영. NDS는 `main` 반영 후 GitHub Actions로 Nexus 배포, Shop은 업데이트 스크립트로 패키지 버전·잠금 파일을 함께 갱신. 확인 시점 소비 버전은 `0.1.37`
- **점진적 전환** — Button·Input·Flex·Icon 같은 범용 요소는 NDS로 수렴. 판매 채널별 표현이 필요한 체크박스처럼 제품 맥락이 강한 UI는 Shop에 남겨 시스템 경계 유지
- **API 확장** — Carousel 이미지 렌더 함수에 선택 인자를 추가해 기존 사용처를 깨지 않고 `next/image` 최적화 수용. 검색 가능한 Select와 폼 라이브러리 호환성도 기능 추가 방식으로 확장

README에 SemVer 원칙을 문서화하고, 공개 중단 API 없이 선택 인자를 추가하는 방식으로 하위 호환성 유지. 다만 아직 `0.x` 단계이며 장기적 주요 버전 전환·마이그레이션 운영까지 검증한 상태는 아님.

# 기술 문제와 해결

## 문제 1. Figma 토큰과 코드 토큰의 이름·값 불일치

**문제**: 토큰을 수기로 옮기면서 radius·shadow·spacing의 이름·값이 Figma와 코드 사이에서 어긋남. 디자이너가 값을 바꿔도 코드에 언제·정확히 반영됐는지 확인할 방법이 없음.

**해결**: Style Dictionary에 custom transform/format을 등록해 Figma 토큰을 TypeScript 객체·CSS 변수로 동시 변환하는 파이프라인 구축.

아래는 실제 변환 파이프라인에서 이름·값 변환과 출력 포맷을 연결하는 핵심 설정을 단순화한 코드.

```js
hooks: {
  transforms: {
    'attribute/rounded-to-border-radius': roundedToBorderRadius,
    'name/css/tailwind': tailwindNaming,
    'value/shadow-to-css': shadowToCss,
  },
  formats: {
    'typescript/nested-object': typescriptNestedObject,
  },
}
```

컴포넌트는 타입 있는 토큰 객체를 사용하고, 제품 앱은 CSS 변수로 theme 주입.

**결과**: 디자이너가 Figma에서 바꾼 토큰이 변환 스크립트 실행만으로 CSS 변수·TypeScript 상수에 동시 반영 — 수기 동기화로 생기던 이름·값 어긋남 제거.

## 문제 2. 모바일·크로스브라우저에서만 재현되는 문제

**문제**: 모달 내용에서 드래그를 시작해 배경 영역(backdrop)에서 놓으면 의도와 달리 모달이 닫힘. `will-change` 속성이 고정 위치 기준을 바꿔 모달 위치가 틀어지는 문제도 발생.

**원인 가설**: 닫힘 판정이 `click`(pointerup 위치)만 보고 있어 드래그 시작 지점을 구분하지 못함.

**해결**: 포인터를 누른 시점(`pointerdown`)과 놓은 시점(`pointerup`)이 모두 배경 영역에서 발생한 경우만 닫히게 변경, 주 입력이 아닌 포인터는 제외. 판정 로직을 순수 함수로 분리해 8개 사례로 테스트하고, 고정 위치를 깨뜨리던 `will-change`는 제거. 모바일 높이는 `vh` → `dvh`로 전환.

**결과**: 드래그 중 모달 오닫힘·위치 틀어짐 제거. 판정 규칙을 테스트로 고정해 회귀 방지.

## 그 외 해결한 문제

- **환경 차이** → Storybook과 Next.js 제품 앱의 실행 환경이 다른 문제. React 외부 의존성 관리로 중복 번들링을 막고 Vanilla Extract 정적 CSS가 소비 앱에서도 동일 적용되도록 구성. `recipe`로 허용할 표현 방식·크기 조합을 타입으로 제한
- **접근성 기준 산재** → 아이콘 버튼·비밀번호 보기·수량 입력의 접근성 이름 누락을 컴포넌트 단위 `aria-label`로 통일. 서버 렌더링 결과·CSS 소스 테스트로 회귀 방지하고, 터치 환경 최소 44px 터치 영역·아이콘 간격 규칙을 테스트로 고정

# 결과

- **Figma → 코드 토큰 자동 변환 정착** — 색상·간격·모서리 등 토큰 변경이 수기 동기화 없이 코드에 반영. 변환 흐름은 멀티브랜드 테마까지 확장
- **첫 운영 제품에 UI 기준 적용** — Shop 전역에 NDS 테마 적용, 배포한 공통 모듈 대부분을 실사용. 로그인·주문·상품·이벤트 등 코드 166개 파일에서 NDS를 직접 소비하며 최소 44px 터치 영역·아이콘 버튼 접근성 이름·다중 모달 포커스를 공통화
- **동작 기준을 테스트로 고정** — 포인터 입력 판정·서버 렌더링 결과·CSS 소스 테스트로 상태·동작 회귀 방지

# 배운 점과 다음 과제

공통 컴포넌트의 수보다, 제품에서 반복되는 문제를 어디까지 라이브러리의 기본값·제약으로 가져올지 결정하는 일이 더 중요했음. 디자인 시스템을 만드는 것과 조직에 채택시키는 것은 다른 문제라는 점도 배움. 첫 운영 소비 제품 Shop 적용까지 진행했지만, 담당 종료 시점까지 후속 제품 확장·장기 마이그레이션 지표를 충분히 확인하지 못한 점은 한계로 남음.

다음에는 소비 제품별 도입 우선순위, 하위 호환이 깨지는 변경·마이그레이션 정책, 사용 현황 측정을 초기 설계에 함께 포함하고자 함.

# 관련 자료

- [NDS 설계 슬라이드](https://www.figma.com/slides/H3he12dIt9FBNioyo72JvK) — 테마·컴포넌트·토큰 구조
- [기술 의사결정 기록(ADR)](https://www.notion.so/strongerdeer/34101a7a57f1811daab2cd6e3d469208) — 주요 설계 판단의 배경과 대안 비교
- [트러블슈팅 · 회고](https://www.notion.so/strongerdeer/34101a7a57f181758a05fed6e64bcc15) — 문제 정의부터 해결·회고까지
- [토큰 네이밍 시스템](https://www.notion.so/strongerdeer/2ca01a7a57f18014afc7c0c398faaee3) — 디자이너와의 공통 언어 정의
