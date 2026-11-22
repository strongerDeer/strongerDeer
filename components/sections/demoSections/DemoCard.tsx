import type { ReactNode } from 'react';

type DemoCardProps = {
  id: string;
  index: number;
  category: string;
  title: string;
  description?: string;
  direction?: 'row' | 'col';
  action?: ReactNode;
  children?: ReactNode;
};

export function DemoCard({
  id,
  index,
  category,
  title,
  description,
  direction = 'row',
  action,
  children,
}: DemoCardProps) {
  const titleId = `${id}-title`;
  const number = String(index).padStart(2, '0');

  return (
    <article
      id={id}
      aria-labelledby={titleId}
      className={`mx-auto w-full max-w-4xl rounded-3xl border border-line bg-background-card p-4 text-left shadow-card sm:p-6 ${
        direction === 'row'
          ? 'grid gap-3.5 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:items-start md:gap-6'
          : 'flex flex-col gap-3.5'
      }`}
    >
      <div className='flex flex-col items-start gap-2'>
        <p className='text-sm font-bold text-accent'>
          <span className='mr-1.5 font-mono text-xs text-foreground-muted'>
            {number}
          </span>
          {category}
        </p>
        <h3 id={titleId} className='text-xl font-bold'>
          {title}
        </h3>
        {description && <p className='text-foreground-muted'>{description}</p>}
        {action}
      </div>
      <div className='min-w-0'>{children}</div>
    </article>
  );
}
