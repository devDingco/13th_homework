'use client'

import { gql, useMutation } from "@apollo/client"
import { useRouter } from "next/navigation" // 최신버전에서는 넥스트 네비게이션 경로의 것으로 사용해야함!!
import { ChangeEvent, useState } from "react"

const 나의그래프큐엘셋팅 = gql `
mutation createBoard07_04($mywriter: String, $mytitle: String, $mycontent: String) { 
	createBoard (
    writer: $mywriter
    title: $mytitle
    contents: $mycontent
    
  ) {
    _id
    number
    message
  } 
}
`
export default function StaticRoutingPage () {

    const router = useRouter()
   
    const [나의함수] = useMutation(나의그래프큐엘셋팅)

    const [writer, setWriter] = useState("")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const onChangeWiter = (event:ChangeEvent<HTMLInputElement>) => {
      setWriter(event.target.value)
    }
    const onChangeTitle = (event:ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value)
    }
    const onChangeContent = (event:ChangeEvent<HTMLInputElement>) => {
      setContent(event.target.value)
    }

    const onClickSubmit = async() => {
        try {  //try문이 실패하면 건너 뛰고 catch로 넘어가게됨
            const result = await 나의함수({
                variables: { 
                  mywriter: writer,
                  mytitle: title,
                  mycontent: content,
                }
      
              })
              console.log(result)
              console.log(result.data.createBoard.number)  
              alert('게시글 등록 성공')
      
      
              router.push(`/section07/07-04-dynamic-routing-board-mutation-moved/${result.data.createBoard.number}`)
            
        } catch (error) {
            alert(error)
        } finally { //성공하던 실패하던 실행해야하는 코드작성

        }


    
    }


    // 한줄일때는 리턴다음에오는 괄호 생략 가능
  return ( 
    <>
      작성자: <input type='text' onChange={onChangeWiter}/> <br/>
      제목: <input type='text' onChange={onChangeTitle}/> <br/>
      내용: <input type='text' onChange={onChangeContent}/> <br/>
      <button onClick={onClickSubmit}>GRAPHQL-API 요청하기</button> 
    </>
  );
}