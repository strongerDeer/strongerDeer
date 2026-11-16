import { Button } from '@/components/common/Button';
import { Section } from '@/components/common/Section';

export function ResponseTime() {
  return (
    <Section
      id='response-time'
      label='0.1초 체험'
      title='언제부터 답답해질까요?'
    >
      <Button variant='outline' size='lg'>
        좋아요
      </Button>
      <Button variant='solid' size='sm'>
        여기서부터 답답해요!
      </Button>
      <Button type='reset' size='sm'>
        다시하기
      </Button>
    </Section>
  );
}
