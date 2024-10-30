import { Star } from "lucide-react";

export default function MyReviews() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <Star className="w-5 h-5 mr-2 text-indigo-600" />
          내가 작성한 리뷰
        </h2>
        <button className="text-sm text-indigo-600 hover:text-indigo-700">
          전체보기
        </button>
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((index) => (
          <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">김상담 상담사</h3>
                <div className="flex items-center mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">2024.03.01</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  수정
                </button>
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  삭제
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              상담이 매우 만족스러웠습니다. 전문적인 상담과 따뜻한 공감을
              해주셔서 큰 도움이 되었습니다.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
