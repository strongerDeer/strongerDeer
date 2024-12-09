import { BookOpen, Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
  return (
    <section>
      <h2>Contact</h2>
      <div className="flex justify-center gap-6 mb-12">
        <a
          href="#"
          className="transform hover:scale-110 transition-all p-3 bg-white rounded-xl shadow-lg"
        >
          <Github className="w-6 h-6 text-gray-700" />
        </a>
        <a
          href="mailto:stronger_deer@naver.com"
          className="transform hover:scale-110 transition-all p-3 bg-white rounded-xl shadow-lg"
        >
          <Mail className="w-6 h-6 text-gray-700" />
        </a>
      </div>
    </section>
  );
}
