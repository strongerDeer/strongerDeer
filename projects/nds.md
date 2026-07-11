---
index: 3
id: "nds"
type: "업무"
title: "NDS"
kor: "디자인 시스템 구축"
thumb: "/project_nds.gif"
period: "2025~진행중"
description: "여러 프로덕트에서 재사용 가능한 공통 컴포넌트와 Figma-코드 디자인 토큰 변환 흐름 구축"
tags: ["TypeScript", "React", "Design"]
skills: ["React", "TypeScript", "Vanilla Extract", "Style Dictionary", "Storybook"]
icon: "Cpu"
metrics:
  [
    "Button, Input, Modal, Table 등 공통 컴포넌트 30종 구축",
    "Figma 토큰 → Style Dictionary → 코드 토큰 변환 흐름 구성",
    "Storybook에 컴포넌트 사용 예시와 상태별 케이스 정리",
  ]
url: "https://www.figma.com/slides/H3he12dIt9FBNioyo72JvK"
urlType: "slides"
urlLabel: "NDS 설계 슬라이드"
role: "디자인 시스템 설계 방향 주도 · 컴포넌트 라이브러리와 토큰 변환 흐름 구현 참여"
---

# 문제

shop client/admin 등 여러 프로덕트에서 버튼, 입력창, 모달, 테이블 같은 기본 UI를 개별 구현하고 있었습니다. 그 결과 스타일·접근성·동작이 프로덕트마다 달라졌고, Figma와 코드 사이의 디자인 토큰도 수기로 동기화하던 상황이었습니다.

# 역할

웹디자인·퍼블리싱 경험을 바탕으로 디자인 시스템의 구조와 방향을 제안하고, React, TypeScript, Vanilla Extract 기반 컴포넌트 라이브러리를 구축했습니다. 토큰 체계, Figma 토큰 → 코드 토큰 변환 흐름, 컴포넌트 API, 접근성 기준, Storybook 문서화를 담당했고, 디자이너와는 토큰 정의와 컴포넌트 스펙을, 각 제품 팀과는 도입 기준을 협의했습니다.

# 해결

- Button, Input, Modal, Table, Select, Accordion, Carousel, Pagination, Stepper 등 공통 컴포넌트 30종과 색상·간격·타이포 등 Foundation 토큰 설계 및 구현
- 소비 앱의 프레임워크에 맞춰 이미지를 최적화할 수 있도록 Carousel·Avatar 등에 `renderImage` 렌더프롭을 도입해 Next.js `next/image` 연동을 컴포넌트 외부에서 주입 가능하게 설계
- Select에 검색형(searchable) combobox 모드를 추가하고, Stepper controlled 모드 input 상태 동기화, Modal full 사이즈·다중 모달 포커스 관리 등 실제 제품 요구를 반영해 컴포넌트 API 확장

  ![Storybook — Select 검색형 combobox 드롭다운](/strongerDeer/project/nds_select.jpg)

  옵션이 많은 상황을 위한 검색형 Select입니다. 하나의 컴포넌트가 기본 선택, 제어(controlled), 상태 메시지, 아이콘, 드롭다운 위치, 검색까지 커버하도록 API를 확장했습니다.
- Figma 토큰을 코드에서 사용할 수 있는 형태로 변환하는 흐름 구성
- 색상, 간격, radius, elevation, z-index, motion 토큰화 및 멀티브랜드 테마 시스템 구성
- Storybook에 컴포넌트 사용 예시와 상태별 케이스를 정리해 디자이너·개발자 간 확인 기준 마련
- 컴포넌트 개발 가이드, 토큰 가이드, 체크리스트, 테마 구조 문서화

![Storybook — 색상 토큰 3계층(Primitive·Semantic·Brand)과 코드 사용 예시](/strongerDeer/project/nds_colors.jpg)

색상 토큰 문서 화면입니다. Primitive(기본 팔레트) → Semantic(의미 기반) → Brand(브랜드) 3계층으로 토큰을 나누고, `import { color } from '@tokens'` 형태로 코드에서 타입과 함께 쓰도록 설계했습니다. 컴포넌트에서는 Semantic 색상을 우선 사용하도록 가이드했습니다.

![Storybook — Button variant 갤러리(Semantic·Solid·Outline·Ghost × 컬러)](/strongerDeer/project/nds_button.jpg)

Button의 variant 매트릭스입니다. Semantic(Primary/Secondary/Tertiary/Outline/Ghost)과 컬러 버튼(Green/Blue/Red/Yellow) × Solid/Outline/Ghost 조합을 한 곳에서 문서화해, 제품별로 버튼 스타일이 갈라지지 않도록 기준을 고정했습니다.

# 기술적으로 어려웠던 문제

## Figma 토큰과 코드 토큰의 이름·값 불일치

디자인 토큰을 수기로 옮기면 radius, shadow, spacing 이름이 제품마다 달라지고 Figma와 코드가 쉽게 어긋납니다. Style Dictionary에 custom transform/format을 등록해 Figma 토큰을 TypeScript 객체와 CSS 변수로 동시에 변환했습니다.

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

이 방식으로 컴포넌트 구현에서는 타입이 있는 토큰 객체를 쓰고, 제품 앱에서는 CSS 변수로 theme를 주입할 수 있게 했습니다.

## 제품 앱 환경과 Storybook 환경이 달라지는 문제

디자인 시스템은 Storybook 안에서만 동작하면 충분하지 않고, Next.js 기반 제품 앱에서도 동일하게 동작해야 했습니다. 그래서 React는 제품 앱과 중복 번들링되지 않도록 외부 의존성으로 관리하고, Vanilla Extract 기반 스타일이 제품 앱에서도 동일하게 적용되는지 확인했습니다.

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

아이콘 전용 버튼, 비밀번호 보기 버튼, 수량 Stepper처럼 화면상 텍스트가 없는 컨트롤은 접근성 이름이 빠지기 쉽습니다. 컴포넌트 단위에서 `aria-label`을 부여하고, SSR markup과 CSS 소스를 테스트해 회귀를 막았습니다.

- 아이콘 전용 Input button: `비밀번호 보기`, `수량 감소`, `수량 증가`
- Stepper: 증가/감소 버튼과 number input에 접근성 이름 제공
- coarse pointer 환경에서 최소 터치 타깃 44px 이상 보장
- 우측 아이콘이 2개 이상일 때 touch target이 겹치지 않도록 간격 규칙 테스트

## 모바일·크로스브라우저에서만 재현되는 문제

여러 제품이 소비하는 컴포넌트라 특정 환경에서만 재현되는 문제가 곧 전 제품의 버그가 됩니다. 모바일 뷰포트에서 주소창 높이 변화로 모달이 잘리는 문제는 `vh`를 `dvh`로 교체해 해결했고, iOS Safari에서 버튼 `onClick`이 간헐적으로 동작하지 않던 문제, Modal 내부 드래그 시 backdrop이 오닫히던 문제를 각각 재현 경로를 좁혀 컴포넌트 단위로 방어했습니다.

![Storybook — Modal(기본/Alert/Dialog) 크기별 오버레이](/strongerDeer/project/nds_modal.jpg)

Modal 컴포넌트입니다. 기본 Modal·Alert·Dialog 3유형과 sm/md/lg/full 크기, 버튼 개수·정렬·비율, 긴 컨텐츠 스크롤, 비동기 로딩, 다중 모달 포커스까지 하나의 API로 관리합니다.

# 결과

- 공통 컴포넌트 변경 사항을 기존 배포 파이프라인을 통해 shop client/admin 등 제품 앱에 반영
- 터치 타깃 크기, 아이콘 전용 버튼의 접근성 이름, 다중 모달 포커스 등 접근성 기준을 컴포넌트 단위에서 보강
- Figma 토큰을 코드 토큰으로 변환하는 흐름을 마련해 반복 수작업과 불일치 가능성 감소

# 공개 가능한 근거 방식

Storybook은 외부 배포 URL이 비공개이므로, 로컬에서 실행한 토큰 계층·컴포넌트 API 화면만 캡처로 담고 나머지는 컴포넌트 범위와 품질 기준 중심으로 설명했습니다. 캡처에 포함된 기본 팔레트 색상값은 배포된 사이트에서도 확인 가능한 수준만 노출하고, 패키지명·레지스트리 주소·제품별 브랜드 테마 값·비공개 저장소 URL은 제외했습니다.

- 공개 가능한 근거: 토큰 계층 구조·컴포넌트 API 화면(로컬 Storybook), 토큰 변환 구조, 패키지 빌드 전략, 접근성 테스트 기준
- 비공개 처리: 사내 npm registry URL, Storybook 배포 URL, 제품별 브랜드 테마 매핑, 내부 저장소 URL

# 관련 자료

[NDS 설계 슬라이드](https://www.figma.com/slides/H3he12dIt9FBNioyo72JvK)는 공개 가능한 범위로 정리한 보조 자료입니다. 포트폴리오 본문에서는 의사결정과 구현 방식을 먼저 설명하고, 슬라이드는 테마·컴포넌트·토큰 구조를 시각적으로 확인하는 자료로 분리했습니다.
