import { Github, Mail } from "lucide-react";

export default function Contact() {
  return (
    <footer className="pt-8 pb-10">
      <h2 className="text-center">Contact</h2>
      <div className="center gap-6">
        <a
          href="https://github.com/strongerDeer"
          target="_blank"
          className="link"
        >
          <Github />
          <span>GitHub</span>
        </a>
        <a href="mailto:stronger_deer@naver.com" className="link">
          <Mail />
          <span>Email</span>
        </a>
      </div>
    </footer>
  );
}
