"use client"
import { gql, useMutation } from "@apollo/client"
import styles from "../app/boards/new/styles.module.css"
import { ChangeEvent, useState, MouseEvent } from "react"
import { boardGraphql } from "./queries"
export function NewButton(){

    const [name, setName] = useState("")
    const [nameError, setNameError] = useState("")

    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [title, setTitle] = useState("")
    const [titleError, setTitleError] = useState("")

    const [subject, setSubject] = useState("")
    const [subjectError, setSubjectError] = useState("")

    const [isActive, setIsActive] = useState(false)

    // const boardGraphql = gql`
    // mutation createBoard(
    //     $boardwriter:String
    //     $boardtitle:String
    //     $boardcontents:String
    //   ){
    //     createBoard(writer:$boardwriter, title:$boardtitle, contents:$boardcontents){
    //       _id
    //       number
    //       message
    //     }  
    //   }
    // `

    const [boardRegister] = useMutation(boardGraphql);

    let registerError = false;
    const register = async (event:MouseEvent<HTMLButtonElement>) => {
      const result = await boardRegister({
        variables: {
          boardwriter: name,
          boardtitle: title,
          boardcontents: subject,
        },
      })
        if(name.trim() === ""){
          setNameError("필수입력 사항 입니다.")
          registerError = true;
        }
        else{
          setNameError("")
        }
    
        if(password.trim() === ""){
          setPasswordError("필수입력 사항 입니다.")
          registerError = true;
        }
        else{
          setPasswordError("")
        }
    
        if(title.trim() === ""){
          setTitleError("필수입력 사항 입니다.")
          registerError = true;
        }
        else{
          setTitleError("")
        }
    
        if(subject.trim() === ""){
          setSubjectError("필수입력 사항 입니다.")
          registerError = true;
        }
        else{
          setSubjectError("")
        }
    
        if(!registerError){
          alert("게시글 등록이 가능한 상태입니다.")
        }
      }
      const registerColor = {
        backgroundColor:"#c3c3c3",
        color:"#E4E4E4"
      }
      const registerActive = {
        backgroundColor:"#2974E5",
        color:"#fff"
      }

    return(
        <div className={styles.bt_button}>
            <button className={styles.cancel_btn}>취소</button>
            <button onClick={register} style={isActive === true ? registerActive : registerColor}>등록하기</button>
        </div>
    )
}