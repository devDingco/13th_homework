// components/layout/SideBar.tsx
"use client";
import { useRouter, usePathname } from "next/navigation";
import { Calendar, BarChart2, User } from "lucide-react";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { icon: Calendar, label: "감정 캘린더", path: "/calendar" },
  { icon: BarChart2, label: "감정 통계", path: "/statistics" },
  { icon: User, label: "상담사 찾기", path: "/counselors" },
];

export default function SideBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 w-64 h-full bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="px-6 py-8">
          <h1
            onClick={() => router.push("/")}
            className="text-2xl font-bold text-indigo-600 cursor-pointer"
          >
            토닥토닥
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`flex items-center w-full px-4 py-3 text-left rounded-lg hover:bg-indigo-50 group ${
                pathname === item.path ? "bg-indigo-50" : ""
              }`}
            >
              <item.icon
                className={`w-5 h-5 mr-3 ${
                  pathname === item.path
                    ? "text-indigo-600"
                    : "text-gray-500 group-hover:text-indigo-600"
                }`}
              />
              <span
                className={
                  pathname === item.path
                    ? "text-indigo-600"
                    : "text-gray-700 group-hover:text-indigo-600"
                }
              >
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div
          onClick={() => router.push("/profile")}
          className="p-4 border-t cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200" />
            <div>
              <div className="font-medium">사용자 이름</div>
              <div className="text-sm text-gray-500">내 프로필</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
