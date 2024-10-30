import { Search, Sun, Plus } from "lucide-react";
import Link from "next/link";

export default function TopBar() {
  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-white border-b border-gray-200 z-10">
      <div className="flex items-center justify-between h-full px-8">
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder="일기 검색하기..."
              className="w-full px-4 py-2 pl-10 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute top-2.5 left-3 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-500 rounded-lg hover:bg-gray-100">
            <Sun className="w-5 h-5" />
          </button>
          <Link
            href="/diary/new"
            className="flex items-center px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            <span>새 일기 작성</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
