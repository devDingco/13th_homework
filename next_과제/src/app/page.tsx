"use client";

import MainSlide from "@/components/mainSlide";

import BoardList from "@/components/board-list";

import HotTripTalk from "@/components/hotTripTalk";

export default function Home() {
  return (
    <>
      <MainSlide />
      <div className="mainContent">
        <HotTripTalk />
        <div className="flex flex-col gap-6">
          <h3 className="font-bold text-xl">트립토크 게시판</h3>
          <BoardList searchBox={true} />
        </div>
      </div>
    </>
  );
}
