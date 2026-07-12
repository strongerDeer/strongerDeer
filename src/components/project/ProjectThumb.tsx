import Image from "next/image";
import TypeIcon from "./TypeIcon";

type ProjectThumbProps = {
  type: "개인" | "업무";
  thumb: string;
  title?: string;
  metrics?: string[];
};

const ProjectThumb = ({ type, thumb, title, metrics }: ProjectThumbProps) => {
  return (
    <div className="thumb">
      <TypeIcon type={type} />
      {thumb ? (
        <Image src={`/strongerDeer${thumb}`} alt="" width={480} height={360} />
      ) : (
        <div className="thumb-fallback">
          {title && <strong>{title}</strong>}
          {metrics && metrics[0] && <p>{metrics[0]}</p>}
        </div>
      )}
    </div>
  );
};

export default ProjectThumb;
