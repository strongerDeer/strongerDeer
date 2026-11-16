import { Button } from '@/components/common/Button';
import { Section } from '@/components/common/Section';

export function BalanceGame() {
  return (
    <Section
      id='balance-game'
      label='밸런스 게임'
      title='몇 개의 취향이 저와 겹칠까요?'
      description='재미로 보는 밸런스 게임. 끌리는 쪽을 고르면 마지막에 제 선택과 비교해
        드려요. 고른 답은 언제든 바꿀 수 있어요.'
    >
      <p>1 / 7</p>
      <p> 0개 골랐어요</p>

      <Button size='sm'>이전</Button>
      <Button variant='solid' size='sm'>
        다음
      </Button>
    </Section>
  );
}
