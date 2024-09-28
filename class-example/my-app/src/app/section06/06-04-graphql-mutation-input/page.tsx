'use client'
import {useMutation, gql} from '@apollo/client'
import { useState } from 'react'

//명시되어있는 타입은 타입스크립트 타입이아니라 그래프큐엘에 명시되어있는 타입임
const 나의그래프큐엘셋팅 = gql `
mutation creatBoard($mywriter: String, $mytitle: String, $mycontent: String) { 
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

export default function GraphqlMuatationPage () {
    const [나의함수] = useMutation(나의그래프큐엘셋팅)

    const [writer, setWriter] = useState("")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const onChangeWiter = (event) => {
      setWriter(event.target.value)
    }
    const onChangeTitle = (event) => {
      setTitle(event.target.value)
    }
    const onChangeContent = (event) => {
      setContent(event.target.value)
    }

    const onClickSubmit = async() => {
        const result = await 나의함수({
          variables: { //variables가 변수앞에 $역활을 대신함
            mywriter: writer,
            mytitle: title,
            mycontent: content,
          }

        })
        console.log(result)       
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


