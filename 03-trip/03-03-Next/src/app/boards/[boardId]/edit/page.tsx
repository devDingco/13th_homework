"use client";
import BoardsDetailUI from "@/components/Organisms/BoardsDetail";
import { withLoginCheck } from "@/commons/hocs/withLoginCheck";

function BoardsDetailEdit() {
    return <BoardsDetailUI isEdit={true} />;
}

export default withLoginCheck(BoardsDetailEdit);
