'use client'

import BoardComponentWrite from "@/components/09-02-board-component-write"

export default function boardNewPage() {


    return(
        <BoardComponentWrite isEdit={false}/> //isEdit는 변수와같이 지을 수 있는것
    )

}