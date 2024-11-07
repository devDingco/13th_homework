"use client";

import { useState } from "react";
import EmotionCalendar from "@/components/calendar/EmotionCalendar";
import CounselingCalendar from "@/components/calendar/CounselingCalendar";
import Header from "@/components/shared/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CalendarPage() {
  const [activeTab, setActiveTab] = useState<"emotion" | "counseling">(
    "emotion"
  );

  const getHeaderContent = (activeTab: "emotion" | "counseling") => {
    const content = {
      emotion: {
        title: "감정 캘린더",
        description: "하루하루의 감정을 기록하고 되돌아보세요",
      },
      counseling: {
        title: "상담 예약 캘린더",
        description: "예약된 상담 일정을 확인하고 관리하세요",
      },
    };

    return content[activeTab];
  };

  const headerContent = getHeaderContent(activeTab);

  return (
    <div className="h-full">
      <Header h1={headerContent.title} p={headerContent.description} />
      <div className="p-8 max-w-5xl mx-auto">
        <Tabs defaultValue="emotion" className="w-full">
          {/* 탭 */}
          <TabsList className="w-full max-w-md py-6 bg-gray-100 ">
            <TabsTrigger value="emotion" className="w-full py-2">
              감정 캘린더
            </TabsTrigger>
            <TabsTrigger value="counseling" className="w-full py-2">
              상담 예약
            </TabsTrigger>
          </TabsList>

          {/* 감정 캘린더 */}
          <TabsContent value="emotion" className="mt-6">
            <div>
              <EmotionCalendar />
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
                    <div className="text-2xl font-bold text-green-600">
                      +15%
                    </div>
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
          </TabsContent>

          {/* 상담 캘린더 */}
          <TabsContent value="counseling" className="mt-6">
            <div>
              <CounselingCalendar />
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
