'use client';

import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/common/Button';
import { Section } from '@/components/common/Section';
import { SPEED_STEPS } from '@/data/speedSteps';

// 반응을 보여 준 뒤 다음 단계 버튼이 나오기까지의 시간
const NEXT_STEP_DELAY_MS = 300;

// ready: 누를 수 있음 / waiting: 눌렀고 반응 기다리는 중 / reacted: 반응함(완료 글자)
type Phase = 'ready' | 'waiting' | 'reacted';

export function ResponseTime() {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>('ready');
  // 지금 걸려 있는 타이머 id. 화면에 안 보이는 값이라 state 대신 ref
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const current = SPEED_STEPS[step];
  const isLastStep = step === SPEED_STEPS.length - 1;

  // 섹션이 사라질 때 남은 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function handlePress() {
    if (phase !== 'ready') return;
    setPhase('waiting');

    // 단계마다 정해진 만큼 늦게 반응
    timerRef.current = setTimeout(() => {
      setPhase('reacted');
      if (isLastStep) return; // 마지막 단계 마무리는 다음 단계에서

      // 완료 글자를 잠깐 보여 주고 다음 버튼으로
      timerRef.current = setTimeout(() => {
        setStep((prev) => prev + 1);
        setPhase('ready');
      }, NEXT_STEP_DELAY_MS);
    }, current.delay);
  }

  return (
    <Section
      id='response-time'
      label='0.1초 체험'
      title='언제부터 답답해질까요?'
      description="버튼을 누를 때마다 반응이 조금씩 늦어져요. 답답해지는 순간 '여기서부터 답답해요!'를 눌러 주세요."
    >
      <div className='mx-auto mt-6 flex max-w-140 flex-col items-center gap-4'>
        <div className='flex w-full max-w-90 flex-col items-center gap-3.5 rounded-[20px] border border-line bg-background-card px-5 py-7 shadow-card'>
          <p
            aria-live='polite'
            className='text-sm text-foreground-muted tabular-nums'
          >
            {step + 1} / {SPEED_STEPS.length}
          </p>
          <button
            type='button'
            onClick={handlePress}
            aria-busy={phase === 'waiting'}
            className='min-h-14 min-w-55 cursor-pointer rounded-3xl border-2 border-accent bg-background-card px-6 py-3 text-lg font-extrabold text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-busy:cursor-progress'
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
            disabled
            className='disabled:opacity-40'
          >
            여기서부터 답답해요!
          </Button>
          <Button size='sm'>다시 하기</Button>
        </div>

        <p aria-live='polite' className='min-h-[1.6em] text-lg font-bold' />
      </div>
    </Section>
  );
}
