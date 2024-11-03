"use client";
import BoardsDetailUI from "@/components/Organisms/BoardsDetail";
import { withLoginCheck } from "@/common/hocs/withLoginCheck";

function BoardsDetailEdit() {
    return <BoardsDetailUI isEdit={true} />;
}

export default withLoginCheck(BoardsDetailEdit);
