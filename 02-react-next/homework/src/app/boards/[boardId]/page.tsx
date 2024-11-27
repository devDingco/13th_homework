"use client";
import BoardsDetailUI from "@/components/Organisms/BoardsDetail";
import CommentListUI from "@/components/Organisms/CommentList";
import CommentNewUI from "@/components/Organisms/CommentNew";

export default function BoardsDetailPage() {
    return (
        <>
            <BoardsDetailUI isEdit={false} />
            <CommentNewUI />
            <CommentListUI />
        </>
    );
}
