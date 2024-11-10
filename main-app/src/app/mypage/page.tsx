"use client";

import { withLoginCheck } from "@/common/hocs/withLoginCheck";
import KakaoMapUI from "@/components/Molecules/KakaoMap";
import SearchUI from "@/components/Molecules/Search";
import BoardsListUI from "@/components/Organisms/BoardsList";
import MyPageUI from "@/components/Organisms/Mypage";

function MyPage() {
    return (
        <>
            <MyPageUI />
            <KakaoMapUI />
            <SearchUI />
            <BoardsListUI />
        </>
    );
}

export default withLoginCheck(MyPage);
