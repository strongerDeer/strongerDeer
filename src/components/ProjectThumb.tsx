import Image from "next/image";
import TypeIcon from "./TypeIcon";

export default function ProjectThumb({
  type,
  thumb,
}: {
  type: "개인" | "업무";
  thumb: string;
}) {
  return (
    <div className="thumb">
      <TypeIcon type={type} />
      {thumb && <Image src={thumb} alt="" width={300} height={300} />}
    </div>
  );
}
