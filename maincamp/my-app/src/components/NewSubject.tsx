"use client"
import styles from "../app/boards/new/styles.module.css"
import { ChangeEvent, useState } from "react"

export function NewSubject(){

    const [name, setName] = useState("")
    const [nameError, setNameError] = useState("")
  
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [title, setTitle] = useState("")
    const [titleError, setTitleError] = useState("")

    const [subject, setSubject] = useState("")
    const [subjectError, setSubjectError] = useState("")

    const [isActive, setIsActive] = useState(false)

    const onChangeSubject = (event:ChangeEvent<HTMLTextAreaElement>) => {
        setSubject(event.target.value)
    
        if(name !== "" && password !== "" && title !== "" && event.target.value !== "") return setIsActive(true)
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
        <div className={styles.subject}>
            <span className="new-span">내용</span><span className={`${styles.red} new-span`}>*</span>
            <textarea className="d-block" placeholder="내용을 입력해 주세요." onChange={onChangeSubject}></textarea>
            <div className={styles.error}>{subjectError}</div>
        </div>
    )
}