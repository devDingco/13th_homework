import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  addMonths,
  format,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
} from "date-fns";
import { ko } from "date-fns/locale";

const CounselingCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedCounseling, setSelectedCounseling] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 이전 달로 이동
  const prevMonth = () => {
    setCurrentDate((prev) => subMonths(prev, 1));
  };

  // 다음 달로 이동
  const nextMonth = () => {
    setCurrentDate((prev) => addMonths(prev, 1));
  };

  // 현재 달의 모든 날짜 계산
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // 샘플 상담 예약 데이터
  const counselingAppointments = {
    "2024-11-15": {
      counselor: "신상담",
      time: "14:00",
      type: "대면상담",
      location: "서울시 강남구 역삼동",
    },
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* 캘린더 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">상담 예약 캘린더</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-lg font-medium">
            {format(currentDate, "yyyy년 M월", { locale: ko })}
          </span>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-4 mb-4">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day} className="text-center text-sm text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* 캘린더 그리드 */}
      <div className="grid grid-cols-7 gap-4">
        {days.map((date, index) => {
          const dateStr = format(date, "yyyy-MM-dd");
          const appointment = counselingAppointments[dateStr];

          return (
            <div key={index} className="min-h-[100px] border rounded-lg p-2">
              <div className="text-sm text-gray-600 mb-2">
                {format(date, "d")}
              </div>
              {appointment && (
                <button
                  onClick={() => {
                    setSelectedCounseling(appointment);
                    setShowModal(true);
                  }}
                  className="w-full text-left p-2 bg-indigo-50 text-indigo-700 text-sm rounded hover:bg-indigo-100"
                >
                  {appointment.time} {appointment.counselor} 상담사
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* 상담 예약 정보 모달 */}
      {showModal && selectedCounseling && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="relative bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">상담 예약 정보</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <img
                  src="/api/placeholder/64/64"
                  alt="상담사 프로필"
                  className="w-16 h-16 rounded-full"
                />
                <div className="ml-4">
                  <div className="font-medium">
                    {selectedCounseling.counselor} 상담사
                  </div>
                  <div className="text-sm text-gray-500">전문심리상담사</div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">예약 일시</span>
                  <span>2024년 3월 15일 {selectedCounseling.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">상담 유형</span>
                  <span>{selectedCounseling.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">상담 장소</span>
                  <span>{selectedCounseling.location}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CounselingCalendar;
