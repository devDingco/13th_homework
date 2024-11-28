'use client'

import BoardsWrite from "@/components/09-05-boards-write-validation-container-presentational-example/board-write.container"
import { gql, useQuery } from "@apollo/client"
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

export default function BoardsNewEditPage() {

    const params = useParams()
    const {data} = useQuery(FETCH_BOARD, {
        variables: {
            mynumber: Number(params.number) // 문자열을 숫자로 변환fetchBoard(number) 형식으로 줘야하기 때문에
        }
    })




    return <BoardsWrite isEdit={true} data={data}/>
}