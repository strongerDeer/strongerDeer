import Image from "next/image";

export default function Education() {
  return (
    <section>
      <h2 className="title">
        Education <span>교육</span>
      </h2>
      <ol className="list">
        <li>
          <strong>멋쟁이 사자처럼 프론트엔드 스쿨</strong> 1기 수료(2021.11 ~
          2022.01)
          <ul>
            <li>
              개근상, 동료 칭찬상, CSS 캐릭터 웹 디자인 대회 최우수상, 천하제일
              이력서 만들기 최우수상 수상
            </li>
            <li>
              <span className="point">
                <strong>중소벤처기업부장관상</strong>(프론트엔드 개발자 양성
                부문) 수상(2022.11.15)
              </span>

              <div className="grid grid-cols-2 gap-2 mt-2 max-w-screen-sm">
                <Image
                  src="/strongerDeer/img.png"
                  alt=""
                  width={400}
                  height={400}
                  className="object-cover aspect-[5/3] rounded-lg"
                />
                <Image
                  src="/strongerDeer/img2.jpg"
                  alt=""
                  width={400}
                  height={400}
                  className="object-cover aspect-[5/3] rounded-lg"
                />
              </div>
            </li>
          </ul>
        </li>

        <li>
          <strong>부산대학교</strong> 조경학과 졸업(2008.03 ~ 2012.02)
          <ul>
            <li>학점: 3.87/4.5</li>
            <li>
              2011.06 제8회 도코모모 코리아 디자인 공모전 입선 (주제: 캠프
              하야리아의 미래는 / 작품: &quot;MOSAIC&quot;)
            </li>
          </ul>
        </li>
      </ol>
    </section>
  );
}
