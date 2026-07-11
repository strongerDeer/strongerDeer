import Image from "next/image";
import TypeIcon from "./TypeIcon";

export default function ProjectThumb({
  type,
  thumb,
  title,
  metrics,
}: {
  type: "개인" | "업무";
  thumb: string;
  title?: string;
  metrics?: string[];
}) {
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
}
