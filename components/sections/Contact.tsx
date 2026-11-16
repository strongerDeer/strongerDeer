import { Button } from '@/components/common/Button';
import { ButtonLink } from '@/components/common/ButtonLink';
import { Section } from '@/components/common/Section';

export function Contact() {
  return (
    <Section
      id='contact'
      title='취향이 같아도 달라도, 같이 만들어볼 이야기가 궁금하지 않으세요?'
    >
      <div className='mt-10 flex flex-wrap items-center justify-center gap-2'>
        <a
          href='mailto:stronger_deer@naver.com'
          className='rounded-full bg-background-soft px-4 py-2'
        >
          stronger_deer@naver.com
        </a>
        <Button size='sm'>주소복사</Button>
        <Button size='sm'>내 방문 기록 보기</Button>

        <ButtonLink
          href='https://github.com/strongerDeer'
          target='_blank'
          rel='noopener noreferrer'
        >
          GitHub
        </ButtonLink>
      </div>
    </Section>
  );
}
