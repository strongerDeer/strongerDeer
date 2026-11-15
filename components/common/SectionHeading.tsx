type SectionHeadingProps = {
  label?: string;
  title: string;
  headingLevel?: 'h2' | 'h3';
  titleId: string;
};

export function SectionHeading({
  label,
  title,
  headingLevel,
  titleId,
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
        className='text-[clamp(26px,5vw,50px)] leading-[1.3] tracking-[-0.02em] text-balance'
      >
        {title}
      </Heading>
    </hgroup>
  );
}
