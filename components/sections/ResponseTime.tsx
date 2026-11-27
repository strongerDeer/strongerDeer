'use client';

import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/common/Button';
import { Section } from '@/components/common/Section';
import { EMAIL, EMAIL_COPIED_TOAST } from '@/data/contact';
import { SPEED_STEPS } from '@/data/speedSteps';
import { copyText } from '@/lib/copyText';
import { showToast } from '@/lib/toastStore';

// 반응을 보여 준 뒤 다음 단계 버튼이 나오기까지의 시간
const NEXT_STEP_DELAY_MS = 300;

// ready: 누를 수 있음 / waiting: 눌렀고 반응 기다리는 중 / reacted: 반응함(완료 글자)
type Phase = 'ready' | 'waiting' | 'reacted';

// 체험이 끝난 방식. 끝나기 전엔 null
type Result =
  | { kind: 'stopped'; stoppedStep: number } // "여기서부터 답답해요"를 누름
  | { kind: 'endured'; isCopied: boolean }; // 마지막 단계까지 참음

// 1000ms 이상은 초로: 300 → "300ms", 1500 → "1.5초"
function formatDelay(ms: number) {
  return ms >= 1000 ? `${ms / 1000}초` : `${ms}ms`;
}

// 결과 문구: 큰 글씨 한 줄 + 작은 설명
function describeResult(result: Result, extraPressCount: number) {
  const extraPressNote =
    extraPressCount > 0
      ? ` 기다리는 동안 ${extraPressCount}번 더 누르셨어요.`
      : '';

  if (result.kind === 'endured') {
    return {
      headline: '끝까지 참으셨어요! 3초 지연까지 버티셨네요!',
      detail:
        (result.isCopied
          ? '마지막 버튼은 진짜로 제 이메일을 복사했어요.'
          : '마지막 버튼은 제 이메일 복사 버튼이었어요.') + extraPressNote,
    };
  }

  const { label, delay } = SPEED_STEPS[result.stoppedStep];
  if (delay === 0) {
    return {
      headline: `'${label}' 단계에서 멈췄어요`,
      detail:
        '0ms는 추가 지연 없이 반응하는 기준 단계예요. 다음 단계부터 지연이 조금씩 붙어요.' +
        extraPressNote,
    };
  }
  return {
    headline: `${formatDelay(delay)} 지연이 걸린 '${label}' 단계에서 멈췄어요`,
    detail: '버튼 하나의 몇백 ms 차이도 이렇게 느껴져요.' + extraPressNote,
  };
}

export function ResponseTime() {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>('ready');
  const [result, setResult] = useState<Result | null>(null);
  // 반응을 기다리는 동안 또 누른 횟수 (답답함의 증거)
  const [extraPressCount, setExtraPressCount] = useState(0);
  // 지금 걸려 있는 타이머 id. 화면에 안 보이는 값이라 state 대신 ref
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const current = SPEED_STEPS[step];
  const isLastStep = step === SPEED_STEPS.length - 1;
  const isFinished = result !== null;
  const hasStarted = step > 0 || phase !== 'ready';
  const resultText = result && describeResult(result, extraPressCount);

  function clearTimer() {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  }

  // 섹션이 사라질 때 남은 타이머 정리
  useEffect(() => {
    return clearTimer;
  }, []);

  function handlePress() {
    if (isFinished) return;
    if (phase === 'waiting') {
      setExtraPressCount((count) => count + 1);
      return;
    }
    if (phase !== 'ready') return;
    setPhase('waiting');

    // 마지막 단계: 복사는 누른 바로 그 순간에 한다.
    // 3초 뒤에 복사하면 "방금 클릭"이 아니라서 사파리 등이 거부한다
    const copyPromise = isLastStep ? copyText(EMAIL) : null;

    // 단계마다 정해진 만큼 늦게 반응
    timerRef.current = setTimeout(async () => {
      setPhase('reacted');
      if (copyPromise) {
        const isCopied = await copyPromise;
        setResult({ kind: 'endured', isCopied });
        if (isCopied) showToast(EMAIL_COPIED_TOAST);
        return;
      }

      // 완료 글자를 잠깐 보여 주고 다음 버튼으로
      timerRef.current = setTimeout(() => {
        setStep((prev) => prev + 1);
        setPhase('ready');
      }, NEXT_STEP_DELAY_MS);
    }, current.delay);
  }

  function handleStop() {
    clearTimer();
    // 기다리는 중이거나 방금 반응했으면 지금 단계, 다음 버튼을 보고 있으면 직전 단계
    const stoppedStep = phase === 'ready' ? Math.max(step - 1, 0) : step;
    setResult({ kind: 'stopped', stoppedStep });
    setPhase('ready'); // 기다리던 중이었다면 로딩 커서 끄기
  }

  function handleReset() {
    clearTimer();
    setStep(0);
    setPhase('ready');
    setResult(null);
    setExtraPressCount(0);
  }

  return (
    <Section
      id='response-time'
      // 헤더 아래 한 화면을 꽉 채우고 내용은 세로 가운데 (체험에만 집중하게)
      className='flex min-h-[calc(100svh-var(--header-h))] flex-col justify-center'
      label='0.1초 체험'
      title='언제부터 답답해질까요?'
      description="버튼을 누를 때마다 반응이 조금씩 늦어져요. 답답해지는 순간 '여기서부터 답답해요!'를 눌러 주세요."
    >
      <div className='mx-auto mt-6 flex max-w-140 flex-col items-center gap-4'>
        <div className='flex w-full max-w-90 flex-col items-center gap-3.5 rounded-card border border-line bg-background-card px-5 py-7 shadow-card'>
          <p
            aria-live='polite'
            className='text-sm text-foreground-muted tabular-nums'
          >
            {step + 1} / {SPEED_STEPS.length}
          </p>
          <button
            type='button'
            onClick={handlePress}
            disabled={isFinished}
            aria-busy={phase === 'waiting'}
            className='min-h-14 min-w-55 cursor-pointer rounded-3xl border-2 border-accent bg-background-card px-6 py-3 text-lg font-extrabold text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-default disabled:opacity-60 aria-busy:cursor-progress'
          >
            {phase === 'reacted' ? current.doneLabel : current.label}
          </button>
        </div>

        <ol aria-hidden='true' className='flex gap-1.5'>
          {SPEED_STEPS.map(({ label }, i) => {
            // 지난 단계이거나, 지금 단계가 이미 반응했으면 채운 점
            const isDone = i < step || (i === step && phase === 'reacted');
            return (
              <li
                key={label}
                className={`size-2.5 rounded-full ${isDone ? 'bg-accent' : 'bg-line'}`}
              />
            );
          })}
        </ol>

        <div className='flex flex-wrap justify-center gap-2'>
          <Button
            variant='solid'
            size='sm'
            onClick={handleStop}
            disabled={!hasStarted || isFinished}
            className='disabled:opacity-40'
          >
            여기서부터 답답해요!
          </Button>
          <Button size='sm' onClick={handleReset}>
            다시 하기
          </Button>
        </div>

        <p
          aria-live='polite'
          className='min-h-[1.6em] text-center text-lg font-bold'
        >
          {resultText && (
            <>
              {resultText.headline}
              <small className='mt-1 block text-sm font-normal text-foreground-muted'>
                {resultText.detail}
              </small>
            </>
          )}
        </p>
      </div>
    </Section>
  );
}
