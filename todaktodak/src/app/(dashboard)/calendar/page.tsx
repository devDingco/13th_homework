"use client";

import { useState } from "react";
import EmotionCalendar from "@/components/calendar/EmotionCalendar";
import CounselingCalendar from "@/components/calendar/CounselingCalendar";

export default function CalendarPage() {
  // 현재 선택된 탭 상태 관리 ('emotion' | 'counseling')
  const [activeTab, setActiveTab] = useState<"emotion" | "counseling">(
    "emotion"
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* 탭 메뉴 */}
      <div className="mb-6">
        <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg max-w-md">
          <button
            onClick={() => setActiveTab("emotion")}
            className={`flex-1 py-2.5 px-5 rounded-md text-sm font-medium transition-all
              ${
                activeTab === "emotion"
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-500 hover:text-gray-700"
              }`}
          >
            감정 캘린더
          </button>
          <button
            onClick={() => setActiveTab("counseling")}
            className={`flex-1 py-2.5 px-5 rounded-md text-sm font-medium transition-all
              ${
                activeTab === "counseling"
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-500 hover:text-gray-700"
              }`}
          >
            상담 예약
          </button>
        </div>
      </div>

      {/* 캘린더 헤더 - 탭에 따라 다른 설명 표시 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {activeTab === "emotion" ? "감정 캘린더" : "상담 예약 캘린더"}
        </h1>
        <p className="mt-2 text-gray-600">
          {activeTab === "emotion"
            ? "하루하루의 감정을 기록하고 되돌아보세요"
            : "예약된 상담 일정을 확인하고 관리하세요"}
        </p>
      </div>

      {/* 캘린더 표시 영역 */}
      <div className="transition-all duration-300 ease-in-out">
        {activeTab === "emotion" ? (
          // 감정 캘린더 영역
          <div>
            <EmotionCalendar />
            {/* 감정 통계 요약 */}
            <div className="mt-6 grid grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-4">
                  이번 달 주요 감정
                </h3>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-2xl">
                    😊
                  </div>
                  <div>
                    <div className="font-medium">행복</div>
                    <div className="text-sm text-gray-500">45%</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-4">
                  감정 변화
                </h3>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">+15%</div>
                  <div className="text-sm text-gray-500">지난 달 대비</div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-4">
                  일기 작성
                </h3>
                <div className="text-center">
                  <div className="text-2xl font-bold">25/31</div>
                  <div className="text-sm text-gray-500">이번 달 작성일</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // 상담 예약 캘린더 영역
          <div>
            <CounselingCalendar />
            {/* 예약 현황 요약 */}
            <div className="mt-6 grid grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-4">
                  다음 상담
                </h3>
                <div className="font-medium">3월 15일 14:00</div>
                <div className="text-sm text-gray-500">김상담 상담사</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-4">
                  이번 달 예약
                </h3>
                <div className="text-center">
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-gray-500">건의 예약</div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-4">
                  상담 유형
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">대면상담</span>
                    <span className="font-medium">2건</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">화상상담</span>
                    <span className="font-medium">1건</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
