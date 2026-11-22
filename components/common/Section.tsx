import type { ReactNode } from 'react';

import { SectionHeading } from '@/components/common/SectionHeading';

type SectionProps = {
  id: string;
  label?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};
export function Section({
  id,
  label,
  title,
  children,
  description,
}: SectionProps) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className='flex min-h-[50vh] items-center justify-center'
    >
      <div className='mx-auto w-full max-w-page px-6 text-center'>
        <SectionHeading label={label} title={title} titleId={titleId} />
        {description && (
          <p className='text-center text-balance break-keep text-foreground-muted'>
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
