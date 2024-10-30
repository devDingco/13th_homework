"use client";

import React from "react";
import CounselorCard from "@/components/counselor/list/CounselorCard";
import SearchFilter from "@/components/counselor/list/SearchFilter";
import Header from "@/components/shared/Header";

export default function CounselorListPage() {
  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <Header h1="상담사 찾기" p="신뢰할 수 있는 전문 상담사를 만나보세요" />
      {/* search and Filter */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <SearchFilter />
      </div>
      {/* 상담사 리스트 */}
      <div className="max-w-7xl mx-auto px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <CounselorCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
