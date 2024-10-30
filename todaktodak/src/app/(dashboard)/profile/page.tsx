"use client";
import { useState } from "react";
import {
  User,
  Calendar,
  ChartBar,
  AlertCircle,
  ChevronRight,
  Lock,
} from "lucide-react";
import DeleteAccountModal from "@/components/modals/DeleteAccountModal";
import NotificationSettings from "@/components/profile/NotificationSettings";
import MyReviews from "@/components/profile/MyReviews";
import Link from "next/link";

export default function ProfilePage() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* 프로필 섹션 */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center space-x-6">
          {/* profile image */}
          <div className="w-32 h-32 rounded-full bg-indigo-100 overflow-hidden">
            <img
              src="/default-profile.jpg"
              alt="프로필"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">사용자닉네임</h1>
                <p className="text-gray-600 mt-1">example@email.com</p>
              </div>
              <Link
                href="/profile/edit"
                className="px-4 py-2 h-10 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                프로필 수정
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">152</div>
                <div className="text-sm text-gray-600 mt-1">총 일기 수</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">89</div>
                <div className="text-sm text-gray-600 mt-1">공개 일기</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">63</div>
                <div className="text-sm text-gray-600 mt-1">비공개 일기</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 상담 현황 */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
            상담 예약 현황
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">다음 상담</div>
                <div className="text-sm text-gray-600">
                  2024년 3월 15일 14:00
                </div>
              </div>
              <button className="text-indigo-600 hover:text-indigo-700">
                상세보기
              </button>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-indigo-600">12</div>
              <div className="text-sm text-gray-600 mt-1">총 상담 횟수</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <ChartBar className="w-5 h-5 mr-2 text-indigo-600" />
            감정 통계
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                <span>행복</span>
              </div>
              <div className="flex items-center">
                <div className="w-32 h-2 bg-yellow-200 rounded-full mr-2"></div>
                <span className="text-sm">45%</span>
              </div>
            </div>
            {/* 더 많은 감정 통계... */}
          </div>
        </div>
      </div>

      <NotificationSettings />
      <MyReviews />

      {/* 계정 설정 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">계정 설정</h2>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-3 text-gray-500" />
              <span>개인정보 수정</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Lock className="w-5 h-5 mr-3 text-gray-500" />
              <span>비밀번호 변경</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full flex items-center justify-between p-4 text-left text-red-600 hover:bg-red-50 rounded-lg"
          >
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-3" />
              <span>회원 탈퇴</span>
            </div>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 회원 탈퇴 모달 */}
      {showDeleteModal && (
        <DeleteAccountModal onClose={() => setShowDeleteModal(false)} />
      )}
    </div>
  );
}
