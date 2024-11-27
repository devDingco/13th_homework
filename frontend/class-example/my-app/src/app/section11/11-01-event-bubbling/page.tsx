'use client'

import { gql, useQuery } from "@apollo/client"

const FETCH_BOARDS = gql`
    query{
    fetchBoards(page:1){
        number
        writer
        title
        contents
    }
    }
`



export default function StaticRoutingMovedPage () {
    const {data} = useQuery(FETCH_BOARDS)
    console.log(data)

    const onClickAlert = (event) => {
        //event.target -> 내가 클릭한 태그
        //evnet.currentTarget -> 내 클릭이 버블링되면 부모꺼 onClick이 실행되는데, 현재 실행되느 그 태그
        alert(`${event.currentTarget.id}님이 작서한 게시물입니다.`)
    }
    
    return (
        <div >
            {data?.fetchBoards.map((el)=> (
                <div key={el.number} id={el.writer} onClick={onClickAlert}>
                    <span>
                        <input type="checkbox"/>
                    </span>
                    <span style={{margin: "10px"}}>{el.number}</span>
                    <span style={{margin: "10px"}}>{el.title}</span>
                    <span style={{margin: "10px"}}>{el.writer}</span>
                </div>
            ))}

        </div>
    )
}