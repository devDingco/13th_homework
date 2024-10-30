// components/diary/diary-list/DiaryList.tsx
import { ChevronRight } from "lucide-react";

export default function DiaryList() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          className="bg-white border rounded-xl hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-start p-6">
            {/* Left: Emotion Icon */}
            <div className="flex-shrink-0 flex flex-col items-center w-24">
              <div className="w-12 h-12 rounded-full bg-blue-200 mb-2"></div>
              <span className="text-sm text-gray-600">평온</span>
            </div>

            {/* Middle: Content */}
            <div className="flex-grow px-4">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-medium">평온한 하루</h3>
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-sm text-gray-500 ml-2">공개</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                오늘은 조용히 책을 읽으며 시간을 보냈다. 마음이 차분해지는
                기분이 들었다. 이런 여유로운 시간을 가질 수 있어서 좋았다.
                앞으로도 이런 시간을 자주 가져야겠다.
              </p>

              <div className="flex flex-wrap gap-2">
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
            </div>

            {/* Right: Date and Action */}
            <div className="flex-shrink-0 flex flex-col items-end justify-between h-full ml-4">
              <span className="text-sm text-gray-500">2024.10.29</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Preview Images */}
          <div className="px-6 pb-6 mt-2">
            <div className="flex gap-2 overflow-x-auto pb-2">
              <div className="flex-shrink-0 w-20 h-20 rounded-lg bg-gray-100"></div>
              <div className="flex-shrink-0 w-20 h-20 rounded-lg bg-gray-100"></div>
              <div className="flex-shrink-0 w-20 h-20 rounded-lg bg-gray-100"></div>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="px-6 py-3 border-t flex items-center gap-4">
            <span className="text-sm text-gray-500">댓글 5</span>
            <span className="text-sm text-gray-500">공감 12</span>
          </div>
        </div>
      ))}
    </div>
  );
}
