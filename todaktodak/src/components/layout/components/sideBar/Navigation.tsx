import { usePathname } from "next/navigation";
import { Calendar, BarChart2, User, BookOpen, BookHeart } from "lucide-react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

interface INavigationProps {
  router: AppRouterInstance;
}

const NAV_ITEMS: NavItem[] = [
  { icon: BookHeart, label: "나의 일기", path: "/diary" },
  { icon: Calendar, label: "감정 캘린더", path: "/calendar" },
  { icon: BarChart2, label: "감정 통계", path: "/statistics" },
  { icon: BookOpen, label: "공개 일기", path: "/community" },
  { icon: User, label: "상담사 찾기", path: "/counselors" },
];

export default function Navigation({ router }: INavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 px-4 space-y-2">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.path}
          onClick={() => router.push(item.path)}
          className={`flex items-center w-full px-4 py-3 text-left rounded-lg hover:bg-indigo-50 group ${
            pathname === item.path ? "bg-indigo-100" : ""
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
  );
}
