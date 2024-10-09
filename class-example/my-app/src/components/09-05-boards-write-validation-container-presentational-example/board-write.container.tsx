'use client'

import { useMutation } from "@apollo/client"
import BoardWriteUI from "./board-write.presenter"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { FETCH_BOARD, UPDATE_BOARD, 나의그래프큐엘셋팅 } from "./boards-write.wueries"

export default function BoardWrite(props) {
    const [나의함수] = useMutation(나의그래프큐엘셋팅)
    const [updateBoard] = useMutation(UPDATE_BOARD)
    const router = useRouter()
    const params = useParams()
    console.log(params.number)

    const [writer, setWriter] = useState("")
    const [title, setTitle] = useState("")
    const [contents, setContents] = useState("")

    const onChangeWiter = (event) => {
      setWriter(event.target.value)
    }
    const onChangeTitle = (event) => {
      setTitle(event.target.value)
    }
    const onChangeContent = (event) => {
      setContents(event.target.value)
    }

    const onClickSubmit = async() => {
        const result = await 나의함수({
          variables: { //variables가 변수앞에 $역활을 대신함
            mywriter: writer,
            mytitle: title,
            mycontents: contents,
          }

        })
        console.log(result)    ;
        alert('등록이 완료되었습니다.')
        router.push(`/section09/09-05-boards-validation-container-presentational-example/${result.data.createBoard.number}`)
    }

    const onClickUpdate = async() => {

      const myvariables = {
        mynumber: Number(params.number)
      }
      if(writer) myvariables.mywriter =writer
      if(title) myvariables.mytitle =title
      if(contents) myvariables.mycontents =contents
      


        // 여기서 수정하기 하자!
        const result = await updateBoard({
            variables: myvariables
            ,
            refetchQueries: [{
                query: FETCH_BOARD,
                variables: {
                    mynumber: Number(params.number)
                }
              }]
        })
        
        console.log(result)
        alert('수정이 완료되었습니다.')
        router.push(`/section09/09-05-boards-validation-container-presentational-example/${result.data.updateBoard.number}`)
    }

    return (
        <BoardWriteUI
        작성자입력하는기능={onChangeWiter}
        제목입력하는기능={onChangeTitle}
        내용입력하는기능={onChangeContent}
        등록하는기능={onClickSubmit}
        수정하는기능={onClickUpdate}
        isEdit={props.isEdit}
        data={props.data}
        />
    )
}