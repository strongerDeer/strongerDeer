import { Button } from '@/components/common/Button';
import { Section } from '@/components/common/Section';

export function BalanceGame() {
  return (
    <Section
      id='balance-game'
      label='밸런스 게임'
      title='몇 개의 취향이 저와 겹칠까요?'
    >
      <Button size='sm'>이전</Button>
      <Button variant='solid' size='sm'>
        다음
      </Button>
    </Section>
  );
}
