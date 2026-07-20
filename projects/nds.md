---
index: 1
id: "nds"
type: "업무"
title: "NDS"
kor: "디자인 시스템 구축"
thumb: "/project_nds.gif"
period: "2025.02~운영 중"
description: "화면마다 반복될 UI 판단을, 어떻게 처음부터 하나의 시스템으로 고정했을까?"
detailLabel: "NDS 설계·운영 과정 보기"
tags: ["TypeScript", "React", "Design"]
skills: ["React", "TypeScript", "Vanilla Extract", "Style Dictionary", "Storybook", "Vitest", "GitHub Actions"]
icon: "Cpu"
metrics:
  [
    "배포 모듈 23종 중 20종이 자사 쇼핑몰에서 실사용 — 로그인·주문·상품·이벤트 등 코드 166개 파일 적용",
    "모달의 포커스·다중 오버레이·포인터 입력 판정을 기본 동작·테스트로 고정",
    "별도 저장소에서 GitHub Actions·Nexus를 거쳐 자사 쇼핑몰의 고정 버전으로 배포·운영",
  ]
highlights:
  [
    { value: "20/23", label: "배포 모듈 23종 중 20종이 자사 쇼핑몰에서 실사용" },
    { value: "166개 파일", label: "로그인·주문·상품·이벤트 등 자사 쇼핑몰 코드에서 디자인 시스템 직접 사용" },
    { value: "276개", label: "Style Dictionary가 생성한 CSS 변수 수" },
  ]
url: "https://www.figma.com/slides/H3he12dIt9FBNioyo72JvK"
urlType: "slides"
urlLabel: "NDS 설계 슬라이드"
codeDisclosure: "회사 저장소는 비공개이며, 설계 내용과 코드 예시는 공개 가능한 범위에서 구조를 단순화해 재구성함."
role: "디자인 시스템 설계 방향 주도 · 컴포넌트 라이브러리·토큰 변환 파이프라인 구축"
---

# 프로젝트 소개

공통 UI 기준 없이 시작한 신규 커머스. 화면마다 Button·Input·Modal·Table을 개별 구현하면 스타일·접근성·동작이 갈라지고, Figma와 코드 사이 토큰도 수기 동기화로 이름·값이 어긋남. 비용은 중복 코드만이 아니라 화면마다 다른 포커스·터치 동작, 누락된 접근성 이름, 같은 UI를 두 번 검수하는 QA 반복으로 이어짐.

오픈 초기부터 후속 제품 확장을 전제로, 이 판단을 하나의 기준으로 고정하기 위해 제안·설계한 사내 디자인 시스템(이하 NDS). Figma 토큰을 CSS 변수·TypeScript 상수로 변환하고, 복잡한 브라우저 동작을 컴포넌트 API·테스트에 담아 사내 npm 패키지로 배포. 운영 중인 자사 쇼핑몰의 고객 화면에 적용해 운영 환경에서 검증함.

![Figma에서 운영 제품까지 이어지는 NDS 토큰·컴포넌트·배포 흐름](/strongerDeer/project/nds_flow.svg)

# 왜 이 기술을 사용했나

- **React · TypeScript**: 제품별로 허용할 속성 조합을 타입으로 제한하고 공통 컴포넌트 API 제공
- **Vanilla Extract**: 소비하는 제품 앱의 스타일 파이프라인(자사 쇼핑몰은 Tailwind)에 의존하지 않고 정적 CSS로 배포 — 런타임 계산 없이 허용되지 않은 속성 조합을 타입 단계에서 차단
- **Style Dictionary**: Figma 토큰을 CSS 변수·TypeScript 상수로 자동 변환
- **Storybook**: 상태·접근성·사용 예시를 컴포넌트 단위로 문서화하고 디자인 검수 기준 공유
- **tsup · Nexus**: CJS·ESM·타입 선언·정적 CSS를 함께 빌드하고 사내 npm 패키지로 배포
- **Vitest · Playwright**: 포인터 경계 조건·접근성 규칙을 브라우저·마크업 테스트로 고정

# 역할

**팀 구성**: 디자인 1 · 프론트엔드 1

**직접 제안·구현**: 디자인 시스템 구조·도입 방향, 컴포넌트 API, 접근성 기준, Figma 토큰 → 코드 토큰 변환, Storybook 문서, tsup 번들링·Nexus 배포 흐름.

**디자이너와 합의**: Primitive·Semantic·Component 토큰 계층, 네이밍 규칙, 상태별 컴포넌트 스펙·제품 적용 기준.

# 문제 1. Figma 토큰과 코드 토큰의 이름·값 불일치

**문제**: 토큰을 수기로 옮기면서 radius·shadow·spacing의 이름·값이 Figma와 코드 사이에서 어긋남. 디자이너가 값을 바꿔도 코드에 언제·정확히 반영됐는지 확인할 방법이 없음.

**해결**: Style Dictionary에 custom transform/format을 등록해 Figma 토큰을 TypeScript 객체·CSS 변수로 동시 변환하는 파이프라인 구축. 아래는 이름·값 변환과 출력 포맷을 연결하는 핵심 설정을 단순화한 코드.

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

**결과**: 디자이너가 Figma에서 바꾼 토큰이 변환 스크립트 실행만으로 CSS 변수·TypeScript 상수에 동시 반영 — 수기 동기화로 생기던 이름·값 어긋남 제거. 변환 흐름은 멀티브랜드 테마까지 확장.

![색상 토큰 3계층 — Primitive 원시 값이 Semantic 용도 토큰을 거쳐 Brand로 참조되는 구조](/strongerDeer/project/nds_tokens.svg)

Primitive(원시 값) → Semantic(용도·의미) → Brand(브랜드) 3계층. 컴포넌트는 값을 직접 쓰지 않고 Semantic 토큰을 우선 참조해, 브랜드 교체와 값 변경을 한곳에서 흡수함.

# 문제 2. 모바일·크로스브라우저에서만 재현되는 모달 오닫힘

**문제**: 모달 내용에서 드래그를 시작해 배경 영역(backdrop)에서 놓으면 의도와 달리 모달이 닫힘. `will-change` 속성이 고정 위치 기준을 바꿔 모달 위치가 틀어지는 문제도 발생.

**원인 가설**: 닫힘 판정이 `click`(pointerup 위치)만 보고 있어 드래그 시작 지점을 구분하지 못함.

**해결**: 포인터를 누른 시점(`pointerdown`)과 놓은 시점(`pointerup`)이 모두 배경 영역에서 발생한 경우만 닫히게 변경, 주 입력이 아닌 포인터는 제외. 판정 로직을 순수 함수로 분리해 8개 사례로 테스트하고, 고정 위치를 깨뜨리던 `will-change`는 제거. 모바일 높이는 `vh` → `dvh`로 전환.

**결과**: 드래그 중 모달 오닫힘·위치 틀어짐 제거. 판정 규칙을 테스트로 고정해 회귀 방지.

![모달 닫힘 판정 — 누른 지점과 놓은 지점이 모두 배경일 때만 닫는 규칙](/strongerDeer/project/nds_pointer.svg)

click(놓은 위치)만 보던 판정을 pointerdown·pointerup 두 지점 비교로 전환. 둘 다 배경일 때만 닫고, 내용에서 시작했거나 주 입력이 아닌 포인터는 제외해 드래그 중 오닫힘을 제거함.

# 결과

- **첫 운영 제품에 UI 기준 적용** — 자사 쇼핑몰 전역을 NDS `ThemeProvider`로 감싸 토큰·테마를 전역 적용. 배포 모듈 23종 중 20종이 실사용 중이며, 로그인·주문·상품·이벤트 등 코드 166개 파일에서 NDS를 직접 소비. 최소 44px 터치 영역·아이콘 버튼 접근성 이름·다중 모달 포커스를 공통화
- **Figma → 코드 토큰 자동 변환 정착** — Style Dictionary가 생성한 CSS 변수 276개를 제공하고, 색상·간격·모서리 등 토큰 변경이 수기 동기화 없이 코드에 반영
- **자동화된 배포로 운영** — 디자인 시스템과 소비 앱을 별도 Git 저장소로 두고, `main` 반영 후 GitHub Actions로 Nexus에 배포. 공개 중단 API 없이 선택 인자를 추가하는 방식(SemVer)으로 하위 호환성 유지

**한계와 다음 과제** — 첫 운영 소비 제품 적용까지 진행했지만, 아직 후속 제품 확장·장기 마이그레이션 지표까지는 충분히 확인하지 못함. 공통 컴포넌트의 수보다 제품에서 반복되는 문제를 어디까지 라이브러리의 기본값·제약으로 가져올지 결정하는 일이 더 중요했고, 디자인 시스템을 만드는 것과 조직에 채택시키는 것은 다른 문제라는 점을 배움. 앞으로는 도입 우선순위, 하위 호환이 깨지는 변경·마이그레이션 정책, 사용 현황 측정을 초기 설계에 함께 포함하고자 함.

# 관련 자료

- [NDS 설계 슬라이드](https://www.figma.com/slides/H3he12dIt9FBNioyo72JvK) — 테마·컴포넌트·토큰 구조
- [기술 의사결정 기록(ADR)](https://www.notion.so/strongerdeer/34101a7a57f1811daab2cd6e3d469208) — 주요 설계 판단의 배경과 대안 비교
- [트러블슈팅 · 회고](https://www.notion.so/strongerdeer/34101a7a57f181758a05fed6e64bcc15) — 문제 정의부터 해결·회고까지
- [토큰 네이밍 시스템](https://www.notion.so/strongerdeer/2ca01a7a57f18014afc7c0c398faaee3) — 디자이너와의 공통 언어 정의
