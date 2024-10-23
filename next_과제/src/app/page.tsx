"use client";

import MainSlide from "@/components/mainSlide";

import BoardList from "@/components/board-list";

import HotTripTalk from "@/components/hotTripTalk";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log("세션", session);

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
