---
index: 3
id: "nds"
type: "업무"
title: "NDS"
kor: "디자인 시스템 구축"
thumb: "/project_nds.gif"
period: "2025~진행중"
description: "제품마다 달라지던 UI 상태와 동작을 어떻게 하나의 기준으로 만들었을까?"
detailLabel: "토큰과 컴포넌트 설계 보기"
tags: ["TypeScript", "React", "Design"]
skills: ["React", "TypeScript", "Vanilla Extract", "Style Dictionary", "Storybook"]
icon: "Cpu"
metrics:
  [
    "Button, Input, Modal, Table 등 공통 UI 모듈 20여 개 설계·구현",
    "Figma 토큰 → 코드 토큰 자동 변환 파이프라인 구축",
    "접근성·포커스·모바일 동작 기준을 컴포넌트 단위로 공통화",
  ]
url: "https://www.figma.com/slides/H3he12dIt9FBNioyo72JvK"
urlType: "slides"
urlLabel: "NDS 설계 슬라이드"
codeDisclosure: "회사 저장소는 비공개이며, 설계 내용과 코드 예시는 공개 가능한 범위에서 구조를 단순화해 재구성했습니다."
role: "디자인 시스템 설계 방향 주도 · 컴포넌트 라이브러리와 토큰 변환 파이프라인 구축"
---

# 프로젝트 소개

Shop client·admin 등 여러 제품에서 함께 사용하는 사내 디자인 시스템. 공통 UI 모듈, 디자인 토큰, Storybook 문서와 제품 반영 흐름 구축.

# 배경과 문제

제품마다 Button·Input·Modal·Table을 개별 구현해 스타일·접근성·동작이 달라지는 문제. Figma와 코드 사이의 토큰도 수기로 동기화해 이름과 값이 쉽게 어긋나는 상황.

# 역할

**팀 구성**: 디자인 1.5 · 프론트엔드 1.5

**담당 범위**: 디자인 시스템 구조와 도입 방향 제안, 토큰 체계, 컴포넌트 API, 접근성 기준, Storybook 문서화, Figma 토큰 → 코드 토큰 변환 파이프라인 구현. 디자이너와 토큰·컴포넌트 스펙을 정리하고 제품 적용 기준 조율.

# 왜 이 기술을 사용했나

- **React · TypeScript**: 제품별 요구를 variant와 타입으로 제한하고 공통 컴포넌트 API 제공
- **Vanilla Extract**: 런타임 스타일 계산 없이 정적 CSS를 생성하고 variant 오사용을 타입 단계에서 차단
- **Style Dictionary**: Figma 토큰을 CSS 변수와 TypeScript 상수로 자동 변환
- **Storybook**: 상태·접근성·사용 예시를 컴포넌트 단위로 문서화하고 디자인 검수 기준 공유

# 구현

- Button, Input, Modal, Table, Select, Accordion, Carousel, Pagination, Stepper 등 제품에서 반복 사용하는 공통 UI 모듈 20여 개와 색상·간격·타이포 등 Foundation 토큰 설계·구현
- 소비 앱의 프레임워크에 맞춰 이미지를 최적화할 수 있도록 Carousel·Avatar 등에 `renderImage` 렌더프롭을 도입해 Next.js `next/image` 연동을 컴포넌트 외부에서 주입 가능하게 설계
- Select에 검색형(searchable) combobox 모드를 추가하고, Stepper controlled 모드 input 상태 동기화, Modal full 사이즈·다중 모달 포커스 관리 등 실제 제품 요구를 반영해 컴포넌트 API 확장
- Figma 토큰을 코드에서 사용할 수 있는 형태로 변환하는 흐름 구성
- 색상, 간격, radius, elevation, z-index, motion 토큰화 및 멀티브랜드 테마 시스템 구성
- Storybook에 컴포넌트 사용 예시와 상태별 케이스를 정리해 디자이너·개발자 간 확인 기준 마련
- 컴포넌트 개발 가이드, 토큰 가이드, 체크리스트, 테마 구조 문서화

![Storybook — 색상 토큰 3계층(Primitive·Semantic·Brand)과 코드 사용 예시](/strongerDeer/project/nds_colors.jpg)

Primitive → Semantic → Brand 3계층 색상 토큰과 타입 기반 코드 사용 예시. 컴포넌트는 Semantic 토큰을 우선 사용.

![Storybook — Button variant 갤러리(Semantic·Solid·Outline·Ghost × 컬러)](/strongerDeer/project/nds_button.jpg)

Semantic·Color × Solid·Outline·Ghost 조합을 한곳에서 관리하는 Button variant 기준.

![Storybook — Modal(기본/Alert/Dialog) 크기별 오버레이](/strongerDeer/project/nds_modal.jpg)

Modal·Alert·Dialog 3유형과 크기, 버튼 배치, 스크롤, 비동기 로딩, 다중 모달 포커스를 하나의 API로 관리.

# 기술 문제와 해결

## Figma 토큰과 코드 토큰의 이름·값 불일치

토큰을 수기로 옮길 때 radius·shadow·spacing 이름과 값이 어긋나는 문제. Style Dictionary에 custom transform/format을 등록해 TypeScript 객체와 CSS 변수로 동시 변환.

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

## 제품 앱 환경과 Storybook 환경이 달라지는 문제

Storybook과 Next.js 제품 앱의 실행 환경이 달라지는 문제. React를 외부 의존성으로 관리해 중복 번들링을 막고, Vanilla Extract의 정적 CSS가 소비 앱에서도 동일하게 적용되도록 구성.

아래 예시는 제품에서 허용할 Button variant와 size 조합을 타입으로 제한하는 recipe 구조를 단순화한 코드.

```ts
export const buttonRecipe = recipe({
  base: buttonBase,
  variants: {
    variant: {
      primary: primaryButton,
      secondary: secondaryButton,
    },
    size: {
      sm: smallButton,
      md: mediumButton,
    },
  },
});
```

## 접근성 기준이 컴포넌트마다 흩어지는 문제

아이콘 버튼·비밀번호 보기·수량 Stepper에서 접근성 이름이 누락되는 문제. 컴포넌트 단위 `aria-label`과 SSR markup·CSS 소스 테스트로 회귀 방지.

- 아이콘 전용 Input button: `비밀번호 보기`, `수량 감소`, `수량 증가`
- Stepper: 증가/감소 버튼과 number input에 접근성 이름 제공
- coarse pointer 환경에서 최소 터치 타깃 44px 이상 보장
- 우측 아이콘이 2개 이상일 때 touch target이 겹치지 않도록 간격 규칙 테스트

## 모바일·크로스브라우저에서만 재현되는 문제

**문제**: 모달 내용에서 드래그를 시작해 backdrop에서 놓으면 의도와 달리 모달이 닫혔다. `will-change` 속성이 fixed 위치 기준을 바꾸어 모달 위치가 틀어지는 문제도 있었다.

**해결**: `pointerdown`과 `pointerup`이 모두 backdrop에서 발생한 경우만 닫히게 바꾸고, 주 포인터가 아닌 입력은 제외. 판정 로직을 순수 함수로 분리해 8개 케이스로 테스트하고, fixed 위치를 깨뜨리던 `will-change`는 제거. 모바일 높이는 `vh`에서 `dvh`로 전환.

# 결과

- 공통 컴포넌트 변경 사항을 기존 배포 파이프라인을 통해 shop client/admin 등 제품 앱에 반영
- 터치 타깃 크기, 아이콘 전용 버튼의 접근성 이름, 다중 모달 포커스 등 접근성 기준을 컴포넌트 단위에서 보강
- Figma 토큰을 코드 토큰으로 변환하는 흐름을 마련해 반복 수작업과 불일치 가능성 감소

# 관련 자료

[NDS 설계 슬라이드](https://www.figma.com/slides/H3he12dIt9FBNioyo72JvK) — 테마·컴포넌트·토큰 구조.
