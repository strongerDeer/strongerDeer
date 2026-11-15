import { SectionHeading } from '../common/SectionHeading';

export function BalanceGame() {
  const titleId = 'balance-game-title';

  return (
    <section id='balance-game' aria-labelledby={titleId}>
      <SectionHeading
        label='BALANCE GAME'
        title='몇 개의 취향이 저와 겹칠까요?'
        titleId={titleId}
      />
    </section>
  );
}
