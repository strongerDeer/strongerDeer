import { Section } from '@/components/common/Section';

import { Dashboard, DesignSystem, Shop } from './demoSections';

export function Demo() {
  return (
    <Section id='demo' label='간단 체험' title='설명 대신, 직접 눌러 보세요'>
      <DesignSystem />
      <Dashboard />
      <Shop />
    </Section>
  );
}
