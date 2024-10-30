import EmotionalCalendar from "@/components/home/EmotionalCalendar";
import EmotionStats from "@/components/home/EmotionStats";
import AIAnalysis from "@/components/home/AIAnalysis";
import RecentDiaries from "@/components/home/RecentDiaries";

export default function HomePage() {
  return (
    <div className="pt-16 p-8">
      <div className="grid grid-cols-12 gap-6">
        {/* 현재월 감정 기록 캘린더 */}
        <EmotionalCalendar />
        <div className="col-span-4 space-y-6">
          <EmotionStats />
          <AIAnalysis />
        </div>
        <RecentDiaries />
      </div>
    </div>
  );
}
