'use client'
import {useMutation, gql} from '@apollo/client'

//명시되어있는 타입은 타입스크립트 타입이아니라 그래프큐엘에 명시되어있는 타입임
const 나의그래프큐엘셋팅 = gql `
mutation createBoard06_03($mywriter: String, $mytitle: String, $mycontent: String) { 
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

    const onClickSubmit = async() => {
        const result = await 나의함수({
          variables: { //variables가 변수앞에 $역활을 대신함
            mywriter: "훈이",
            mytitle: "안녕하세요",
            mycontent: "반값습니다",
          }

        })
        console.log(result)       
    }


    // 한줄일때는 리턴다음에오는 괄호 생략 가능
  return  <button onClick={onClickSubmit}>GRAPHQL-API 요청하기</button> ;
  
}


