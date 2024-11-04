"use client";

import React, { useState } from "react";
import { Image, Globe, Lock, ChevronLeft, ArrowRight } from "lucide-react";

// 감정 데이터
const emotions = [
  {
    id: "happy",
    label: "행복",
    bgColor: "bg-yellow-100",
    borderColor: "border-yellow-400",
    textColor: "text-yellow-800",
    description: "기쁘고 즐거운 감정",
    image: "/images/happy.png",
  },
  {
    id: "sad",
    label: "슬픔",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-400",
    textColor: "text-blue-800",
    description: "우울하거나 슬픈 감정",
    image: "/images/sad.png",
  },
  {
    id: "angry",
    label: "화남",
    bgColor: "bg-red-100",
    borderColor: "border-red-400",
    textColor: "text-red-800",
    description: "화가 나거나 짜증나는 감정",
    image: "/images/angry.png",
  },
  {
    id: "anxious",
    label: "불안",
    bgColor: "bg-purple-100",
    borderColor: "border-purple-400",
    textColor: "text-purple-800",
    description: "걱정되고 불안한 감정",
    image: "/images/anxious.png",
  },
  {
    id: "proud",
    label: "뿌듯",
    bgColor: "bg-green-100",
    borderColor: "border-green-400",
    textColor: "text-green-800",
    description: "자랑스럽고 뿌듯한 감정",
    image: "/images/proud.png",
  },
  {
    id: "peaceful",
    label: "평온",
    bgColor: "bg-sky-100",
    borderColor: "border-sky-400",
    textColor: "text-sky-800",
    description: "마음이 차분하고 평화로운 감정",
    image: "/images/peaceful.png",
  },
  {
    id: "excited",
    label: "설렘",
    bgColor: "bg-pink-100",
    borderColor: "border-pink-400",
    textColor: "text-pink-800",
    description: "기대되고 설레는 감정",
    image: "/images/excited.png",
  },
  {
    id: "tired",
    label: "피곤",
    bgColor: "bg-gray-100",
    borderColor: "border-gray-400",
    textColor: "text-gray-800",
    description: "지치고 피곤한 감정",
    image: "/images/tired.png",
  },
  {
    id: "grateful",
    label: "감사",
    bgColor: "bg-orange-100",
    borderColor: "border-orange-400",
    textColor: "text-orange-800",
    description: "고맙고 감사한 감정",
    image: "/images/grateful.png",
  },
  {
    id: "lonely",
    label: "외로움",
    bgColor: "bg-indigo-100",
    borderColor: "border-indigo-400",
    textColor: "text-indigo-800",
    description: "쓸쓸하고 외로운 감정",
    image: "/images/lonely.png",
  },
];

export default function NewDiaryPage() {
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isPublic, setIsPublic] = useState(true);
  const [images, setImages] = useState([]);

  const toggleEmotion = (emotionId: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotionId)
        ? prev.filter((id) => id !== emotionId)
        : [...prev, emotionId]
    );
  };

  // 선택된 감정 태그 컴포넌트
  const EmotionTags = () => (
    <div className="flex flex-wrap gap-2 mb-4">
      {selectedEmotions.map((emotionId) => {
        const emotion = emotions.find((e) => e.id === emotionId);
        return (
          <span
            key={emotionId}
            className={`inline-flex items-center px-3 py-1 rounded-full 
                ${emotion?.bgColor} ${emotion?.textColor} transition-all duration-200`}
          >
            <img
              src={emotion?.image}
              alt={emotion?.label}
              className="w-4 h-4 mr-1"
            />
            {emotion?.label}
          </span>
        );
      })}
    </div>
  );

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* Header*/}
      <div className="fixed top-0 right-0 left-64 bg-white border-b border-gray-200 z-10">
        <div className="max-w-5xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ChevronLeft className="w-5 h-5 mr-1" />
              돌아가기
            </button>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setIsPublic(true)}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm transition-all duration-200 ${
                    isPublic
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  <span>공개</span>
                </button>
                <button
                  onClick={() => setIsPublic(false)}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm transition-all duration-200 ${
                    !isPublic
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>비공개</span>
                </button>
              </div>
              <button
                disabled={selectedEmotions.length === 0}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedEmotions.length > 0
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                등록하기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-14 pb-12">
        <div className="max-w-5xl mx-auto px-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-2 bg-indigo-600 transition-all duration-300 ease-in-out"
                style={{ width: currentStep === 1 ? "50%" : "100%" }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="transition-all duration-300 ease-in-out">
            {currentStep === 1 ? (
              // Step 1: 감정 선택하기
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-lg font-semibold mb-2">오늘의 감정</h2>
                <p className="text-gray-500 mb-6">
                  현재 느끼는 감정을 모두 선택해주세요 (여러 개 선택 가능)
                </p>

                <div className="grid grid-cols-3 gap-4">
                  {emotions.map((emotion) => (
                    <button
                      key={emotion.id}
                      onClick={() => toggleEmotion(emotion.id)}
                      className={`group relative flex flex-col items-center p-4 rounded-xl
                          transition-all duration-200 ease-in-out
                          ${
                            selectedEmotions.includes(emotion.id)
                              ? `${emotion.bgColor} ring-2 ${emotion.borderColor}`
                              : "hover:bg-gray-50"
                          }`}
                    >
                      <img
                        src={emotion.image}
                        alt={emotion.label}
                        className="w-16 h-16 mb-3"
                      />
                      <span
                        className={`text-sm font-medium ${emotion.textColor}`}
                      >
                        {emotion.label}
                      </span>

                      {/* 감정 Tooltip */}
                      <div
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
                          px-3 py-1 bg-gray-900 text-white text-xs rounded-lg
                          opacity-0 group-hover:opacity-100 transition-opacity duration-200
                          pointer-events-none whitespace-nowrap"
                      >
                        {emotion.description}
                      </div>
                    </button>
                  ))}
                </div>

                {/* 감정선택하면 다음페이지가는 버튼 */}
                {selectedEmotions.length > 0 && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="flex items-center px-3 py-2 bg-indigo-600 text-white
                          rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Step 2: 일기작성하기
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <EmotionTags />

                <input
                  type="text"
                  placeholder="제목을 입력하세요"
                  className="w-full text-2xl font-semibold border-0 focus:ring-0 px-0 mb-6"
                />

                <textarea
                  placeholder="오늘 하루는 어땠나요?"
                  className="w-full h-48 border-0 focus:ring-0 px-0 resize-none"
                />

                {/* Image Upload */}
                <div className="mt-8">
                  <div className="flex items-center space-x-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="w-32 h-32 rounded-lg overflow-hidden">
                          <img
                            src="/api/placeholder/150/150"
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          onClick={() => {
                            const newImages = [...images];
                            newImages.splice(index, 1);
                            setImages(newImages);
                          }}
                          className="absolute top-2 right-2 p-1 bg-black bg-opacity-50
                              rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                    {images.length < 3 && (
                      <button
                        onClick={() => setImages([...images, "new-image"])}
                        className="w-32 h-32 flex flex-col items-center justify-center
                            border-2 border-dashed border-gray-300 rounded-lg
                            hover:border-gray-400 transition-colors duration-200"
                      >
                        <Image className="w-8 h-8 text-gray-400" />
                        <span className="text-sm text-gray-500 mt-2">
                          사진 추가
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    태그 추가
                  </label>
                  <input
                    type="text"
                    placeholder="#태그입력 (쉼표로 구분)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg
                        focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
