export default function DiaryGrid() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <div
          key={index}
          className="bg-white border rounded-xl hover:shadow-md transition-shadow"
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-blue-200"></div>
                <span className="font-medium">집이 보고싶다!</span>
              </div>
              <span className="text-sm text-gray-500">2024.10.29</span>
            </div>

            <p className="text-gray-600 text-sm line-clamp-3">
              오늘도 나는 집이 매우 보고 싶었지만 어쩔수 없이 강일역에
              갇혔다..집이 날 그리워하능디... 흑흐ㅡ그그..
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">
                #칼퇴
              </span>
              <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">
                #침대좋아
              </span>
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t">
              <div className="flex items-center text-sm text-gray-500">
                <span className="w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
                공개
              </div>
              <button className="text-sm text-indigo-600 hover:text-indigo-700">
                자세히 보기
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
