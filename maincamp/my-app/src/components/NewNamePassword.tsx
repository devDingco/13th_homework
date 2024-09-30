import styles from "../app/boards/new/styles.module.css"
import Image from "next/image"
import {ChangeEvent, MouseEvent, useState} from 'react'
  
  export function NewNamePassword(){

    const [name, setName] = useState("")
    const [nameError, setNameError] = useState("")
  
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [title, setTitle] = useState("")
    const [titleError, setTitleError] = useState("")

    const [subject, setSubject] = useState("")
    const [subjectError, setSubjectError] = useState("")

    const [isActive, setIsActive] = useState(false)

    const onChangeName = (event:ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value)
  
      if(event.target.value !== "" && password !== "" && title !== "" && subject !== "") return setIsActive(true)
      setIsActive(false)
    }
    const onChangePassword = (event:ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value)
    }

    let registerError = false;
    const register = (event:MouseEvent<HTMLButtonElement>) => {
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
      <div className={styles.name_pw_bg}>
          <div>
              <span className="new-span">작성자</span><span className={`${styles.red} new-span`}>*</span>
              <input type="text" placeholder="작성자 명을 입력하세요." onChange={onChangeName}></input>
              <div className={styles.error}>{nameError}</div>
          </div>
          <div>
              <span className="new-span">비밀번호</span><span className={`${styles.red} new-span`}>*</span>
              <input type="password" placeholder="비밀번호를 입력해 주세요." onChange={onChangePassword}></input>
              <div className={styles.error}>{passwordError}</div>
          </div>
      </div>
    )
  
  }