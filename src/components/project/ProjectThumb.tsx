import Image from "next/image";
import Link from "next/link";
import TypeIcon from "./TypeIcon";

type ProjectThumbProps = {
  type: "개인" | "업무";
  thumb: string;
  title?: string;
  metrics?: string[];
  /** 주면 이미지 영역을 링크로 감싼다(카드용). 없으면 정지 썸네일. */
  href?: string;
  label?: string;
};

const ProjectThumb = ({
  type,
  thumb,
  title,
  metrics,
  href,
  label,
}: ProjectThumbProps) => {
  const media = thumb ? (
    <Image src={`/strongerDeer${thumb}`} alt="" width={480} height={360} />
  ) : (
    <div className="thumb-fallback">
      {title && <strong>{title}</strong>}
      {metrics && metrics[0] && <p>{metrics[0]}</p>}
    </div>
  );

  return (
    <div className="thumb">
      {/* TypeIcon("업무"/"개인 프로젝트" 배지)은 링크 밖에 둔다.
          링크 안에 있으면 눈에 보이는 텍스트가 "업무"인데 접근 이름은
          "… 상세 보기"가 되어 서로 어긋난다(WCAG 2.5.3 Label in Name).
          음성 제어 사용자가 보이는 대로 말했을 때 매칭되지 않는 문제다. */}
      <TypeIcon type={type} />
      {href ? (
        <Link href={href} className="thumbLink" aria-label={label}>
          {media}
        </Link>
      ) : (
        media
      )}
    </div>
  );
};

export default ProjectThumb;
