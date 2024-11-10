"use client";
import BoardsNewUI from "@/components/Organisms/BoardsNew";
import { withLoginCheck } from "@/common/hocs/withLoginCheck";

function BoardsNewPage() {
    return <BoardsNewUI />;
}

export default withLoginCheck(BoardsNewPage);
