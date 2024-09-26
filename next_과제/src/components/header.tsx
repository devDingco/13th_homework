import Link from "next/link";
import DarkModeButton from "@/components/darkModeButton";

const Header = () => {
  return (
    <header className="bg-slate-900 text-white">
      <nav className="max-w-7xl flex justify-between items-center m-auto p-4">
        <h1>
          <Link href={"/"}>jomira</Link>
        </h1>
        <div className="flex gap-4">
          <Link className="btn btn-primary" href="/board/new">
            게시글 등록
          </Link>
          <Link className="btn btn-secondary" href="/board/detail">
            게시글 상세
          </Link>
          <Link className="btn btn-accent" href="/board/list">
            게시글 리스트
          </Link>
        </div>
        <DarkModeButton />
      </nav>
    </header>
  );
};
export default Header;
