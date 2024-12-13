import { BookMarked, ExternalLink, LeafyGreen, Mic2, Tent } from "lucide-react";
import Image from "next/image";

export default function Experience() {
  return (
    <div className="wrap" id="experience">
      <section>
        <h2 className="title">
          Other Experience <span>기타 경력 및 경험</span>
        </h2>

        <ul className="card">
          <li>
            <Image src="/img2.jpg" width="200" height="200" alt="" />
            <div className="content">
              <div>
                <h3>
                  <Tent />
                  부트캠프 강사
                </h3>

                <p>
                  <strong>멋쟁이 사자처럼 프론트엔드 스쿨</strong> HTML/CSS 강의
                </p>
                <ul className="list2">
                  <li>5, 7기 HTML/CSS 메인 강의 </li>
                  <li>3, 4기 HTML/CSS 특강</li>
                  <li>3기 멘토</li>
                  <li>2기 선배 특강</li>
                </ul>
                <p>
                  <strong>이스트소프트 오르미 백엔드 스쿨</strong> 1, 3기
                  HTML/CSS 강의
                </p>
              </div>
            </div>
          </li>
          <li>
            <Image src="/inflearn.png" width="200" height="200" alt="" />

            <div className="content">
              <div>
                <h3>
                  <LeafyGreen /> 인프런 온라인 강의
                </h3>
                <p>
                  <strong>아는 만큼 보이는 크롬 개발자 도구</strong>
                </p>
                <ul className="list2">
                  <li>
                    <strong>수강생 2,449명 / 평점 4.9</strong> (2024년 12월
                    기준)
                  </li>
                </ul>
              </div>
              <a href="https://inf.run/FQsL" target="_blank" className="go">
                <ExternalLink />
                <span>강의 링크</span>
              </a>
            </div>
          </li>
          <li>
            <Image src="/book_github.webp" width="200" height="200" alt="" />
            <div className="content">
              <div>
                <h3>
                  <BookMarked /> 전자책 출판
                </h3>
                <ul>
                  <li>
                    <strong>
                      알아서 잘 딱 깔끔하고 센스있게 정리하는 GitHub 핵심 개념
                    </strong>
                    <ul className="list2">
                      <li>
                        멋쟁이사자처럼 프론트엔드 스쿨 강사, 멘토, 수강생 16명이
                        함께한 프로젝트
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <a
                href="https://ridibooks.com/books/2773000054"
                target="_blank"
                className="go"
              >
                <ExternalLink />
                <span>전자책 링크</span>
              </a>
            </div>
          </li>
          <li>
            <Image src="/img.jpg" width="200" height="200" alt="" />

            <div className="content">
              <div>
                <h3>
                  <Mic2 /> 특강
                </h3>

                <ul>
                  <li>
                    <strong>제주 패스파인더</strong> 전지적 주니어
                    시점(2024.07.26)
                  </li>
                  <li>
                    <strong>제주대학교</strong> 계절학기 수업(2023.06.26)
                  </li>
                  <li>
                    <strong>제주 오현고등학교</strong> HTML/CSS(2022.06.10)
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
}
