"use client";

import { useReportWebVitals } from "next/web-vitals";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

// GA4 의 event value 는 정수만 받는다.
// CLS 는 0~1 소수라 1000배로 보정하고, 나머지(ms 단위)는 반올림한다.
const toGaValue = (name: string, value: number) =>
  Math.round(name === "CLS" ? value * 1000 : value);

/**
 * Core Web Vitals 를 GA4 로 보낸다.
 *
 * INP 는 로컬 코드만으로는 합격 여부를 알 수 없다 — 실제 사용자의 입력 지연이라
 * 필드 데이터가 있어야 판정된다(모바일·데스크톱 각각 p75 200ms 이하가 양호).
 * 그래서 개선 작업보다 먼저 계측을 붙여 전후 비교 기준을 만든다.
 *
 * gtag() 대신 dataLayer 에 직접 넣는 이유 — 지표가 gtag.js 로드보다 먼저 발생할 수
 * 있는데, dataLayer 는 GA 인라인 스크립트가 먼저 만들어두므로 큐에 쌓였다가 처리된다.
 */
const WebVitals = () => {
  useReportWebVitals((metric) => {
    if (typeof window === "undefined") return;
    // GA 미설정(NEXT_PUBLIC_GA_ID 없음)이면 dataLayer 자체가 없다 — 조용히 넘어간다.
    if (!window.dataLayer) return;

    window.dataLayer.push([
      "event",
      metric.name,
      {
        value: toGaValue(metric.name, metric.value),
        // 같은 지표가 여러 번 갱신되므로, GA 에서 중복을 걸러낼 수 있게 id 를 함께 보낸다.
        metric_id: metric.id,
        metric_value: metric.value,
        metric_rating: metric.rating, // good | needs-improvement | poor
        metric_delta: metric.delta,
        metric_navigation_type: metric.navigationType,
        // 사용자 행동이 아니므로 참여 이벤트로 집계되지 않게 한다.
        non_interaction: true,
      },
    ]);
  });

  return null;
};

export default WebVitals;
