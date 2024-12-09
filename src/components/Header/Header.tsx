import Logo from "@components/shared/Logo";
import { Link } from "lucide-react";

export default function Header() {
  return (
    <header className="flex justify-between h-12 items-center px-6 fixed top-0 left-0 w-full bg-background z-10">
      <Logo />
      <button type="button" className="flex items-center gap-1 text-sm">
        <Link className="h-4 w-4 text-gray-700" /> URL 복사
      </button>
    </header>
  );
}
