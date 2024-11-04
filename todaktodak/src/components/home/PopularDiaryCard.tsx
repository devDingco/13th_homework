import { Heart, MessageCircle, User } from "lucide-react";
import { useRouter } from "next/navigation";

interface PopularDiaryCardProps {
  diary?: {
    id: number;
    title: string;
    content: string;
    emotion: {
      type: string;
      label: string;
    };
    authorName: string;
    likes: number;
    comments: number;
    createdAt: string;
    images?: string[];
  };
}

export default function PopularDiaryCard({ diary }: PopularDiaryCardProps) {
  const router = useRouter();
  const diaryData = diary;

  return (
    <div
      onClick={() => router.push(`/diary/${diaryData.id}`)}
      className="bg-white border rounded-xl overflow-hidden hover:shadow-md transition-all cursor-pointer group h-full flex flex-col"
    >
      {/* 헤더: 작성자 정보 & 감정 */}
      <div className="p-4 flex items-center justify-between border-b">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <User className="w-4 h-4 text-gray-400" />
          </div>
          <div>
            <div className="text-sm font-medium">{diaryData.authorName}</div>
            <div className="text-xs text-gray-500">{diaryData.createdAt}</div>
          </div>
        </div>
        <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
          {diaryData.emotion.label}
        </span>
      </div>

      {/* 본문 */}
      <div className="flex-1 p-4">
        <h3 className="font-medium text-gray-900 mb-2 group-hover:text-indigo-600 line-clamp-1">
          {diaryData.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3">
          {diaryData.content}
        </p>

        {/* 이미지 썸네일 영역 - 이미지가 있을 때만 표시 */}
        {diaryData.images && diaryData.images.length > 0 && (
          <div className="mt-4">
            <div className="flex space-x-2">
              {diaryData.images.map((image, index) => (
                <div
                  key={index}
                  className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0"
                >
                  <img
                    src={image}
                    alt={`이미지 ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 푸터: 상호작용 정보 */}
      <div className="px-4 py-3 border-t bg-gray-50 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
            <Heart className="w-4 h-4" />
            <span className="text-xs">{diaryData.likes}</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs">{diaryData.comments}</span>
          </button>
        </div>
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full border-2 border-white bg-gray-200"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
