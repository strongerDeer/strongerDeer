import Image from "next/image";

export default function Skill() {
  return (
    <div className="wrap" id="skill">
      <section>
        <h2>Skill</h2>
        <Image src="/program/vscode.jpg" alt="" width={1000} height={1000} />

        <div className="program">
          <Image src="/program/vsc.jpg" alt="" width={100} height={100} />

          <Image src="/program/chrome.jpg" alt="" width={100} height={100} />
          <Image src="/program/notion.png" alt="" width={100} height={100} />

          {/* 브라우저 */}
          <Image src="/program/ps.jpg" alt="" width={100} height={100} />
          <Image src="/program/ai.jpg" alt="" width={100} height={100} />
          <Image src="/program/figma.jpg" alt="" width={100} height={100} />
        </div>
      </section>
    </div>
  );
}
