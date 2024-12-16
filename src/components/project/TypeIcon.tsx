import { BriefcaseBusiness, User } from "lucide-react";

export default function TypeIcon({ type }: { type: "개인" | "업무" }) {
  return (
    <p className="iconType">
      {type === "개인" ? (
        <>
          <User className="h-4" />
          개인 프로젝트
        </>
      ) : (
        <>
          <BriefcaseBusiness className="h-4" />
          업무
        </>
      )}
    </p>
  );
}
