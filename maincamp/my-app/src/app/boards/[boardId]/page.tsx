"use client"

import BoardCommentList from "@/components/boards-detail/comment-list"
import BoardCommentWrite from "@/components/boards-detail/comment-write"
import BoardsDetail from "@/components/boards-detail/detail"

export default function BoardsDetailPage() {
    return(
        <>
            <BoardsDetail />
            <BoardCommentWrite />
            <BoardCommentList />
        </>
    )
}