"use client";

import React from "react";
import { Star, MapPin, Phone, Mail, Clock } from "lucide-react";
import ReviewSection from "@/components/counselor/profile/ReviewSection";

export default function CounselorProfilePage() {
  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* Profile 상담사 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex items-start gap-8">
            <div className="w-48 h-48 rounded-lg overflow-hidden">
              <img
                src="/images/shocked.png"
                alt="상담사 프로필"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-2xl font-bold">신상담 상담사</h1>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">4.8</span>
                  <span className="ml-1 text-gray-500">(123개 리뷰)</span>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                500년 경력의 전문 상담사입니다. 우울증, 불안장애, 대인관계 등
                전문적인 상담을 제공합니다.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  서울시 강남구
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-2" />
                  010-1234-5678
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-2" />
                  counselor@example.com
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  평일 10:00 - 19:00
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-3 gap-8">
          {/* Left: 상세정보 */}
          <div className="col-span-2 space-y-8">
            {/*  소개 정보 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">소개</h2>
              <p className="text-gray-600">
                집에 일찍 가고 싶은 사람들을 치료해줘용 ❤️
              </p>
            </div>

            {/* 리뷰 */}
            <ReviewSection />
          </div>

          {/* Right: 지도, 예약 ---> fixed 고정 시키기 */}
          <div className="space-y-6 ">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="aspect-w-1 aspect-h-1 bg-yellow-200 rounded-lg mb-4 w-full h-64">
                {/* Map */}map
              </div>
              <button className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                상담 예약하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
