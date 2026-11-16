import { ButtonLink } from '@/components/common/ButtonLink';

export function Banner() {
  return (
    <section id='banner'>
      <h2>Banner</h2>

      <ButtonLink variant='solid' href='https://page0127.com' target='_blank'>
        내 책장 만들어 보기
      </ButtonLink>
      <ButtonLink href='https://page0127.com/stronger_khj' target='_blank'>
        강혜진 개발자의 서재 보기
      </ButtonLink>
    </section>
  );
}
