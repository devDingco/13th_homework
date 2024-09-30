"use client"
import styles from "../app/boards/new/styles.module.css"
import { ChangeEvent, useState } from "react"

export function NewTitle(){

    const [name, setName] = useState("")
    const [nameError, setNameError] = useState("")
  
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [title, setTitle] = useState("")
    const [titleError, setTitleError] = useState("")

    const [subject, setSubject] = useState("")
    const [subjectError, setSubjectError] = useState("")

    const [isActive, setIsActive] = useState(false)

    const onChangeTitle = (event:ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    
        if(name !== "" && password !== "" && event.target.value !== "" && subject !== "") return setIsActive(true)
        setIsActive(false)
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
        <div className={styles.title}>
            <span className="new-span">제목</span><span className={`${styles.red} new-span`}>*</span>
            <input className="d-block" type="text" placeholder="제목을 입력해 주세요." onChange={onChangeTitle}></input>
            <div className={styles.error}>{titleError}</div>
        </div>
    )
}