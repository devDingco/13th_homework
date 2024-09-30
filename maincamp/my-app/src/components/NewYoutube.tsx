"use client"
import styles from "../app/boards/new/styles.module.css"
import { ChangeEvent, useState } from "react"
export function NewYoutube(){

    const [name, setName] = useState("")
    const [nameError, setNameError] = useState("")
  
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [title, setTitle] = useState("")
    const [titleError, setTitleError] = useState("")

    const [subject, setSubject] = useState("")
    const [subjectError, setSubjectError] = useState("")

    const [isActive, setIsActive] = useState(false)

    return(
        <div className={styles.link}>
            <p className="new-p">유튜브 링크</p>
            <input type="text" placeholder="링크를 입력해 주세요."></input>
        </div>
    )
}