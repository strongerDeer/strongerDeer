import Image from "next/image";

export default function Education() {
  return (
    <section>
      <h2 className="title">
        Education <span>교육</span>
      </h2>
      <ol className="list">
        <li>
          <strong>멋쟁이 사자처럼 프론트엔드 스쿨</strong> 1기 수료
          <span className="text-gray-500 text-sm">(2021.11 ~ 2022.01)</span>
          <ul>
            <li>
              개근상, 동료 칭찬상, CSS 캐릭터 웹 디자인 대회 최우수상, 천하제일
              이력서 만들기 최우수상 수상
            </li>
            <li>
              <span className="point">
                <strong>중소벤처기업부장관상</strong> 수상
                <span className="text-gray-500 text-sm">
                  (프론트엔드 개발자 양성 부문 / 2022.11.15)
                </span>
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
          <strong>부산대학교</strong> 조경학과 졸업
          <span className="text-gray-500 text-sm">(2008.03 ~ 2012.02)</span>
          <ul>
            <li>학점: 3.87/4.5</li>
            <li>
              제8회 도코모모 코리아 디자인 공모전 입선
              <span className="text-gray-500 text-sm">
                (2011.06 / 주제: 캠프 하야리아의 미래는 / 작품:
                &quot;MOSAIC&quot;)
              </span>
            </li>
            <li>
              2학년 겨울방학부터 조경설계회사(기단 조경 기술사 사무소) 인턴
              시작, 졸업 후 취업
              <span className="text-gray-500 text-sm">(2012.11까지 근무)</span>
            </li>
          </ul>
        </li>
      </ol>
    </section>
  );
}
