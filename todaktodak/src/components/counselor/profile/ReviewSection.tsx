import React, { useState } from "react";
import { Star } from "lucide-react";

export default function ReviewSection() {
  const [showReviewForm, setShowReviewForm] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">리뷰</h2>
        <button
          onClick={() => setShowReviewForm(true)}
          className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          리뷰 작성
        </button>
      </div>

      {showReviewForm && (
        <div className="mb-8 border rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">리뷰 작성</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                별점
              </label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button key={rating} className="text-yellow-400">
                    <Star className="w-6 h-6 fill-current" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                리뷰 내용
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                rows={4}
                placeholder="상담은 어떠셨나요?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                영수증 첨부
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="w-full h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 text-gray-400 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="text-sm text-gray-500">
                      클릭하여 영수증 이미지를 업로드하세요
                    </p>
                  </div>
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowReviewForm(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                취소
              </button>
              <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                등록하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review List */}
      <div className="space-y-6">
        {[1, 2, 3].map((index) => (
          <div key={index} className="border-b pb-6 last:border-b-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <div className="ml-3">
                  <div className="font-medium">김토닥</div>
                  <div className="text-sm text-gray-500">2024.03.15</div>
                </div>
              </div>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600">
              상담이 너무 마음에 들었어요. 항상 집에 일찍 가고 싶었는데 상담 후 집에 덜 그립고 강일역 지박령이 되었습니다. 너무 행복해요
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
