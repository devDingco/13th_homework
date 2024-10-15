"use client"

import styles from "./styles.module.css";
import { useMutation, useQuery } from "@apollo/client"
import { useParams, useRouter } from "next/navigation"
import { ChangeEvent, MouseEvent, useState } from "react"
import { boardGraphql, FETCH_BOARD } from "../queries"
import Image from "next/image"

export interface IBoardsWriteProps {
    isEdit: boolean;
  }

export default function BoardDetailEdit(props: IBoardsWriteProps){
    
    const [name, setName] = useState("")
    const [nameError, setNameError] = useState("")

    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [title, setTitle] = useState("")
    const [titleError, setTitleError] = useState("")

    const [subject, setSubject] = useState("")
    const [subjectError, setSubjectError] = useState("")

    const [isActive, setIsActive] = useState(false)

    const router = useRouter();
    const params = useParams();
    const editId = props.isEdit ? params.boardId : null;

    const {data} = useQuery(FETCH_BOARD, {
        variables: {boardId: editId},
    }); // useQuery는 data로 받아야함
    console.log('data:::::', data);

    // 리팩토링 후 early-exit 패턴
    const onChangeName = (event:ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)

        if(event.target.value !== "" && password !== "" && title !== "" && subject !== "") return setIsActive(true)
        setIsActive(false)
    }
    const onChangePassword = (event:ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)

        if(name !== "" && event.target.value !== "" && title !== "" && subject !== "") return setIsActive(true)
        setIsActive(false)
    }
    const onChangeTitle = (event:ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)

        if(name !== "" && password !== "" && event.target.value !== "" && subject !== "") return setIsActive(true)
        setIsActive(false)
    }
    const onChangeSubject = (event:ChangeEvent<HTMLTextAreaElement>) => {
        setSubject(event.target.value)

        if(name !== "" && password !== "" && title !== "" && event.target.value !== "") return setIsActive(true)
        setIsActive(false)
    }

    // GraphQL
    const [createBoard] = useMutation(boardGraphql);

    let registerError = false;

    const register = async (event:MouseEvent<HTMLButtonElement>) => {
        
        if(props.isEdit === false){
            if(name.trim() === ""){
                setNameError("필수입력 사항입니다.")
                registerError = true;
            }
            else{
                setNameError("")
            }
        
            if(password.trim() === ""){
                setPasswordError("필수입력 사항입니다.")
                registerError = true;
            }
            else{
                setPasswordError("")
            }
        
            if(title.trim() === ""){
                setTitleError("필수입력 사항입니다.")
                registerError = true;
            }
            else{
                setTitleError("")
            }
        
            if(subject.trim() === ""){
                setSubjectError("필수입력 사항입니다.")
                registerError = true;
            }
            else{
                setSubjectError("")
            }
        
            if(!registerError){
                const result = await createBoard({
                    variables: {
                        createBoardInput:{
                            writer: name,
                            password: password,
                            title: title,
                            contents: subject,
                            youtubeUrl: "",
                            boardAddress: {
                                zipcode: "",
                                address: "",
                                addressDetail: "",
                            },
                            images: ""
                        }
                    },
                })
                alert("게시글이 등록되었습니다.")
                console.log(result.data.createBoard._id);
        
                router.push(`/boards/${result.data.createBoard._id}`)
            }
        }
        // 수정페이지
        else if(props.isEdit===true){
            if(title.trim() === ""){
                setTitleError("필수입력 사항입니다.")
                registerError = true;
            }
            else{
                setTitleError("")
            }
            if(subject.trim() === ""){
                setSubjectError("필수입력 사항입니다.")
                registerError = true;
            }
            else{
                setSubjectError("")
            }
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

    return (
        <div className={styles.content}>
            <h1 className="new-h1">{props.isEdit===true ? "게시글 수정" : "게시글 등록"}</h1>
            {/* <NewNamePassword />
            <NewTitle />
            <NewSubject />
            <NewAddress />
            <NewYoutube />
            <NewPicture />
            <NewButton /> */}
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
            <div className={styles.title}>
                <span className="new-span">제목</span><span className={`${styles.red} new-span`}>*</span>
                <input className="d-block" type="text" placeholder="제목을 입력해 주세요." onChange={onChangeTitle}></input>
                <div className={styles.error}>{titleError}</div>
            </div>
            <div className={styles.subject}>
                <span className="new-span">내용</span><span className={`${styles.red} new-span`}>*</span>
                <textarea className="d-block" placeholder="내용을 입력해 주세요." onChange={onChangeSubject}></textarea>
                <div className={styles.error}>{subjectError}</div>
            </div>
            <div className={styles.address}>
                <p className="new-p">주소</p>
                <div className={styles.address_top}>
                    <input type="text" placeholder="01234"></input>
                    <button>우편번호 검색</button>
                </div>
                <input className="d-block" type="text" placeholder="주소를 입력해 주세요."></input>
                <input type="text" placeholder="상세주소"></input>
            </div>
            <div className={styles.link}>
                <p className="new-p">유튜브 링크</p>
                <input type="text" placeholder="링크를 입력해 주세요."></input>
            </div>
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
            <div className={styles.bt_button}>
                <button className={styles.cancel_btn}>취소</button>
                <button onClick={register} style={isActive === true ? registerActive : registerColor}>{props.isEdit === true ? "수정하기" : "등록하기"}</button>
            </div>
        </div>
    )
}