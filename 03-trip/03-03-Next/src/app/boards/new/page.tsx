"use client";
import BoardsNewUI from "@/components/Organisms/BoardsNew";
import { withLoginCheck } from "@/commons/hocs/withLoginCheck";

function BoardsNewPage() {
    return <BoardsNewUI />;
}

export default withLoginCheck(BoardsNewPage);
