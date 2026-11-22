import { Button } from '@/components/common/Button';
import { DemoCard } from '@/components/sections/demoSections/DemoCard';
import { RadioGroup } from '@/components/sections/demoSections/RadioGroup';
import { ACCENTS } from '@/data/accents';

const RAINBOW =
  'conic-gradient(#f43f5e,#f59e0b,#22c55e,#06b6d4,#6366f1,#d946ef,#f43f5e)';

export function DesignSystem() {
  return (
    <DemoCard
      index={1}
      id='design-system'
      category='NDS · 디자인 시스템'
      title='화면 설정'
      description='테마·대비·강조색·모서리·글꼴이 전부 토큰이에요. 여기서 하나만 바꿔도 이 페이지 전체가 같이 바뀌어요.'
      action={
        <p className='text-sm font-bold'>
          강조색부터 눌러 보세요. 설정은 이 기기에만 저장돼요.
        </p>
      }
    >
      <div
        role='group'
        aria-label='화면 설정 토큰'
        className='flex flex-col gap-3 rounded-2xl bg-background-soft px-4.5 py-4'
      >
        <RadioGroup
          legend='테마'
          name='theme'
          options={['시스템', '라이트', '다크']}
        />
        <RadioGroup
          legend='대비'
          name='contrast'
          options={['기본', '고대비']}
        />

        <fieldset>
          <legend className='mb-1.5 text-sm font-bold text-foreground-muted'>
            강조색
          </legend>
          <div className='flex items-center gap-1.5'>
            {ACCENTS.map(({ name, color }, index) => (
              <label
                key={name}
                title={name}
                className='group grid size-8 cursor-pointer place-items-center rounded-full border-2 border-transparent has-checked:border-foreground has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent'
              >
                <input
                  type='radio'
                  name='accent'
                  value={name}
                  defaultChecked={index === 0}
                  className='sr-only'
                />
                <span
                  aria-hidden='true'
                  className='grid size-5.5 place-items-center rounded-full text-xs font-extrabold text-white'
                  style={{ background: color }}
                >
                  <span className='hidden group-has-checked:inline'>✓</span>
                </span>
                <span className='sr-only'>{name}</span>
              </label>
            ))}
            <label
              title='직접 고르기'
              className='relative inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full border-2 border-transparent pr-2.5 pl-1 has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent'
            >
              <input
                type='color'
                defaultValue='#615ef0'
                aria-label='강조색 직접 고르기'
                className='absolute inset-0 size-full cursor-pointer opacity-0'
              />
              <span
                aria-hidden='true'
                className='size-5.5 rounded-full'
                style={{ background: RAINBOW }}
              />
              <span aria-hidden='true' className='text-xs font-semibold'>
                직접
              </span>
            </label>
          </div>
          <p
            aria-live='polite'
            className='mt-2 text-xs text-foreground-muted'
          />
        </fieldset>

        <fieldset>
          <legend className='mb-1.5 text-sm font-bold text-foreground-muted'>
            모서리
          </legend>
          <div className='flex items-center gap-2.5'>
            <input
              type='range'
              id='radius-range'
              min={0}
              max={2}
              step={0.1}
              defaultValue={1}
              aria-label='모서리 둥글기 배율'
              className='min-w-0 flex-1 accent-accent'
            />
            <output htmlFor='radius-range' className='font-mono text-sm'>
              1.0
            </output>
          </div>
        </fieldset>

        <RadioGroup
          legend='폰트'
          name='font'
          options={['고딕', '명조', '기기 기본']}
        />

        <details className='text-sm'>
          <summary className='cursor-pointer py-1 font-bold text-foreground-muted'>
            토큰 값 직접 고치기{' '}
            <small className='font-normal'>(입력 후 Enter)</small>
          </summary>
        </details>

        <Button size='sm' className='self-start'>
          처음 설정으로
        </Button>
      </div>
    </DemoCard>
  );
}
