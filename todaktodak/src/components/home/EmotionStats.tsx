import { EmotionStatItem } from "./EmotionStatItem";

export default function EmotionStats() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">이번 달 감정 분포</h3>
      <div className="space-y-4">
        <EmotionStatItem
          emotion="/images/sad.png"
          percentage={45}
          color="yellow"
        />
        {/* 기타 등등의 감정 */}
      </div>
    </div>
  );
}
