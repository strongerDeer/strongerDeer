import type { ReactNode } from 'react';

// 제목 크기: 보통 섹션 제목(display) / 페이지 마지막 한 문장(closing)
export type TitleSize = 'display' | 'closing';

const TITLE_SIZE_CLASS: Record<TitleSize, string> = {
  display: 'text-display',
  closing: 'max-w-[16em] mx-auto text-closing',
};

type SectionHeadingProps = {
  label?: string;
  title: ReactNode; // 보통은 글자, 효과가 필요하면 컴포넌트 (예: TypingText)
  headingLevel?: 'h2' | 'h3';
  titleId: string;
  titleSize?: TitleSize;
};

export function SectionHeading({
  label,
  title,
  headingLevel,
  titleId,
  titleSize = 'display',
}: SectionHeadingProps) {
  const Heading = headingLevel ?? 'h2';

  return (
    <hgroup className='text-center font-bold'>
      {label && (
        <p className='mb-2 text-[13px] tracking-[0.06em] text-accent'>
          {label}
        </p>
      )}
      <Heading
        id={titleId}
        className={`mb-3 tracking-[-0.02em] text-balance ${TITLE_SIZE_CLASS[titleSize]}`}
      >
        {title}
      </Heading>
    </hgroup>
  );
}
