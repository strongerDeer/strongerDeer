import { nanumCoding } from "@font";
import Logo from "./shared/Logo";

export default function Hero() {
  return (
    <div className="wrap">
      <section>
        <div className={`code ${nanumCoding.className}`}>
          <span className="text-primary">{`<strong>`}</span>
          <wbr />
          <span className="font-bold">De</span>
          {`{`}
          <span className="text-point">sign</span>
          ||
          <span className="text-point">velop</span>
          {`}`}
          <span className="font-bold">er</span>
          <wbr />
          <span className="text-primary">{`<strong>`}</span>
        </div>

        <Logo className="text-6xl sm:text-8xl md:text-9xl" />
        <p className="text-xl mt-10 mb-4 font-light">👋 안녕하세요</p>

        <p className="text-3xl leading-snug font-thin">
          <span className=" border-b border-gray-500">
            0.3초의 짧은 인터랙션,
          </span>
          <br />
          디테일한 사용자 경험을 고민하는
          <br />
          <strong>강혜진</strong> 프론트엔드 개발자입니다.
        </p>
      </section>
    </div>
  );
}
