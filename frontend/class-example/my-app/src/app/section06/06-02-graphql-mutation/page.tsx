'use client'
import {useMutation, gql} from '@apollo/client'

const 나의그래프큐엘셋팅 = gql `
mutation {
	createBoard (
    writer:"dd"
    title:"dd"
    contents:"dd"
    
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
        const result = await 나의함수()
        console.log(result)       
    }


    // 한줄일때는 리턴다음에오는 괄호 생략 가능
  return  <button onClick={onClickSubmit}>GRAPHQL-API 요청하기</button> ;
  
}


