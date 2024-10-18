"use client"

import BoardsDetail from "@/components/boards-detail/detail"
import BoardListBanner from "@/components/boards-list/banner"
import BoardsList from "@/components/boards-list/list"

export default function BoardsListPage() {

    return(
        <>
            <BoardListBanner />
            <BoardsList />
            {/* <BoardsDetail /> */}
        </>
    )
}