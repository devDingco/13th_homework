import { ChevronRight } from "lucide-react";

export default function DiaryListItem({ diary, onDetailView }) {
  return (
    <div
      className="bg-white border rounded-xl hover:shadow-md transition-all cursor-pointer"
      onClick={() => onDetailView(diary.id)}
    >
      <div className="flex items-start p-6">
        {/* 이모지*/}
        <div className="flex-shrink-0 flex flex-col items-center w-24">
          <div className="w-12 h-12 rounded-full bg-blue-200 mb-2"></div>
          <span className="text-sm text-gray-600">😁</span>
        </div>

        {/* Middle: Main Content */}
        <div className="flex-grow px-4">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-medium">졸려요...</h3>
            <div className="flex items-center">
              <span
                /* className={`w-2 h-2 rounded-full ${
                  diary.isPublic ? "bg-green-500" : "bg-gray-400"
                }`} */
                className="w-2 h-2 rounded-full bg-green-500"
              ></span>
              <span className="text-sm text-gray-500 ml-2">
                {/* {diary.isPublic ? "공개" : "비공개"} */}
                공개
              </span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {diary.content}
          </p>

          <div className="flex flex-wrap gap-2">
            {diary.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Date and Action */}
        <div className="flex-shrink-0 flex flex-col items-end justify-between h-full ml-4">
          <div className="text-sm text-gray-500">
            {(new Date(diary.date), "yyyy.MM.dd")}
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Preview Images */}
      {diary.images && diary.images.length > 0 && (
        <div className="px-6 pb-6 mt-2">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {diary.images.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden"
              >
                <img
                  src={image}
                  alt={`${diary.title} 이미지 ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Optional Bottom Section for Additional Info */}
      {(diary.comments_count || diary.likes_count) && (
        <div className="px-6 py-3 border-t flex items-center gap-4">
          {diary.comments_count && (
            <span className="text-sm text-gray-500">
              댓글 {diary.comments_count}
            </span>
          )}
          {diary.likes_count && (
            <span className="text-sm text-gray-500">
              공감 {diary.likes_count}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
