"use client";

import { useState } from "react";
import { Heart, MessageCircle, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "@/components/shared/Header";

export default function CommunityPage() {
  const router = useRouter();
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  return (
    <>
      <Header h1="공개 일기" p="다른 사람들의 이야기를 읽고 공감해보세요" />
      <div className="p-8 max-w-5xl mx-auto">
        {/* 필터 및 검색 */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* 검색바 */}
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="일기 검색..."
                  className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="absolute top-2.5 left-3 w-5 h-5 text-gray-400" />
              </div>

              {/* 감정 필터 */}
              <div className="flex items-center space-x-2">
                {["행복", "평온", "슬픔", "화남", "불안"].map((emotion) => (
                  <button
                    key={emotion}
                    onClick={() =>
                      setSelectedEmotion(
                        selectedEmotion === emotion ? null : emotion
                      )
                    }
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedEmotion === emotion
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {emotion}
                  </button>
                ))}
              </div>
            </div>

            {/* 정렬 옵션 */}
            <div className="flex space-x-2">
              <button
                onClick={() => setSortBy("latest")}
                className={`px-4 py-2 rounded-lg text-sm ${
                  sortBy === "latest"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                최신순
              </button>
              <button
                onClick={() => setSortBy("popular")}
                className={`px-4 py-2 rounded-lg text-sm ${
                  sortBy === "popular"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                인기순
              </button>
            </div>
          </div>
        </div>

        {/* 일기 목록 */}
        <div className="grid grid-cols-1 gap-6">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* 작성자 정보 */}
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                    <div>
                      <div className="font-medium">익명의 토닥이</div>
                      <div className="text-sm text-gray-500">3시간 전</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    평온
                  </div>
                </div>
              </div>

              {/* 일기 내용 미리보기 */}
              <div
                className="p-6 cursor-pointer"
                onClick={() => router.push(`/diary/${index}`)}
              >
                <h3 className="text-lg font-medium mb-2">빡치는 하루</h3>
                <p className="text-gray-600 line-clamp-3">
                  오늘은 정말로 이렇게 화가날 줄은 몰랏다 아니 그냥 잠자고
                  눈떳는데 실로 너무 화가낫다 이유? 그런 필요업다!
                  그냥!!!!화가!!!!너무!!!난다 화가화가화가나!!!!! 그렇다고한다!
                  아아아아아ㅏㄱ 아아아악 아아아아ㅏㅏㅏㅏ아아아ㅏㄱ
                  아아아아아ㅏㅇ
                </p>

                {/* 이미지 미리보기 */}
                {index === 1 && (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg" />
                    <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg" />
                  </div>
                )}

                {/* 태그 */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    #독서
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    #휴식
                  </span>
                </div>
              </div>

              {/* 상호작용 */}
              <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                    <Heart className="w-5 h-5" />
                    <span className="text-sm">128</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">32</span>
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-2 border-white bg-gray-200"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">+25명이 공감</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 더보기 버튼 */}
        <div className="mt-8 text-center">
          <button className="px-6 py-3 bg-white text-gray-700 border rounded-lg hover:bg-gray-50">
            더보기
          </button>
        </div>
      </div>
    </>
  );
}
