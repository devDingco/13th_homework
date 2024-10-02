'use client'

import { useRouter } from "next/navigation" // 최신버전에서는 넥스트 네비게이션 경로의 것으로 사용해야함!!


export default function StaticRoutingPage () {

    const 라우터 = useRouter()

    const onClickSubmit1 = () => {
        // 1. 게시글 등록하기
        // ....

        // 2. 등록된 페이지로 이동하기
        라우터.push("/section07/07-03-dynamic-routing-board-moved/1")
    }
    const onClickSubmit2 = () => {

        라우터.push("/section07/07-03-dynamic-routing-board-moved/2")
    }
    const onClickSubmit3 = () => {

        라우터.push("/section07/07-03-dynamic-routing-board-moved/3")
    }


    return (
        <>
            <button onClick={onClickSubmit1}>1게시글 등록하기</button>
            <button onClick={onClickSubmit2}>2게시글 등록하기</button>
            <button onClick={onClickSubmit3}>3게시글 등록하기</button>
        </>

    )
}