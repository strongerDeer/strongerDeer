import { SectionHeading } from '@/components/common/SectionHeading';

// 방문 대시보드는 1차 배포 뒤에 붙인다 (우선순위 마지막, HJ 11/27)
import { CardDeck, /* Dashboard, */ DesignSystem, Shop } from './demoSections';

// 다른 섹션과 달리 Section 컴포넌트를 쓰지 않는다:
// 제목을 카드 무대 안에 넣어야 제목·카드가 함께 화면 가운데에 멈춰 있기 때문
export function Demo() {
  return (
    <section id='demo' aria-labelledby='demo-title' className='py-18'>
      <div className='mx-auto w-full max-w-page px-4 text-center'>
        {/* 스크롤하면 섹션이 멈추고 카드가 한 장씩 올라와 쌓인다 */}
        <CardDeck
          heading={
            <SectionHeading
              label='간단 체험'
              title='설명 대신, 직접 눌러 보세요'
              titleId='demo-title'
            />
          }
        >
          <DesignSystem />
          {/* <Dashboard /> 다시 붙일 때: 지금 번호가 화면 설정 01·Shop 02·대시보드 03이라 순서·번호 맞추기 */}
          <Shop />
        </CardDeck>
      </div>
    </section>
  );
}
