import { Search, MapPin } from "lucide-react";

export default function SearchFilter() {
  return (
    <div className="flex flex-wrap gap-4">
      {/* Search Bar */}
      <div className="flex-1">
        <div className="relative">
          <input
            type="text"
            placeholder="상담사 이름 또는 키워드로 검색"
            className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Location Filter */}
      <div className="w-48">
        <div className="relative">
          <select className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white focus:ring-2 focus:ring-indigo-500 appearance-none">
            <option value="">지역 선택</option>
            <option value="서울">서울</option>
            <option value="경기">경기</option>
            <option value="인천">인천</option>
          </select>
          <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
