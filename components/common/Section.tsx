import type { ReactNode } from 'react';

import { SectionHeading } from '@/components/common/SectionHeading';

type SectionProps = {
  id: string;
  label?: string;
  title: string;
  children?: ReactNode;
};
export function Section({ id, label, title, children }: SectionProps) {
  const titleId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={titleId}>
      <SectionHeading label={label} title={title} titleId={titleId} />
      {children}
    </section>
  );
}
