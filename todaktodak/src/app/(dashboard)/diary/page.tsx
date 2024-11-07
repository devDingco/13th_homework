"use client";

import React, { useState } from "react";

import SearchFilter from "@/components/diary/diary-list/SearchFilter";
import ViewToggle from "@/components/diary/diary-list/ViewToggle";
import DiaryGrid from "@/components/diary/diary-list/DiaryGrid";
import DiaryPagination from "@/components/diary/diary-list/Pagination";
import DiaryList from "@/components/diary/diary-list/DiaryList";
import Header from "@/components/shared/Header";

export default function DiaryListPage() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="flex flex-col h-full">
      <Header h1="나의 일기장" p="오늘의 감정을 기록하세요" />
      <div className="max-w-5xl mx-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <SearchFilter />
          <ViewToggle view={view} onViewChange={setView} />
        </div>

        {view === "grid" ? <DiaryGrid /> : <DiaryList />}

        <DiaryPagination />
      </div>
    </div>
  );
}
