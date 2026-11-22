import { Button } from '@/components/common/Button';
import { Section } from '@/components/common/Section';

export function Book() {
  return (
    <Section
      id='book'
      label='개발 책장'
      title='당신의 인생 개발책은?'
      description='제가 읽은 개발·디자인 책이에요. 책을 눌러 보세요.'
    >
      <Button variant='solid'>추천하기</Button>
    </Section>
  );
}
