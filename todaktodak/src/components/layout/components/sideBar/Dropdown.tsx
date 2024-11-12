import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface DropdownProps {
  setIsDropdownOpen: (isOpen: boolean) => void;
}

export default function Dropdown({ setIsDropdownOpen }: DropdownProps) {
  // nextAuth 로그아웃
  const handleLogout = async () => {
    try {
      await signOut();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <div
      className="absolute bottom-full left-0 w-full bg-white border rounded-lg shadow-lg mb-1 overflow-hidden z-10"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu"
    >
      <Link
        href="/profile"
        className="flex items-center px-4 py-3 hover:bg-gray-50 focus:outline-none focus:bg-gray-100"
        role="menuitem"
        onClick={() => setIsDropdownOpen(false)}
      >
        <Settings className="w-4 h-4 mr-3 text-gray-500" />
        <span className="text-sm text-gray-700">프로필 설정</span>
      </Link>
      <button
        onClick={handleLogout}
        className="flex items-center w-full px-4 py-3 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 text-left"
        role="menuitem"
      >
        <LogOut className="w-4 h-4 mr-3 text-red-700" />
        <span className="text-sm font-bold text-red-700">로그아웃</span>
      </button>
    </div>
  );
}
