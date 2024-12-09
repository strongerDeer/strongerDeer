import { nanumCoding } from "@font";
import Logo from "./shared/Logo";

export default function Hero() {
  return (
    <section className="hero">
      <div>
        <div className={`code ${nanumCoding.className}`}>
          <span className="text-primary">{`<strong>`}</span>
          <span className="font-bold">De</span>
          {`{`}
          <span className="text-point">sign</span>
          ||
          <span className="text-point">velop</span>
          {`}`}
          <span className="font-bold">er</span>
          <span className="text-primary">{`<strong>`}</span>
        </div>

        <Logo className="text-9xl" />
        <p>👋 안녕하세요</p>

        <p>
          <span>0.3초의 짧은 인터랙션,</span>
          <br />
          디테일한 사용자 경험을 고민하는
          <br />
          프론트엔드 개발자 강혜진입니다.
        </p>
      </div>
    </section>
  );
}
