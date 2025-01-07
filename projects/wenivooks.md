---
index: 3
id: "wenivooks"
type: "업무"
title: "WeniVooks"
thumb: "/project_wenivooks.jpg"
kor: "위니북스"
period: "2023.09~2024.07(약 11개월)"
description: "개발 입문자들을 위한 온라인 개발 교안 서비스"
background: ""
tags: ["Next.js", "React", "JavaScript", "Sass"]
skills: ["Next.js", "JavaScript", "Sass"]
icon: BookOpenText
metrics:
  [
    "검색엔진 최적화(SEO)로 3개월 만에 검색 노출 900회+, 클릭수 1,746회 달성(구글 서치 콘솔 기준)",
"프로젝트 팀장으로서 주도적으로 반응형 디자인, 테마 설정 등 UI/UX를 고려하여 기능 구현",
"React SPA 기술을 사용하던 회사에 Next.js 기술 도입",
  ]
url: "https://www.books.weniv.co.kr/"
role: "4인 프로젝트(디자인1, 프론트엔드3) - 프로젝트 리드/프론트엔드 개발 50% 기여"

---

# 🤔 배경

ICT 교육 회사에서 Notion으로 제공하던 개발 교육 콘텐츠를 웹 서비스로 전환하는 프로젝트입니다. Notion으로 교안을 운영하면서 발생한 문제점들이 있었습니다

:::div{.motivation}

## Notion 교안 사용시 문제점

- 페이지 이동이 불편하여 학습 흐름이 끊김
  - 다음/이전 페이지 이동을 위해 상위 페이지로 이동 후 페이지 선택 해야 하는 번거로움
- 실습 코드 작성 시 Notion과 VS Code 간 잦은 전환으로 인한 학습 흐름 방해
- 개인화된 학습 환경(다크모드, 폰트 크기 등) 설정 불가
- 검색엔진 노출 한계로 콘텐츠 접근성 저하

:::

이러한 문제들을 해결하고 더 많은 사람들이 접근할 수 있는 웹 교안 서비스를 개발하게 되었습니다.

# 📝 기획

- **편리한 탐색**: 직관적인 목차와 페이지 네비게이션 제공
- **통합 학습 환경**: 실시간 코드 실습과 미리보기 환경 제공
- **사용자 맞춤형**: 다양한 테마 옵션으로 개인화된 학습 환경 구성
- **접근성 강화**: 다양한 사용자를 고려한 웹 접근성 구현

# 🛠️ 기술 스택

## 프론트엔드

- **Next.js**: SEO 최적화를 위한 SSR 구현 / 체계적인 교안 구조화를 위한 페이지 기반 라우팅
- **Sass**: 테마 변수 관리 및 스타일 모듈화 / 다크모드 등 테마 스타일링
- **기타 라이브러리**:
  - `CodeMirror`: 실시간 코드 에디터 구현, 문법 하이라이팅
  - `remark`, `rehype`, `rehype-pretty-code` 등 마크다운 문서 변환

## 배포

- **AWS Lightsail**: 애플리케이션 배포 및 Node.js 환경 구성
- **GitHub Actions**: 자동 배포 파이프라인 구축

# 🔍 기능

:::div{.function}

- 전체 책 목차
  ![](/strongerDeer/project/wenivooks_list.jpg)
  - 사이드바를 통한 전체 교안 목차 제공(토글 기능 제공)
- 페이지 목차  
  ![](/strongerDeer/project/wenivooks_toc.gif)
  - 현재 페이지의 세부 목차 제공(토글 기능 제공)
  - 스크롤 위치에 따른 현재 섹션 하이라이팅
  - 클릭 시 해당 영역으로 이동
- 페이지 이동 버튼 제공
  ![](/strongerDeer/project/wenivooks_page.gif)

  - 하단 고정 페이지 이동 버튼으로 책 흐름에 방해 받지 않고 페이지 이동 가능

- HTML/CSS 코드 에디터
  ![](/strongerDeer/project/wenivooks_editor.gif)

  - 실시간 미리보기
  - 코드 하이라이팅
  - VS Code 없이 바로 실습 가능한 환경

- 사용자 맞춤 환경
  ![](/strongerDeer/project/wenivooks_theme.gif)

  - 라이트/다크 모드 지원
  - 기본/세리프 형태 폰트 및 크기 조절 가능
  - 사용자 설정 로컬스토리지 저장 및 적용

- 관련 내용 매뉴얼 작성

  ![](/strongerDeer/project/wenivooks_manual.jpg)

  - 마크다운 작성 가이드 및 교안 등록 프로세스 매뉴얼 제작
  - 향후 유사 프로젝트 진행 시 참고 가능한 문서 확보

:::

# 🚨 트러블슈팅

## 다크모드 및 사용자 설정 구현

:::div{.details}

### 문제

- Next.js SSR과 클라이언트 설정 불일치
  - 초기 렌더링 시 hydration 경고
  - localStorage 접근으로 인한 SSR/CSR 불일치
  - 페이지 로드 시 테마 깜빡임 현상
- 다양한 사용자 설정 관리
  - 테마(라이트/다크/자동)
  - 폰트 스타일와 크기
  - 사이드바 상태
  - windows OS 스타일 깨짐 문제

### 해결과정

- 초기 설정 로직 분리

```js
const BeforeFn = () => {
  // localStorage에서 사용자 설정 복원
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme !== "auto" && savedTheme !== null) {
    document.body.classList.add(savedTheme);
  }

  // 폰트 스타일, 크기, 메뉴 상태 복원
  const savedFontStyle = localStorage.getItem("fontStyle");
  const savedFontSize = localStorage.getItem("fontSize");
  const savedClose = localStorage.getItem("menu");

  // ... 클래스 적용 로직
};
```

- Context API를 활용한 상태 관리

```js
const { theme, fontStyle, fontSize, menu } = useContext(SettingContext);
```

- 조건부 클래스 적용

```js
<body
  className={classNames(
    theme !== 'auto' && theme,
    fontStyle,
    fontSize !== null && `size${fontSize}`,
    menu ? 'side-close' : '',
    isWindows && 'windows'
  )}
  suppressHydrationWarning={true}
>
```

- OS 구분 처리

```js
useEffect(() => {
  if (navigator.userAgent.includes("Windows")) {
    setIsWindows(true);
  }
}, []);
```

### 인사이트

- Next.js SSR 환경에서의 클라이언트 상태 관리
- SCSS 변수를 활용한 체계적인 색상 관리
- 크로스 브라우징 대응

:::

## 프로젝트 관리 프로세스 개선

:::div{.details}

### 문제 상황

- 주니어 개발자로 구성된 팀에서 PR 리뷰 프로세스 미확립
- 각자 개발 현황 파악 어려움
- 비개발 직군의 서비스 사용을 위한 가이드 부재
- 퇴사로 인한 인수인계 이슈

### 해결 과정

- PR 리뷰 프로세스 정리

  - 체계적인 PR 리뷰 프로세스와 목적에 대한 이해가 부족한 상태
  - 코드 리뷰는 승인 개념이 아닌 피드백 공유 및 서로의 성장이 목적임을 명확히 공유
  - 리뷰어의 코멘트 확인 후 작성자 판단으로 진행
  - 이슈 발견 시 새로운 이슈 생성하여 추적

- 작업 현황 관리

  - 작업 단위별 이슈 생성
  - 라벨링을 통한 우선순위 관리

- 문서화 시스템 구축

  - 기술 문서

    - 프로젝트 구조 설명
    - 주요 기능 구현 방식
    - 트러블슈팅 기록

  - 사용자 매뉴얼
    - 마크다운 작성 가이드
    - 교안 등록 프로세스
    - 자주 발생하는 문제 해결 방법

### 인사이트

- 문서화의 필요성과 가치 이해
- 주니어 개발자 팀에서의 효과적인 협업 방식 습득

:::

# 🎯 성과 및 기여

- React SPA 기술을 사용하던 회사에 Next.js 기술 도입
- 프로젝트 팀장으로서 주도적으로 반응형 디자인, 테마 설정 등 UI/UX를 고려하여 기능 구현
- 검색엔진 최적화(SEO)로 3개월 만에 검색 노출 900회+, 클릭수 1,746회 달성(구글 서치 콘솔 기준)
  :::div{.function}

  - 검색엔진 최적화(SEO)
    ![](/strongerDeer/project/wenivooks_seo.jpg)
    - robots.txt, sitemap.xml 설정
    - OG 메타데이터 최적화로 URL 공유 시 콘텐츠 가독성 향상
  - 런칭 3개월 만에 구글 검색 노출 900회+ 달성
    ![](/strongerDeer/project/wenivooks_click.jpg)
  - 총 클릭수 1,746회, 노출수 31.7만 기록 (2024.05-07 3달 기준)
    ![](/strongerDeer/project/wenivooks_google.jpg)
    :::

# 💡 인사이트

## 프로젝트 관리와 리더십

- 4인 팀의 리더로서 일정 지연과 소통 문제를 주간 회의 체계화와 문서화로 해결
- 다양한 아이디어 중 우선순위를 정하고 집중하여 프로젝트 완성도 향상

## 기술적 성장

- 메타 태그 최적화, sitemap 설정 등 SEO 기법 학습과 적용
- 검색 엔진이 가진 마케팅 효과의 중요성을 학습

## 협업과 문서화

- 타 직군과의 협업을 위한 마크다운 사용 가이드 작성 과정에서 명확한 문서 작성 규칙과 가독성의 중요성을 학습
- 사용자 관점에서 이해하기 쉬운 문서 작성법 습득

:::div{.motivation}

이 프로젝트는 기술적 성장과 함께 리더십, 협업, 문서화 등 개발자로서 필요한 다양한 역량을 키울 수 있는 값진 경험이었습니다.

특히 주니어로만 구성된 프로젝트에서 팀 리드 역할을 수행하며 겪은 시행착오들은 앞으로 더 나은 팀원이자 리더가 되기 위한 중요한 배움이 되었습니다.

또한 다양한 직군과의 협업을 통해 기술 이외의 관점을 이해하고, 이를 종합적으로 고려하여 더 나은 서비스를 만들어가는 과정의 중요성을 깨달았습니다. 이러한 경험들은 앞으로의 프로젝트에서 더욱 발전시켜 나가고 싶은 값진 자산이 되었습니다.
:::
