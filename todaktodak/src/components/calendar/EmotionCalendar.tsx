import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  addMonths,
  format,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";
import { ko } from "date-fns/locale";
import { useRouter } from "next/navigation";

const EMOTION_COLORS = {
  happy: "bg-yellow-100",
  sad: "bg-green-800",
  neutral: "bg-green-300",
  veryHappy: "bg-yellow-100",
  verySad: "bg-gray-600",
};

const EMOTION_EMOJIS = {
  happy: "😄",
  sad: "😢",
  neutral: "🙂",
  veryHappy: "😆",
  verySad: "😫",
};

const EmotionCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 감정 데이터 - graphql에서 나중에~!
  const emotions = {
    "2024-11-01": { type: "veryHappy", id: "1" },
    "2024-11-02": { type: "sad", id: "2" },
    "2024-11-03": { type: "neutral", id: "3" },
    "2024-11-04": { type: "neutral", id: "4" },
    "2024-11-05": { type: "veryHappy", id: "5" },
    "2024-11-06": { type: "neutral", id: "6" },
    "2024-11-07": { type: "sad", id: "7" },
    "2024-11-08": { type: "sad", id: "8" },
    "2024-11-09": { type: "neutral", id: "9" },
    "2024-11-10": { type: "neutral", id: "10" },
    "2024-11-11": { type: "verySad", id: "11" },
    "2024-11-12": { type: "neutral", id: "12" },
    "2024-11-13": { type: "veryHappy", id: "13" },
    // ... 등등
  };

  const prevMonth = () => {
    setCurrentDate((prev) => subMonths(prev, 1));
  };

  const nextMonth = () => {
    setCurrentDate((prev) => addMonths(prev, 1));
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handleEmotionClick = (diaryId) => {
    router.push(`/diary/${diaryId}`);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* 캘린더 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">감정 캘린더</h2>
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
          const emotion = emotions[dateStr];

          return (
            <div
              key={index}
              className="aspect-square relative flex flex-col items-center"
            >
              <div className="text-sm text-gray-600 mb-2">
                {format(date, "d")}
              </div>
              {emotion && (
                <button
                  onClick={() => handleEmotionClick(emotion.id)}
                  className={`w-12 h-12 rounded-full ${
                    EMOTION_COLORS[emotion.type]
                  } hover:opacity-80 transition-all duration-200 flex items-center justify-center shadow-sm`}
                >
                  <span className="text-2xl">
                    {EMOTION_EMOJIS[emotion.type]}
                  </span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmotionCalendar;
