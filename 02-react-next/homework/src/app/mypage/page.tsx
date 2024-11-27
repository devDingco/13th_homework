"use client";

import { withLoginCheck } from "@/common/hocs/withLoginCheck";

import MyPageUI from "@/components/Organisms/Mypage";

import KakaoMapUI from "@/components/Library/KakaoMap";
import ToastEditorUI from "@/components/Library/ToastEditor";

import SearchUI from "@/components/Molecules/Search";
import BoardsListUI from "@/components/Organisms/BoardsList";

function MyPage() {
    return (
        <>
            <MyPageUI />
            <KakaoMapUI />
            <ToastEditorUI />
            <SearchUI />
            <BoardsListUI />
        </>
    );
}

export default withLoginCheck(MyPage);
