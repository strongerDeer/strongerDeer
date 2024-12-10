import Image from "next/image";

export default function Experience() {
  return (
    <div className="wrap" id="experience">
      <section>
        <h2>기타 경력 및 경험</h2>

        <Image src="/book_github.webp" width="200" height="200" alt="" />
        <Image src="/inflearn.png" width="200" height="200" alt="" />
      </section>
    </div>
  );
}
