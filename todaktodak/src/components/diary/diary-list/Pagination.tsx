export default function DiaryPagination() {
  return (
    <div className="flex justify-center mt-8">
      <nav className="flex items-center space-x-2">
        <button className="px-3 py-2 text-sm text-gray-500 bg-white border rounded-lg hover:bg-gray-50">
          이전
        </button>
        <button className="px-3 py-2 text-sm text-white bg-indigo-600 rounded-lg">
          1
        </button>
        <button className="px-3 py-2 text-sm text-gray-700 bg-white border rounded-lg hover:bg-gray-50">
          2
        </button>
        <button className="px-3 py-2 text-sm text-gray-700 bg-white border rounded-lg hover:bg-gray-50">
          3
        </button>
        <button className="px-3 py-2 text-sm text-gray-500 bg-white border rounded-lg hover:bg-gray-50">
          다음
        </button>
      </nav>
    </div>
  );
}
