"use client"
import styles from "../app/boards/new/styles.module.css"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
export function NewPicture(){

    const [name, setName] = useState("")
    const [nameError, setNameError] = useState("")
  
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [title, setTitle] = useState("")
    const [titleError, setTitleError] = useState("")

    const [subject, setSubject] = useState("")
    const [subjectError, setSubjectError] = useState("")

    const [isActive, setIsActive] = useState(false)

    const registerColor = {
      backgroundColor:"#c3c3c3",
      color:"#E4E4E4"
    }
    const registerActive = {
        backgroundColor:"#2974E5",
        color:"#fff"
    }  

    return(
        <div className={styles.picture}>
          <p className="new-p">사진 첨부</p>
          <div>
              <button>
                <Image 
                    src="/images/add-image.png"
                    alt="사진업로드"
                    className={styles.picture_btn}
                    width={0}
                    height={0}
                    sizes="100vw"
                />
              </button>
              <button>
                <Image 
                    src="/images/add-image.png"
                    alt="사진업로드"
                    className={styles.picture_btn}
                    width={0}
                    height={0}
                    sizes="100vw"
                />
              </button>
              <button>
                <Image 
                    src="/images/add-image.png"
                    alt="사진업로드"
                    className={styles.picture_btn}
                    width={0}
                    height={0}
                    sizes="100vw"
                />
              </button>
          </div>
      </div>
    )
}