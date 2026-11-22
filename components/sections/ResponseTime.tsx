import { Button } from '@/components/common/Button';
import { Section } from '@/components/common/Section';
import { SPEED_STEPS } from '@/data/speedSteps';

export function ResponseTime() {
  // 정적 화면: 첫 단계. 단계 진행·지연·결과는 7일차에 상태로
  const step = 0;
  const current = SPEED_STEPS[step];

  return (
    <Section
      id='response-time'
      label='0.1초 체험'
      title='언제부터 답답해질까요?'
      description="버튼을 누를 때마다 반응이 조금씩 늦어져요. 답답해지는 순간 '여기서부터 답답해요!'를 눌러 주세요."
    >
      <div className='mx-auto mt-6 flex max-w-140 flex-col items-center gap-4'>
        {/* 체험 카드 */}
        <div className='flex w-full max-w-90 flex-col items-center gap-3.5 rounded-[20px] border border-line bg-background-card px-5 py-7 shadow-card'>
          <p
            aria-live='polite'
            className='text-sm text-foreground-muted tabular-nums'
          >
            {step + 1} / {SPEED_STEPS.length}
          </p>
          {/* 이 섹션 전용 큰 버튼: 보라 테두리 2px + 보라 글자 */}
          <button
            type='button'
            className='min-h-14 min-w-55 cursor-pointer rounded-3xl border-2 border-accent bg-background-card px-6 py-3 text-lg font-extrabold text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
          >
            {current.label}
          </button>
        </div>

        {/* 진행 점: 지난 단계는 보라, 남은 단계는 회색 (장식이라 스크린리더 숨김) */}
        <ol aria-hidden='true' className='flex gap-1.5'>
          {SPEED_STEPS.map(({ label }, i) => (
            <li
              key={label}
              className={`size-2.5 rounded-full ${i < step ? 'bg-accent' : 'bg-line'}`}
            />
          ))}
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

        {/* 결과 문구 자리 */}
        <p aria-live='polite' className='min-h-[1.6em] text-lg font-bold' />
      </div>
    </Section>
  );
}
