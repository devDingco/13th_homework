"use client";

import React, { useState } from "react";
import Header from "@/components/diary/diary-list/Header";
import SearchFilter from "@/components/diary/diary-list/SearchFilter";
import ViewToggle from "@/components/diary/diary-list/ViewToggle";
import DiaryGrid from "@/components/diary/diary-list/DiaryGrid";
import DiaryPagination from "@/components/diary/diary-list/Pagination";
import DiaryList from "@/components/diary/diary-list/DiaryList";

export default function DiaryListPage() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="flex flex-col">
      <Header />
      <div className="p-8">
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
