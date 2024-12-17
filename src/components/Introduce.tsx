import { ExternalLink } from "lucide-react";
import Check from "./introduce/Check";

export default function Introduce() {
  return (
    <div className="wrap" id="introduce">
      <section>
        <h2 className="title">
          Introduce <span>소개</span>
        </h2>
        <p className="hash_tag">
          <span>프론트엔드 개발</span>
          <span>UI/UX</span>
          <span>주도적</span>
          <span>효율적</span>
          <span>실행력</span>
          <span>협업중심</span>
          <span>계획적</span>
          <span>디자이너</span>
          <span>웹 표준/접근성</span>
        </p>
        <Check />
        <div className="contents">
          <div className="box">
            <h4>사용자 중심의 웹 서비스를 구축합니다.</h4>
            <p>
              디자이너/퍼블리셔 경력을 확장해 현재는 프론트엔드 개발자로 일하고
              있습니다. <br />
              디자인과 개발을 아우르는 경험을 바탕으로 사용자 친화적인 웹
              서비스를 만듭니다.
              <br />웹 접근성, 반응형, 웹 표준을 웹 접근성, 반응형, 웹 표준 등
              많은 디자인, 퍼블리싱 프로젝트를 경험했고,
              <br /> 현재는 더 나은 사용자 경험을 위한 디자인 시스템 적용, 성능
              최적화 기술을 업무에 적용해 나가고 있습니다.
            </p>
          </div>

          <div className="box">
            <h4>성장을 위해 지속해서 기술을 학습하고, 지식을 공유합니다.</h4>

            <ul className="list">
              <li>
                학습한 개발 기술들을 실제 업무에 도입하며, 업무 생산성과 품질
                향상을 위해 노력합니다.
              </li>
              <li>
                복잡한 개발 지식을 시각적으로 정리하는 것을 좋아합니다.
                <ul>
                  <li>
                    <a
                      href="https://www.figma.com/design/JipDSuNzE5lvD5Xf65tgau/strongerDeer_%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%EB%A0%8C%EB%8D%94%EB%A7%81?node-id=0%3A1&t=qpw50G0jVjDRZgzF-1"
                      target="_blank"
                      className="text_link"
                    >
                      <ExternalLink />
                      브라우저 렌더링 다이어그램
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.notion.so/HTML-CSS-cefb65ccba424910b0d2f35f8742c027?pvs=21"
                      target="_blank"
                      className="text_link"
                    >
                      <ExternalLink />
                      프론트엔드 부트캠프 스쿨 강의 교안( &quot;모두의
                      HTML/CSS&quot;) 중 일부
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="box">
            <h4>
              효율적인 커뮤니케이션과 빠른 문제 해결 능력을 갖추고 있습니다.
            </h4>

            <ul className="list">
              <li>
                기획, 디자인, 퍼블리싱, 개발 등 다양한 포지션의 업무 경험을 통해
                원활한 커뮤니케이션이 가능하며 신속한 업무처리가 가능합니다.
              </li>
              <li>
                간단한 UI는 디자인 시안 없이도 즉시 UI 구현이 가능하여 프로젝트
                진행 속도가 빠릅니다.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
