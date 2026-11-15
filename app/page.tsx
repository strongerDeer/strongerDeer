import {
  BalanceGame,
  Banner,
  Book,
  Contact,
  Demo,
  Hero,
  ResponseTime,
  StrongerDeer,
  Together,
} from '@/components/sections';

export default function Home() {
  return (
    <main>
      <Hero />
      <StrongerDeer />
      <BalanceGame />
      <Book />
      <Banner />
      <ResponseTime />
      <Demo />
      <Together />
      <Contact />
    </main>
  );
}
