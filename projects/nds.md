---
index: 1
id: "nds"
type: "업무"
title: "NDS"
kor: "디자인 시스템 구축"
thumb: "/project_nds.gif"
period: "2025.02~2026.08"
description: "각 제품에서 반복되던 UI 판단을, 어떻게 하나의 시스템으로 고정했을까?"
detailLabel: "NDS 설계·운영 과정 보기"
tags: ["TypeScript", "React", "Design"]
skills: ["React", "TypeScript", "Vanilla Extract", "Style Dictionary", "Storybook", "Vitest", "GitHub Actions"]
icon: "Cpu"
metrics:
  [
    "Shop 전역에 테마를 적용하고 로그인·주문·상품·이벤트 등 166개 제품 코드 파일에서 NDS 사용",
    "모달의 포커스·다중 오버레이·포인터 입력 판정을 기본 동작과 테스트로 고정",
    "별도 저장소에서 GitHub Actions와 Nexus를 거쳐 Shop의 고정 버전으로 배포·운영",
  ]
highlights:
  [
    { value: "166개 파일", label: "로그인·주문·상품·이벤트 등 Shop 제품 코드에서 NDS 직접 사용" },
    { value: "53.2%", label: "Shop 공용 컴포넌트 124개 중 66개가 NDS를 직접 사용" },
    { value: "0.1.37", label: "Nexus에 배포하고 Shop에서 고정 버전으로 운영" },
  ]
url: "https://www.figma.com/slides/H3he12dIt9FBNioyo72JvK"
urlType: "slides"
urlLabel: "NDS 설계 슬라이드"
codeDisclosure: "회사 저장소는 비공개이며, 설계 내용과 코드 예시는 공개 가능한 범위에서 구조를 단순화해 재구성했습니다."
role: "디자인 시스템 설계 방향 주도 · 컴포넌트 라이브러리와 토큰 변환 파이프라인 구축"
---

# 프로젝트 소개

제품별로 중복 구현되던 UI·접근성·토큰 기준을 통합하기 위해 제안하고 설계한 사내 디자인 시스템. Figma 토큰을 CSS 변수·TypeScript 상수로 변환하고, 복잡한 브라우저 동작을 컴포넌트 API와 테스트에 담아 사내 npm 패키지로 배포했다. Shop 고객 화면에 적용해 운영 환경에서 검증했다.

# 설계·운영 요약

- **문제** — 제품마다 UI 동작·접근성·토큰 기준이 달라 같은 판단과 검수가 반복됨
- **판단** — 디자인 토큰, 공통 컴포넌트 API, 테스트, 패키지 배포를 하나의 변경 흐름으로 연결
- **적용** — Shop 전역에 NDS 테마를 주입하고 로그인·주문·상품·이벤트 등 166개 제품 코드 파일에서 직접 사용
- **대표 사례** — 모바일에서 모달을 드래그한 뒤 바깥에서 손을 놓을 때 발생하던 오닫힘을 포인터 입력 판정과 테스트로 해결
- **한계** — 한 운영 제품에서 검증했으며 담당 종료 예정으로 후속 제품 확장과 장기 마이그레이션 지표까지 확인하기 어려움

![Figma에서 운영 제품까지 이어지는 NDS 토큰·컴포넌트·배포 흐름](/strongerDeer/project/nds_flow.svg)

# 배경과 문제

제품마다 Button·Input·Modal·Table을 개별 구현해 스타일·접근성·동작이 달라지는 문제. Figma와 코드 사이의 토큰도 수기로 동기화해 이름과 값이 쉽게 어긋나는 상황.

개별 구현의 비용은 중복 코드만이 아니라, 제품마다 다른 포커스·터치 동작과 누락된 접근성 이름, 같은 UI를 두 번 검수하는 QA 반복으로 나타남. 토큰·컴포넌트·검증 기준을 한곳에 두는 구조가 필요한 상태.

# 역할

**팀 구성**: 디자인 1 · 프론트엔드 1

**직접 제안·구현**: 디자인 시스템 구조와 도입 방향, 컴포넌트 API, 접근성 기준, Figma 토큰 → 코드 토큰 변환, Storybook 문서, tsup 번들링과 Nexus 배포 흐름.

**디자이너와 합의**: Primitive·Semantic·Component 토큰 계층, 네이밍 규칙, 상태별 컴포넌트 스펙과 제품 적용 기준.

# 왜 이 기술을 사용했나

- **React · TypeScript**: 제품별로 허용할 속성 조합을 타입으로 제한하고 공통 컴포넌트 API 제공
- **Vanilla Extract**: 소비하는 제품 앱의 스타일 파이프라인(Shop은 Tailwind)에 의존하지 않고 정적 CSS로 배포할 수 있어 선택 — 런타임 스타일 계산 없이 허용되지 않은 속성 조합을 타입 단계에서 차단
- **Style Dictionary**: Figma 토큰을 CSS 변수와 TypeScript 상수로 자동 변환
- **Storybook**: 상태·접근성·사용 예시를 컴포넌트 단위로 문서화하고 디자인 검수 기준 공유
- **tsup · Nexus**: CJS·ESM·타입 선언·정적 CSS를 함께 빌드하고 사내 npm 패키지로 배포
- **Vitest · Playwright**: 포인터 경계 조건과 접근성 규칙을 브라우저·마크업 테스트로 고정

# 구현

- **복잡한 동작을 컴포넌트 기본값으로 고정** — 모달의 포커스 복귀·다중 오버레이 순서·포인터 입력 판정·모바일 화면 높이를 공통 처리하고, 검색형 선택 상자의 키보드 탐색과 수량 입력의 외부 상태 제어를 API로 제공
- **제품 환경을 강제하지 않는 확장 API** — Carousel·Avatar에 `renderImage` 렌더 함수를 제공해 소비 제품이 `next/image` 같은 이미지 구현을 외부에서 주입하도록 설계
- **공통 UI 모듈** — Button·Input·Modal·Table·Select·Accordion·Carousel·Pagination·Stepper 등과 색상·간격·타이포 기초 토큰 설계·구현
- **토큰·테마 시스템** — 색상·간격·모서리·그림자·쌓임 순서와 모션 기반값(시간·가속도·모달 전환 유형)을 토큰화하고 멀티브랜드 테마와 Figma 토큰 코드 변환 흐름 구성
- **문서화·배포 자동화** — Storybook 상태별 케이스, ADR, 토큰 네이밍, 컴포넌트 체크리스트를 정리하고 develop 병합 후 Storybook 빌드·Chromatic 배포, main 반영 후 Nexus 배포를 GitHub Actions로 자동화

# UX와 DX를 함께 설계한 기준

- **사용자 UX** — 모달의 포커스 복귀, 다중 오버레이 순서, 아이콘 버튼 접근성 이름, 터치 입력 환경에서 최소 44px 크기의 터치 영역과 모바일 화면 높이·로딩·오류·비활성 상태를 컴포넌트의 기본 동작과 테스트로 고정
- **개발자 DX** — 타입 자동완성과 속성 조합 제한, CJS·ESM·`.d.ts`·정적 CSS 패키지, Storybook 사용 예시, 토큰 자동 변환으로 올바른 구현 경로 제공
- **협업 기준** — Figma와 코드가 같은 토큰 이름을 사용하고, 상태·반응형·접근성·에셋 조건을 핸드오프 전에 확인하도록 문서화

반복 설명을 늘리는 대신, 같은 질문과 실수가 반복되지 않도록 판단 기준을 타입·도구·문서에 외부화하는 것을 DX의 목표로 삼음.

![Storybook — 색상 토큰 3계층(Primitive·Semantic·Brand)과 코드 사용 예시](/strongerDeer/project/nds_colors.jpg)

Primitive(원시 값) → Semantic(용도·의미) → Brand(브랜드) 3계층 색상 토큰과 타입 기반 코드 사용 예시. 컴포넌트는 Semantic 토큰을 우선 사용.

![Storybook — Button 표현 조합 갤러리(Semantic·Solid·Outline·Ghost × 컬러)](/strongerDeer/project/nds_button.jpg)

Semantic·Color × Solid·Outline·Ghost 조합을 한곳에서 관리하는 Button 표현 기준.

![Storybook — Modal(기본/Alert/Dialog) 크기별 오버레이](/strongerDeer/project/nds_modal.jpg)

Modal·Alert·Dialog 3유형과 크기, 버튼 배치, 스크롤, 비동기 로딩, 다중 모달 포커스를 하나의 API로 관리.

# 제품 채택과 운영

- **채택 범위** — Shop 앱 전체를 NDS `ThemeProvider`로 감싸 토큰·테마를 전역 적용. 로그인·주문·상품·이벤트 등 166개 제품 코드 파일이 NDS를 직접 가져오며, 공용 컴포넌트 폴더에서는 124개 중 66개(53.2%)가 사용
- **토큰 적용** — Style Dictionary가 생성한 CSS 변수 276개를 제공하고, Shop은 타입이 있는 토큰 객체와 프로젝트 테마 설정으로 값을 소비
- **배포 구조** — NDS와 Shop을 별도 Git 저장소로 운영. NDS는 `main` 반영 후 GitHub Actions로 Nexus에 배포하고 Shop은 업데이트 스크립트로 패키지 버전과 잠금 파일을 함께 갱신. 확인 시점의 소비 버전은 `0.1.37`
- **점진적 전환** — Button·Input·Flex·Icon 같은 범용 요소는 NDS로 수렴하되, 판매 채널별 표현이 필요한 체크박스처럼 제품 맥락이 강한 UI는 Shop에 남겨 시스템의 경계를 유지
- **API 확장** — Carousel 이미지 렌더 함수에 선택 인자를 추가해 기존 사용처를 깨지 않고 `next/image` 최적화를 수용하고, 검색 가능한 Select와 폼 라이브러리 호환성을 기능 추가 방식으로 확장

README에는 SemVer 원칙을 문서화했고, 공개 중단 API 없이 선택 인자를 추가하는 방식으로 하위 호환성을 유지했다. 다만 아직 `0.x` 단계이며 장기적인 주요 버전 전환과 마이그레이션 운영까지 검증한 상태는 아니다.

# 기술 문제와 해결

## 문제 1. Figma 토큰과 코드 토큰의 이름·값 불일치

**문제**: 토큰을 수기로 옮기면서 radius·shadow·spacing의 이름과 값이 Figma와 코드 사이에서 어긋나는 문제. 디자이너가 값을 바꿔도 코드에 언제, 정확히 반영됐는지 확인할 방법이 없음.

**해결**: Style Dictionary에 custom transform/format을 등록해 Figma 토큰을 TypeScript 객체와 CSS 변수로 동시 변환하는 파이프라인 구축.

아래 예시는 실제 변환 파이프라인에서 이름·값 변환과 출력 포맷을 연결하는 핵심 설정을 단순화한 코드.

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

컴포넌트에서는 타입이 있는 토큰 객체를 사용하고, 제품 앱은 CSS 변수로 theme 주입.

**결과**: 디자이너가 Figma에서 바꾼 토큰이 변환 스크립트 실행으로 CSS 변수와 TypeScript 상수에 동시 반영 — 수기 동기화로 생기던 이름·값 어긋남 제거.

## 문제 2. 모바일·크로스브라우저에서만 재현되는 문제

**문제**: 모달 내용에서 드래그를 시작해 배경 영역(backdrop)에서 놓으면 의도와 달리 모달이 닫힘. `will-change` 속성이 고정 위치의 기준을 바꾸어 모달 위치가 틀어지는 문제도 발생.

**원인 가설**: 닫힘 판정이 `click`(pointerup 위치)만 보고 있어, 드래그 시작 지점을 구분하지 못함.

**해결**: 포인터를 누른 시점(`pointerdown`)과 놓은 시점(`pointerup`)이 모두 배경 영역에서 발생한 경우만 닫히게 바꾸고, 주 입력이 아닌 포인터는 제외. 판정 로직을 순수 함수로 분리해 8개 사례로 테스트하고, 고정 위치를 깨뜨리던 `will-change`는 제거. 모바일 높이는 `vh`에서 `dvh`로 전환.

**결과**: 드래그 중 모달 오닫힘과 위치 틀어짐 제거, 판정 규칙을 테스트로 고정해 회귀 방지.

## 그 외 해결한 문제

- **환경 차이** → Storybook과 Next.js 제품 앱의 실행 환경이 다른 문제를, React 외부 의존성 관리로 중복 번들링을 막고 Vanilla Extract 정적 CSS가 소비 앱에서도 동일 적용되도록 구성. `recipe`로 허용할 표현 방식·크기 조합을 타입으로 제한
- **접근성 기준 산재** → 아이콘 버튼·비밀번호 보기·수량 입력의 접근성 이름 누락을 컴포넌트 단위 `aria-label`로 통일하고 서버 렌더링 결과와 CSS 소스 테스트로 회귀 방지. 터치 입력 환경에서 최소 44px 크기의 터치 영역과 아이콘 간격 규칙을 테스트로 고정

## 모션 규칙의 기반 구성

**문제**: 제품과 브랜드마다 가리키기·누르기·진입·모달 전환 시간을 개별 CSS로 작성하면 같은 상호작용도 속도와 인상이 달라지고, 변경 시 사용처를 모두 찾아야 함.

**해결**: `hover`·`click`·`entrance` 역할과 `fast`·`normal`·`slow` 시간·가속도 값을 테마의 모션 속성으로 분리하고, 모달이 테마별 전환 유형을 선택하도록 구성.

**현재 범위와 다음 과제**: 모달 중심의 기반까지 적용했으며 완성형 모션 라이브러리로 확장하지는 못함. 다음 단계에서는 피드백·진입·퇴장이라는 의미 토큰과 동작 줄이기(`prefers-reduced-motion`) 규칙을 공통 API와 Storybook 사례로 연결할 필요가 있음.

# 결과

- **Figma → 코드 토큰 자동 변환 정착** — 색상·간격·모서리 등 토큰 변경이 수기 동기화 없이 코드에 반영되고, 변환 흐름은 멀티브랜드 테마까지 확장
- **첫 운영 제품에 UI 기준 적용** — Shop 전역에 NDS 테마를 적용하고 로그인·주문·상품·이벤트 등 166개 제품 코드 파일에서 직접 사용. 공용 컴포넌트 124개 중 66개(53.2%)가 NDS를 소비하며, 최소 44px 터치 영역·아이콘 버튼 접근성 이름·다중 모달 포커스를 공통화
- **동작 기준을 테스트로 고정** — 포인터 입력 판정·서버 렌더링 결과·CSS 소스 테스트로 상태·동작 회귀 방지

# 배운 점과 다음 과제

공통 컴포넌트의 수보다 제품에서 반복되는 문제를 어디까지 라이브러리의 기본값과 제약으로 가져올지 결정하는 일이 더 중요했음. 디자인 시스템을 만드는 것과 조직에 채택시키는 것은 다른 문제라는 점도 배움. 첫 운영 소비 제품인 Shop 적용까지 진행했지만 담당 종료 시점까지 후속 제품 확장과 장기 마이그레이션 지표를 충분히 확인하지 못한 점은 한계로 남음.

다음에는 소비 제품별 도입 우선순위, 하위 호환이 깨지는 변경과 마이그레이션 정책, 사용 현황 측정을 초기 설계에 함께 포함하고자 함.

# 관련 자료

- [NDS 설계 슬라이드](https://www.figma.com/slides/H3he12dIt9FBNioyo72JvK) — 테마·컴포넌트·토큰 구조
- [기술 의사결정 기록(ADR)](https://www.notion.so/strongerdeer/34101a7a57f1811daab2cd6e3d469208) — 주요 설계 판단의 배경과 대안 비교
- [트러블슈팅 · 회고](https://www.notion.so/strongerdeer/34101a7a57f181758a05fed6e64bcc15) — 문제 정의부터 해결·회고까지
- [토큰 네이밍 시스템](https://www.notion.so/strongerdeer/2ca01a7a57f18014afc7c0c398faaee3) — 디자이너와의 공통 언어 정의
