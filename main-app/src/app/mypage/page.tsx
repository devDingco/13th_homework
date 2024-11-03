"use client";

import { withLoginCheck } from "@/common/hocs/withLoginCheck";
import MyPageUI from "@/components/Organisms/Mypage";

function MyPage() {
    return (
        <>
            <MyPageUI />
        </>
    );
}

export default withLoginCheck(MyPage);
