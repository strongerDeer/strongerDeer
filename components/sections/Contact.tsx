import { ChartColumn } from 'lucide-react';

import { Button } from '@/components/common/Button';
import { ButtonLink } from '@/components/common/ButtonLink';
import { Section } from '@/components/common/Section';
import { TypingText } from '@/components/common/TypingText';

export function Contact() {
  return (
    <Section
      id='contact'
      title={
        <TypingText text='취향이 같아도 달라도, 같이 만들어볼 이야기가 궁금하지 않으세요?' />
      }
      titleSize='closing'
      // 페이지 마지막 장면: 화면을 거의 채우고 내용은 세로 가운데
      className='flex min-h-[90svh] flex-col justify-center'
    >
      <div className='mt-10 flex flex-wrap items-center justify-center gap-2'>
        <a
          href='mailto:stronger_deer@naver.com'
          className='rounded-full bg-background-soft px-4 py-2'
        >
          stronger_deer@naver.com
        </a>

        <Button size='sm'>주소 복사</Button>
        <div className='flex flex-wrap gap-2'>
          <Button size='sm'>
            <ChartColumn aria-hidden='true' className='size-[1.15em]' />내 방문
            기록 보기
          </Button>

          <ButtonLink
            href='https://github.com/strongerDeer'
            target='_blank'
            rel='noopener noreferrer'
            size='sm'
          >
            GitHub
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
