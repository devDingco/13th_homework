import { Star, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MyActivities() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <Tabs defaultValue="reviews" className="w-full">
        {/* 헤더 영역 */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">내 활동</h2>
          <TabsList className="bg-gray-100 p-1 h-auto">
            <TabsTrigger
              value="reviews"
              className="px-4 py-2 rounded-md text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow text-gray-500 hover:text-gray-700"
            >
              리뷰
            </TabsTrigger>
            <TabsTrigger
              value="comments"
              className="px-4 py-2 rounded-md text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow text-gray-500 hover:text-gray-700"
            >
              댓글
            </TabsTrigger>
          </TabsList>
        </div>

        {/* 내용(리뷰) */}
        <TabsContent value="reviews" className="space-y-4 mt-0">
          {[1, 2, 3].map((review) => (
            <div
              key={review}
              className="border-b last:border-b-0 pb-4 last:pb-0 cursor-pointer"
              onClick={() => console.log("리뷰페이지로 이동")}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="font-medium transition-colors">
                    김상담 상담사
                  </h3>
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      2024.03.01
                    </span>
                  </div>
                </div>
                <button
                  className="text-sm text-red-500 hover:text-red-700 flex items-center ml-4"
                  title="삭제하기"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("리뷰 삭제");
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-600 text-sm group-hover:text-gray-900 transition-colors">
                상담이 매우 만족스러웠습니다. 전문적인 상담과 따뜻한 공감을
                해주셔서 큰 도움이 되었습니다.
              </p>
            </div>
          ))}
        </TabsContent>

        {/* 내용(댓글) */}
        <TabsContent value="comments" className="space-y-4 mt-0">
          {[1, 2, 3].map((comment) => (
            <div
              key={comment}
              className="border-b last:border-b-0 pb-4 last:pb-0 cursor-pointer group"
              onClick={() => console.log("일기 상세페이지 이동")}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="font-medium group-hover:text-indigo-600 transition-colors">
                      평온한 하루
                    </h3>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-sm text-gray-500">
                      작성자: 금쪽이
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">2024.11.03</div>
                </div>
                <button
                  className="text-sm text-red-500 hover:text-red-700 flex items-center ml-4"
                  title="삭제하기"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("댓글 삭제");
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-600 text-sm group-hover:text-gray-900 transition-colors">
                저도 이런 평온한 하루를 보내고 싶네요. 글을 읽으니 마음이
                차분해지는 것 같아요. 엄마가 보고싶어여
              </p>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
