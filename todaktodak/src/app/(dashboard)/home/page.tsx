"use client";

import AIAnalysis from "@/components/home/AIAnalysis";
import EmotionalCalendar from "@/components/home/EmotionalCalendar";
import EmotionStats from "@/components/home/EmotionStats";
import PopularDiaryCard from "@/components/home/PopularDiaryCard";
import RecentDiaries from "@/components/home/recentDiary/RecentDiaries";

const popularDiaries = [
  {
    id: 1,
    title: "기쁨이 가득한 하루",
    content: "오랜만에 친구들을 만나서 정말 즐거운 시간을 보냈다...",
    emotion: {
      type: "happy",
      label: "행복",
    },
    authorName: "토닥이123",
    likes: 245,
    comments: 45,
    createdAt: "1일 전",
    images: ["/images/happy.png"],
  },
  {
    id: 2,
    title: "차분한 휴일",
    content: "혼자만의 시간을 가지며 마음을 정리했다...",
    emotion: {
      type: "peaceful",
      label: "평온",
    },
    authorName: "마음지기",
    likes: 189,
    comments: 28,
    createdAt: "2일 전",
  },
  {
    id: 3,
    title: "새로운 시작",
    content: "오늘부터 새로운 도전을 시작했다...",
    emotion: {
      type: "excited",
      label: "설렘",
    },
    authorName: "꿈꾸는사람",
    likes: 156,
    comments: 32,
    createdAt: "3일 전",
    images: ["/images/shocked.png"],
  },
];

export default function HomePage() {
  return (
    <div className="pt-16 p-8 bg-gray-50 h-full">
      <div className="grid grid-cols-12 gap-6">
        <EmotionalCalendar />
        <div className="col-span-4 space-y-6">
          <EmotionStats />
          <AIAnalysis />
        </div>
        <div className="col-span-12 space-y-6">
          {/* 주간 인기 일기 TOP3 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">이번 주 인기 일기 TOP 3</h2>
            </div>
            {/* 인기 일기 카드 컴포넌트 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularDiaries.map((diary) => (
                <PopularDiaryCard key={diary.id} diary={diary} />
              ))}
            </div>
          </div>
          <RecentDiaries />
        </div>
      </div>
    </div>
  );
}
