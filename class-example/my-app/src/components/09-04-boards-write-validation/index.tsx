'use client'

import { gql, useMutation } from "@apollo/client"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

const 나의그래프큐엘셋팅 = gql `
    mutation createBoard09_04($mywriter: String, $mytitle: String, $mycontents: String) { 
        createBoard (
        writer: $mywriter
        title: $mytitle
        contents: $mycontents
        
    ) {
        _id
        number
        message
     } 
    }
` ;

const UPDATE_BOARD = gql`
    mutation updateBoard($mynumber: Int, $mywriter: String, $mytitle: String, $mycontents: String) {
        updateBoard(number: $mynumber, writer: $mywriter, title: $mytitle, contents: $mycontents) {
            _id
            number
            message
        }
    }
`;

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
export default function BoardsWrite(props) {


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
        router.push(`/section09/09-04-boards-validation/${result.data.createBoard.number}`)
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
        router.push(`/section09/09-04-boards-validation/${result.data.updateBoard.number}`)
    }



    return ( 
        <>
          작성자: <input type='text' onChange={onChangeWiter} defaultValue={props.data ?. fetchBoard.writer}/> <br/>
          제목: <input type='text' onChange={onChangeTitle} defaultValue={props.data ?. fetchBoard.title}/> <br/>
          내용: <input type='text' onChange={onChangeContent} defaultValue={props.data ?. fetchBoard.contents}/> <br/>
          <button onClick={props.isEdit ? onClickUpdate : onClickSubmit}>
            {props.isEdit ? "수정" : "등록"}하기
        </button> 
        </>
      );

}