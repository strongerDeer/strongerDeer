import {
  BalanceGame,
  Contact,
  Banner,
  Book,
  Demo,
  Hero,
  ResponseTime,
  StrongerDeer,
  Together,
} from "@/components/sections";

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
