const CAREERS = [
  { role: 'Designer', text: '디자인·퍼블리싱 7년 7개월' },
  { role: 'Developer', text: '프론트엔드 3년 11개월' },
];

export function Hero() {
  return (
    <section id='hero' aria-label='소개' className='px-4 text-center'>
      <div className='flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center gap-6'>
        <p className='font-mono'>
          <span className='sr-only'>De{'{sign||velop}'}er</span>
          <code
            aria-hidden='true'
            className='flex flex-col items-center gap-[0.1em]'
          >
            <span className='text-[clamp(16px,3.4vw,30px)] text-foreground-muted'>
              {'<strong>'}
            </span>
            <span className='text-[clamp(30px,9.2vw,104px)] leading-tight font-bold tracking-tight'>
              De<span className='text-accent'>{'{sign||velop}'}</span>er
            </span>
            <span className='text-[clamp(16px,3.4vw,30px)] text-foreground-muted'>
              {'</strong>'}
            </span>
          </code>
        </p>

        <div className='flex flex-col items-center justify-center gap-2 sm:flex-row'>
          {CAREERS.map(({ role, text }, index) => (
            <span key={role} className='contents'>
              {index > 0 && (
                <span
                  aria-hidden='true'
                  className='font-mono font-bold text-accent'
                >
                  ||
                </span>
              )}
              <span className='rounded-full border border-line bg-background-card px-3.5 py-1.5 text-sm text-foreground-muted'>
                <b className='text-foreground'>{role}</b> {text}
              </span>
            </span>
          ))}
        </div>

        <p className='text-sm'>
          <span aria-hidden='true'>↓ </span>스크롤
        </p>
      </div>
    </section>
  );
}
