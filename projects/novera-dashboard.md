---
index: 2
id: "novera-dashboard"
type: "업무"
title: "NAD"
kor: "NOVERA Analytics Dashboard"
thumb: "/project_nad.jpg"
period: "2026~진행중"
description: "오픈 시점이 다른 이벤트의 성과를 어떻게 같은 기준으로 비교했을까?"
detailLabel: "성과·품질 측정 체계 보기"
tags: ["TypeScript", "React", "Next.js"]
skills: ["Next.js 16", "React 19", "TypeScript", "GA4 Data API", "Google Search Console", "Recharts", "Lighthouse", "Core Web Vitals", "AWS Amplify"]
icon: "ChartSpline"
metrics:
  [
    "SPHERE 1회차 DAU 내부 목표 대비 122% 달성 추적",
    "실사용자 Core Web Vitals 통과: LCP 1.44초·INP 88ms·CLS 0",
    "Lighthouse 접근성 96·SEO 100 확인, GA4·Search Console·어드민 데이터 통합",
  ]
url: ""
codeDisclosure: "회사 코드와 원본 운영 데이터는 비공개이며, 화면과 코드 예시는 공개 가능한 범위에서 비식별화·단순화해 재구성했습니다."
role: "측정 필요성 제안부터 항목 정의·대시보드 구축까지 주도"
---

# 프로젝트 소개

이벤트 성과와 NOVERA Shop의 프론트엔드 품질을 한곳에서 확인하는 사내 대시보드. GA4·Search Console·어드민·Core Web Vitals 데이터를 연결해 비교 기준과 개선 우선순위 제공.

# 배경과 문제

신규 Shop의 이벤트 성과를 판단할 KPI와 회차별 비교 기준이 없는 상황. 오픈 시점이 다른 이벤트와 오프라인 유입을 같은 기준으로 비교하기 어려웠고, 성능·접근성·SEO·이미지 전송량은 개별 도구에 분산.

운영 담당자에게는 목표 도달 여부를 판단할 지표, 프론트엔드에는 배포 후 품질 회귀를 지속 감지할 기준이 필요한 상태.

# 역할

**팀 구성**: 디자인 1 · 프론트엔드 1 · 백엔드 1 · 운영 1

**담당 범위**: 측정 필요성 제안, KPI 정의, 데이터 연결 협의, 정보 구조와 차트 설계, 프론트엔드 구현·배포. 운영 담당자와 성과 기준을 합의하고, 백엔드와 GA4·어드민 데이터 연동 범위 조율. Shop 품질 지표와 주간 점검 기준 수립.

# 왜 이 기술을 사용했나

- **Next.js 16 · React 19**: 지표별 서버 조회와 필터·비교 차트 상호작용을 한 화면에서 구성
- **TypeScript**: 출처마다 다른 지표 응답을 공통 모델로 정규화하고 집계 규칙을 타입으로 제한
- **GA4 Data API · Search Console**: 행동 이벤트와 검색 유입 데이터를 공식 API 기준으로 수집
- **Recharts**: 회차별 누적 도달, 기간별 추세, 품질 지표를 동일한 시각 체계로 구현
- **AWS Amplify**: 사내 접근 범위를 유지한 배포·운영

# 운영·경영진용 성과 대시보드

**사용자·목적**: 운영 담당자·경영진이 이벤트 목표 도달 여부와 유입·참여·가입 흐름, 채널별 성과(PV·순방문·일평균 DAU·회원가입·목표 도달률)를 한 화면에서 빠르게 확인.

**화면 구성**: 기간·회차·채널 필터와 핵심 KPI 카드, 오픈 후 7/14/30일 상대기간 비교, 온·오프라인·외부(카페24) 채널 유입·전환, GA4·Search Console·Admin 데이터의 식별률·커버리지 표시.

## 기술 문제와 해결

### 회차별 오픈일이 다른 문제

단순 날짜 비교 시 먼저 열린 이벤트가 유리한 문제. 일별 데이터를 `오픈 후 N일째`로 재인덱싱하고 동일 기간의 누적 도달을 비교.

아래 예시는 회차별 오픈 날짜를 상대 일차로 정규화하는 실제 비교 로직의 핵심을 단순화한 코드.

```ts
const daysSinceOpen = (date: string, openDate: string) =>
  Math.floor(
    (new Date(`${date}T00:00:00Z`).getTime() -
      new Date(`${openDate}T00:00:00Z`).getTime()) /
      86400000
  ) + 1;
```

비교 로직을 순수 함수로 분리하고 오픈일=1일째, 누락 일자=null, 누적 정렬 규칙을 테스트로 고정.

### GA4 이벤트가 회차별로 분리되지 않는 문제

`space_*` 이벤트명만으로 조회할 때 여러 회차의 데이터가 섞이는 문제. 이벤트명과 `pagePath`를 AND 조건으로 결합해 회차별 이벤트만 집계.

아래 예시는 이벤트 조건과 페이지 경로 조건을 함께 적용하는 GA4 필터 구성의 핵심을 비식별화한 코드.

```ts
const andPage = (eventFilter: unknown, pagePaths: string[]) => ({
  andGroup: { expressions: [eventFilter, buildPageFilter(pagePaths)] },
});
```

좋아요 토글은 단순 count가 아닌 `liked - unliked` 기준으로 순좋아요 계산. Admin API 토큰 자동 갱신과 KST 날짜 기준 통일로 반복 조회와 집계 오류 방지.

## 결과

- 이벤트 회차별 성과 비교 기준과 데이터 측정 체계 마련
- SPHERE 1회차 일평균 DAU, 내부 목표 대비 **122% 달성** 추적
- 운영·경영진이 목표 도달과 채널별 성과를 한 화면에서 확인하는 내부 도구로 활용

# 프론트엔드 품질 모니터링

**사용자·목적**: 프론트엔드·디자인이 배포 후 성능·접근성·SEO·이미지·번들 회귀를 감지. 실사용자 지표를 합격 기준으로 두고 Lighthouse는 주간 변화 비교에 활용.

**화면 구성**: 페이지별 Core Web Vitals·Lighthouse 점수, 이미지 전송량·번들·타입·린트 오류, 운영 release 커밋 기준 이전 배포 대비 변화, 회귀·노이즈 구분과 주간 분석 코멘트, canonical·hreflang·JSON-LD·sitemap·robots 자동 점검.

![Shop 품질 모니터링 — 재측정·회귀 판정과 주간 자동 분석 코멘트](/strongerDeer/project/nad_quality.jpg)

:span[실측 데이터]{.realdata} 동일 배포본 재측정 여부, 이미지·번들·성능 변화, 회귀·노이즈, 주간 분석 코멘트 구성.

![실사용자 지표(CrUX) — LCP 1.44s·INP 88ms·CLS 0·LCP 구성 분해와 28일 추세](/strongerDeer/project/nad_crux.jpg)

:span[실측 데이터]{.realdata} 실사용자(CrUX) 기준 LCP 1.44s·INP 88ms·CLS 0 판정과 LCP 구성 요소, 28일 추세 구성.

## 기술 문제와 해결

### 실사용자 지표와 테스트 점수가 다른 문제

Lighthouse lab LCP가 네트워크 스로틀과 이미지 전송량에 따라 크게 흔들리는 문제. lab 지표는 참고값으로 두고 field LCP·INP·CLS를 합격 기준으로 분리.

- field LCP: 2.5s/4.0s
- INP: 200ms/500ms
- CLS: 0.1/0.25
- lab TBT·bundle·image weight: 회귀 감지용 보조 신호

### 측정 노이즈를 코드 회귀로 오인하는 문제

- 동일 배포본 재측정으로 실제 코드 변화와 측정 편차 분리
- baseline을 운영 release 커밋으로 고정
- TBT 노이즈 밴드 적용으로 허위 경보 제거
- 외부 API 캐시와 주간 자동 측정으로 반복 조회 비용 축소

## 결과

- 실사용자 Core Web Vitals 통과: **LCP 1.44초 · INP 88ms · CLS 0**
- Lighthouse 기준 **접근성 96 · SEO 100** 확인
- 성능·SEO·이미지·번들 회귀를 주기적으로 확인하는 품질 기준 마련
