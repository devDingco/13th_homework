"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Clock, Tag, Share2, Heart } from "lucide-react";
import EmpathyButton from "@/components/diary/diary-detail/EmpathyButton";
import { CommentSection } from "@/components/diary/diary-detail/CommentSection";
import type { Comment } from "@/types/diary";

export default function DiaryDetailPage() {
  const router = useRouter();
  const [isEmpathized, setIsEmpathized] = useState(false);
  const [empathyCount, setEmpathyCount] = useState(12);

  // 예시 데이터
  const diaryData = {
    id: 1,
    title: "평온한 하루",
    emotion: {
      type: "peaceful",
      emoji: "😌",
      label: "평온",
    },
    content: `오늘은 정말 평화로운 하루였다. 아침에 일어나서 차한잔을 마시며 창밖을 바라보았다.
    늘 바쁘게 지내다가 이렇게 여유를 가지니 마음이 차분해지는 것 같다.
    
    오후에는 좋아하는 책을 읽으며 시간을 보냈다. 날씨도 좋고 기분도 좋았다.
    가끔은 이렇게 혼자만의 시간을 가지는 것도 좋은 것 같다.`,
    images: [
      "/images/sad.png",
      "/images/frustrated.png",
      "/images/grinning.png",
    ],
    tags: ["독서", "휴식", "평온", "일상"],
    createdAt: "2024-03-15 14:30",
    isPublic: true,
    likes: 12,
  };

  // 댓글 예시 데이터
  const comments: Comment[] = [
    {
      id: 1,
      author: {
        name: "김토닥",
        image: "/images/disappointed.png",
      },
      content:
        "저도 이런 평온한 하루를 보내고 싶네요. 마음이 따뜻해지는 글이에요.",
      createdAt: "2024-03-15 15:30",
      likes: 5,
      replies: [
        {
          id: 2,
          author: {
            name: "이해피",
            image: "/images/shocked.png",
          },
          content: "정말 그러네요. 글을 읽으니 저도 차 한잔 마시고 싶어졌어요.",
          createdAt: "2024-03-15 15:45",
          likes: 2,
        },
        {
          id: 3,
          author: {
            name: "이해피",
            image: "/images/shocked.png",
          },
          content: "정말 그러네요. 글을 읽으니 저도 차 한잔 마시고 싶어졌어요.",
          createdAt: "2024-03-15 15:45",
          likes: 2,
        },
      ],
    },
    {
      id: 2,
      author: {
        name: "김토닥",
        image: "/images/disappointed.png",
      },
      content:
        "저도 이런 평온한 하루를 보내고 싶네요. 마음이 따뜻해지는 글이에요.",
      createdAt: "2024-03-15 15:30",
      likes: 5,
      replies: [],
    },
  ];

  const handleEmpathyToggle = () => {
    setIsEmpathized(!isEmpathized);
    setEmpathyCount((prev) => (isEmpathized ? prev - 1 : prev + 1));
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-8 py-4">
        {/* 상단 네비게이션- make component */}
        <div className="bg-white flex items-center justify-between fixed top-0 z-10 right-0 left-64 px-8 py-4 border-b">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            돌아가기
          </button>
          {diaryData.isPublic && (
            <div className="flex items-center space-x-3">
              <EmpathyButton
                count={empathyCount}
                isEmpathized={isEmpathized}
                onToggle={handleEmpathyToggle}
              />
              <button
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                title="공유하기"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* 메인 콘텐츠 카드 */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mt-14">
          {/* 감정 및 제목 섹션 */}
          <div className="p-8 border-b">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                    {diaryData.emotion.emoji}
                  </div>
                  <div>
                    <div className="text-lg font-medium">
                      {diaryData.emotion.label}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {diaryData.createdAt}
                    </div>
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {diaryData.title}
                </h1>
              </div>
              <div className="flex items-center space-x-2">
                {diaryData.isPublic && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    공개
                  </span>
                )}
                {isEmpathized && (
                  <span className="flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                    <Heart className="w-3 h-3 fill-current mr-1" />
                    공감됨
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 이미지 섹션 */}
          {diaryData.images.length > 0 && (
            <div className="border-b">
              <div className="grid grid-cols-3 gap-4 p-8">
                {diaryData.images.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden"
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={image}
                        alt={`일기 이미지 ${index + 1}`}
                        className="object-cover bg-orange-200 w-full h-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 본문 섹션 */}
          <div className="p-8">
            <div className="prose max-w-none">
              {diaryData.content.split("\n").map((paragraph, index) => (
                <p key={index} className="text-gray-700 whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* 태그 섹션 */}
            {diaryData.tags.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center flex-wrap gap-2">
                  {diaryData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 공감 섹션 */}
          {diaryData.isPublic && (
            <div className="px-8 py-6 bg-gray-100 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {empathyCount}명이 공감했어요
                  </span>
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-2 border-white bg-gray-200"
                      />
                    ))}
                    {empathyCount > 3 && (
                      <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-600">
                        +{empathyCount - 3}
                      </div>
                    )}
                  </div>
                </div>
                <EmpathyButton
                  count={empathyCount}
                  isEmpathized={isEmpathized}
                  onToggle={handleEmpathyToggle}
                />
              </div>
            </div>
          )}
        </div>

        {/* AI 감정 분석 카드 */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">AI 감정 분석</h3>
          <p className="text-gray-600">
            오늘의 일기에서는 전반적으로 평온하고 긍정적인 감정이 느껴집니다.
            특히 '여유', '평화' 와 같은 단어들이 자주 등장하며, 이는 작성자가
            충분한 휴식과 자기 돌봄의 시간을 가졌음을 보여줍니다.
          </p>
        </div>

        {/* 댓글 섹션 */}
        {diaryData.isPublic && (
          <div className="mt-6 bg-white rounded-2xl shadow-sm">
            <CommentSection comments={comments} />
          </div>
        )}
      </div>
    </div>
  );
}
