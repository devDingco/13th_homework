"use client"
import styles from "../app/boards/new/styles.module.css"
import { ChangeEvent, useState } from "react"
export function NewAddress(){

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
        <div className={styles.address}>
            <p className="new-p">주소</p>
            <div className={styles.address_top}>
                <input type="text" placeholder="01234"></input>
                <button>우편번호 검색</button>
            </div>
            <input className="d-block" type="text" placeholder="주소를 입력해 주세요."></input>
            <input type="text" placeholder="상세주소"></input>
        </div>
    )
}