import { Button } from '@/components/common/Button';
import { Section } from '@/components/common/Section';

export function Contact() {
  return (
    <Section
      id='contact'
      title='취향이 같아도 달라도, 같이 만들어볼 이야기가 궁금하지 않으세요?'
    >
      <Button size='sm'>주소복사</Button>
      <Button size='sm'>내 방문 기록 보기</Button>
      <Button size='sm'>GitHub</Button>
    </Section>
  );
}
