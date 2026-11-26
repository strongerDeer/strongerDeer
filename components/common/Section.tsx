import type { ReactNode } from 'react';

import {
  SectionHeading,
  type TitleSize,
} from '@/components/common/SectionHeading';

type SectionProps = {
  id: string;
  label?: string;
  title: string;
  description?: string;
  titleSize?: TitleSize;
  children?: ReactNode;
};
export function Section({
  id,
  label,
  title,
  children,
  description,
  titleSize,
}: SectionProps) {
  const titleId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={titleId} className='py-18'>
      <div className='mx-auto w-full max-w-page px-4 text-center'>
        <SectionHeading
          label={label}
          title={title}
          titleId={titleId}
          titleSize={titleSize}
        />
        {description && (
          <p className='mx-auto mb-7 max-w-[60ch] text-center text-balance break-keep text-foreground-muted'>
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
