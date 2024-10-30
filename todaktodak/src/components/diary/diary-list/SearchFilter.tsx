import { Search, Filter, Calendar, ChevronDown } from "lucide-react";

export default function SearchFilter() {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative w-64">
        <input
          type="text"
          placeholder="일기 검색..."
          className="w-full px-4 py-2 pl-10 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        <Search className="absolute top-2.5 left-3 w-5 h-5 text-gray-400" />
      </div>

      <div className="flex items-center space-x-2">
        <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
          <Filter className="w-4 h-4 mr-2" />
          감정
          <ChevronDown className="w-4 h-4 ml-2" />
        </button>
        <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
          <Calendar className="w-4 h-4 mr-2" />
          기간
          <ChevronDown className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}
