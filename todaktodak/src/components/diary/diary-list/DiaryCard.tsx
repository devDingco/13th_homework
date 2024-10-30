export default function DiaryCard() {
  return (
    <div className="bg-white border rounded-xl hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-t-xl">
        {/* 이미지가 없을 때는 회색 배경만 표시됨 */}
      </div>

      <div className="p-4">
        {/* Card Content */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-blue-200"></div>
            <span className="font-medium">평온한 하루</span>
          </div>
          <span className="text-sm text-gray-500">2024.10.29</span>
        </div>

        <p className="text-gray-600 text-sm line-clamp-3">
          오늘은 조용히 책을 읽으며 시간을 보냈다. 마음이 차분해지는 기분이
          들었다. 이런 여유로운 시간을 가질 수 있어서 좋았다. 햇살이 창문으로
          들어오는 오후 시간, 따뜻한 차 한잔과 함께하는 독서 시간이 참 좋다.
        </p>

        <div className="flex flex-wrap gap-2 mt-3">
          <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">
            #독서
          </span>
          <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">
            #휴식
          </span>
          <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">
            #평온
          </span>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t">
          <div className="flex items-center text-sm text-gray-500">
            <span className="w-2 h-2 mr-2 rounded-full bg-green-500"></span>
            공개
          </div>
          <button className="text-sm text-indigo-600 hover:text-indigo-700">
            자세히 보기
          </button>
        </div>
      </div>
    </div>
  );
}
