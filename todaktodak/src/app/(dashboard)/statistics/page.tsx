"use client";

import Header from "@/components/shared/Header";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// 감정 추이 데이터
const emotionTrendData = [
  { date: "3/1", value: 7.5 },
  { date: "3/2", value: 8.0 },
  { date: "3/3", value: 6.5 },
  { date: "3/4", value: 7.0 },
  { date: "3/5", value: 8.5 },
  { date: "3/6", value: 9.0 },
  { date: "3/7", value: 8.0 },
  { date: "3/8", value: 7.5 },
  { date: "3/9", value: 8.0 },
  { date: "3/10", value: 8.5 },
  // ... 더 많은 데이터
];

// 감정 분포 데이터
const emotionDistributionData = [
  { name: "행복", value: 45 },
  { name: "평온", value: 25 },
  { name: "슬픔", value: 15 },
  { name: "불안", value: 10 },
  { name: "화남", value: 5 },
];

// 감정별 색상
const emotionColors = [
  "#FCD34D", // 행복 (노란색)
  "#93C5FD", // 평온 (파란색)
  "#9CA3AF", // 슬픔 (회색)
  "#A78BFA", // 불안 (보라색)
  "#EF4444", // 화남 (빨간색)
];

// 긍정적 활동 데이터
const positiveActivities = [
  { name: "운동", count: 12 },
  { name: "독서", count: 8 },
  { name: "가족모임", count: 6 },
  { name: "취미활동", count: 5 },
];

// 부정적 활동 데이터
const negativeActivities = [
  { name: "야근", count: 7 },
  { name: "회의", count: 5 },
  { name: "일정지연", count: 4 },
  { name: "트러블", count: 3 },
];

export default function StatisticsPage() {
  // 기간 선택 (월간/연간)
  const [period, setPeriod] = useState<"month" | "year">("month");
  // 선택된 월/년
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <>
      <Header h1="감정 통계" p="나의 감정 변화와 패턴을 분석해보세요" />
      <div className="p-8 max-w-5xl mx-auto">
        {/* 기간 선택 및 필터 */}
        <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setPeriod("month")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  period === "month"
                    ? "bg-white text-gray-900 shadow"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                월간
              </button>
              <button
                onClick={() => setPeriod("year")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  period === "year"
                    ? "bg-white text-gray-900 shadow"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                연간
              </button>
            </div>

            {/* 월/년 선택 */}
            <select
              className="px-4 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={selectedDate.toISOString()}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            >
              {/* 동적으로 옵션 생성 */}
            </select>
          </div>

          {/* 데이터 내보내기 버튼 */}
          <button className="px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg">
            데이터 내보내기
          </button>
        </div>

        {/* 주요 지표 카드 */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-sm text-gray-500 mb-2">가장 많은 감정</div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">
                😊
              </div>
              <div>
                <div className="font-medium">행복</div>
                <div className="text-sm text-gray-500">45%</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-sm text-gray-500 mb-2">감정 변화폭</div>
            <div className="text-2xl font-bold text-indigo-600">3.2</div>
            <div className="text-sm text-gray-500 mt-1">전월 대비 +0.5</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-sm text-gray-500 mb-2">일기 작성률</div>
            <div className="text-2xl font-bold text-green-600">85%</div>
            <div className="text-sm text-gray-500 mt-1">25/31일</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-sm text-gray-500 mb-2">평균 감정 점수</div>
            <div className="text-2xl font-bold text-blue-600">7.8</div>
            <div className="text-sm text-gray-500 mt-1">전월 대비 +1.2</div>
          </div>
        </div>

        {/* 감정 추이 그래프 */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <h3 className="text-lg font-semibold mb-6">감정 변화 추이</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={emotionTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6366F1"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 감정 분포와 분석 */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* 감정 분포 */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-6">감정 분포</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={emotionDistributionData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {emotionDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={emotionColors[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 감정 분석 */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">감정 분석</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500 mb-2">긍정적인 날</div>
                <div className="text-3xl font-bold text-green-600">68%</div>
                <div className="text-sm text-gray-500 mt-1">
                  주로 주말과 휴일에 긍정적인 감정을 기록했어요
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="text-sm text-gray-500 mb-2">부정적인 날</div>
                <div className="text-3xl font-bold text-red-600">32%</div>
                <div className="text-sm text-gray-500 mt-1">
                  업무 관련 스트레스가 주요 원인이었어요
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 감정-활동 관계 분석 */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-6">감정과 활동의 관계</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-4">
                긍정적인 감정과 연관된 활동
              </h4>
              <div className="space-y-3">
                {positiveActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                  >
                    <span className="font-medium text-green-700">
                      {activity.name}
                    </span>
                    <span className="text-sm text-green-600">
                      {activity.count}회
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-4">
                부정적인 감정과 연관된 활동
              </h4>
              <div className="space-y-3">
                {negativeActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                  >
                    <span className="font-medium text-red-700">
                      {activity.name}
                    </span>
                    <span className="text-sm text-red-600">
                      {activity.count}회
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 월간 인사이트 */}
        <div className="mt-8 bg-indigo-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-indigo-900 mb-4">
            이번 달의 인사이트
          </h3>
          <ul className="space-y-3 text-indigo-900">
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 mr-2"></span>
              운동을 한 날에는 대체로 긍정적인 감정을 기록했습니다.
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 mr-2"></span>
              주말에는 평균적으로 더 높은 감정 점수를 기록했습니다.
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 mr-2"></span>
              가족/친구와 보낸 시간이 많을수록 긍정적인 감정이 증가했습니다.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
