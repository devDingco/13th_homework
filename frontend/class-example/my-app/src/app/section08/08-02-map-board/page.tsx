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

    return (
        <div>
            {data?.fetchBoards.map((el)=> (
                <div key={el.number}>
                    <span>
                        <input type="checkbox"/>
                    </span>
                    <span style={{margin: "10px"}}>{el.number}</span>
                    <span>{el.title}</span>
                    <span>{el.writer}</span>
                </div>
            ))}

        </div>
    )
}