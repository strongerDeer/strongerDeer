import { Section } from '@/components/common/Section';

// 방문 대시보드는 1차 배포 뒤에 붙인다 (우선순위 마지막, HJ 11/27)
import { CardDeck, /* Dashboard, */ DesignSystem, Shop } from './demoSections';

export function Demo() {
  return (
    <Section id='demo' label='간단 체험' title='설명 대신, 직접 눌러 보세요'>
      {/* 스크롤하면 섹션이 멈추고 카드가 한 장씩 올라와 쌓인다 */}
      <div className='mt-8'>
        <CardDeck>
          <DesignSystem />
          {/* <Dashboard /> 다시 붙일 때: 지금 번호가 화면 설정 01·Shop 02·대시보드 03이라 순서·번호 맞추기 */}
          <Shop />
        </CardDeck>
      </div>
    </Section>
  );
}
