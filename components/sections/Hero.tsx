export function Hero() {
  return (
    <section id='hero' className='text-center'>
      <div className='flex flex-col justify-center'>
        <code>{`<strong>`}</code>
        <span className='text-xl font-bold'>
          <code>{`De`}</code>
          <code className='text-accent'>{`{sign || velop}`}</code>
          <code>{`er`}</code>
        </span>
        <code>{`</strong>`}</code>
      </div>
      <div className='flex justify-center gap-2'>
        <p>Designer 디자인·퍼블리싱 7년 7개월</p>
        <code className='text-accent'>||</code>
        <p>Developer 프론트엔드 3년 11개월</p>
      </div>
      <p>스크롤</p>
    </section>
  );
}
