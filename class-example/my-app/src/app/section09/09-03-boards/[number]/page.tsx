'use client'

import { gql, useQuery } from "@apollo/client"
import Link from "next/link"
import { useParams } from "next/navigation"

const FETCH_BOARD = gql`
    query fetchBoard($mynumber: Int) {
    fetchBoard(number: $mynumber){
        number
        writer
        title
        contents
    }
    }
`

export default function BoardsDetailPage() {
    const params = useParams()
   

    const {data} = useQuery(FETCH_BOARD, {
        variables: {
            mynumber: Number(params.number) // 문자열을 숫자로 변환fetchBoard(number) 형식으로 줘야하기 때문에
        }
    })
    console.log(data)

    return (
        <>
           <div>1게시글 상세페이지 이동이 완료되었습니다.</div>
           <div>작성자: {data && data.fetchBoard.writer}</div>
           <div>제목: {data ? data.fetchBoard.title : " "}</div>
           <div>내용: {data ?. fetchBoard.contents}</div>
           <Link href={`/section09/09-03-boards/${params.number}/edit`}>수정하러가기</Link>
        </>
    )
}