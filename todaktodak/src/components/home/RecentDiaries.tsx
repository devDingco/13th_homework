import Link from "next/link";
import DiaryCard from "./DiaryCard";

export default function RecentDiaries() {
  return (
    <div className="col-span-12 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">최근 일기</h2>
        <Link href="/diary" className="text-indigo-600 hover:text-indigo-700">
          모두 보기
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <DiaryCard
          title="졸리다"
          content="침대가 좋아"
          date="24.10.30"
          emotion="슬픔"
        />
        {/* More diary cards */}
      </div>
    </div>
  );
}
