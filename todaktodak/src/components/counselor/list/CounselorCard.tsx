export default function CounselorCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <div className="aspect-w-3 aspect-h-2">
          <img
            src="/images/happy.png"
            alt="상담사 프로필"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
            상담 가능
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">김상담 상담사</h3>
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-sm font-medium">4.8</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          10년 경력의 전문 상담사입니다. 우울증, 불안장애, 대인관계 등 전문적인
          상담을 제공합니다.
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full">
            #우울증
          </span>
          <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full">
            #불안장애
          </span>
          <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full">
            #대인관계
          </span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-gray-500">서울시 강남구</div>
          <button className="px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
            자세히 보기
          </button>
        </div>
      </div>
    </div>
  );
}
