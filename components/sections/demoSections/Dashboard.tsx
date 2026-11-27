import { Button } from '@/components/common/Button';
import { DemoCard } from '@/components/sections/demoSections/DemoCard';

const KPIS = [
  { label: '머문 시간', value: '0:00' },
  { label: '본 섹션', value: '0' },
  { label: '누른 것', value: '0' },
];
const SECTION_COUNT = 9;

export function Dashboard() {
  return (
    <DemoCard
      index={3}
      id='dashboard'
      category='NOVERA 대시보드'
      title='내 방문 대시보드'
      description='들어온 순간을 0초로 놓고, 지금까지 어디서 얼마나 머물고 뭘 눌렀는지 보여드려요. 어디에도 저장하지 않아요.'
      action={
        <Button variant='solid' size='sm' className='mt-1.5'>
          대시보드 열기
        </Button>
      }
    >
      <button
        type='button'
        aria-label='내 방문 대시보드 열기 (실시간 미리보기)'
        className='flex w-full cursor-pointer flex-col gap-3 rounded-2xl border border-transparent bg-background-soft p-4.5 text-left transition hover:border-accent motion-safe:hover:-translate-y-0.5'
      >
        <span
          aria-hidden='true'
          className='flex items-center gap-1.5 text-sm font-bold text-foreground-muted'
        >
          <span className='size-2 rounded-full bg-[#2fb67c]' />
          지금 이 방문
        </span>

        <span aria-hidden='true' className='grid grid-cols-3 gap-2'>
          {KPIS.map(({ label, value }) => (
            <span
              key={label}
              className='block rounded-tile bg-background-card px-2.5 py-2'
            >
              <span className='block text-xs text-foreground-muted'>
                {label}
              </span>
              <span className='block text-xl font-extrabold tabular-nums'>
                {value}
              </span>
            </span>
          ))}
        </span>

        <span aria-hidden='true' className='flex h-12 items-end gap-1'>
          {Array.from({ length: SECTION_COUNT }, (_, i) => (
            <span
              key={i}
              className='h-[6%] min-h-0.75 flex-1 rounded-t-[3px] bg-line'
            />
          ))}
        </span>

        <span className='text-sm font-bold text-accent'>
          눌러서 크게 보기 →
        </span>
      </button>
    </DemoCard>
  );
}
