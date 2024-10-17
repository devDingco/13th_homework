"use client"

import styles from "./styles.module.css";
import Image from "next/image"
import useBoardDetailEdit from "./hook";
import { IBoardWriteProps } from "./types";

export default function BoardDetailEdit(props: IBoardWriteProps){
    const {isEdit} = props;
    
    const {
        name,
        data,
        nameError,
        password,
        passwordError,
        title,
        titleError,
        subject,
        subjectError,
        registerColor,
        registerActive,
        isActive,
        onChangeName,
        onChangePassword,
        onChangeSubject,
        onChangeTitle,
        register

    } = useBoardDetailEdit(isEdit);

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
                    <input 
                        disabled={props.isEdit} 
                        defaultValue={props.isEdit ? data?.fetchBoard.writer:name} 
                        type="text" 
                        placeholder="작성자 명을 입력하세요." 
                        onChange={onChangeName}>
                    </input>
                    <div className={styles.error}>{nameError}</div>
                </div>
                <div>
                    <span className="new-span">비밀번호</span><span className={`${styles.red} new-span`}>*</span>
                    <input 
                        disabled={props.isEdit} 
                        defaultValue={props.isEdit ? "********":password} 
                        type="password" 
                        placeholder="비밀번호를 입력해 주세요." 
                        onChange={onChangePassword}>
                    </input>
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
                <button 
                    onClick={register} 
                    style={isActive === true ? registerActive : registerColor}>
                    {props.isEdit === true ? "수정하기" : "등록하기"}
                </button>
            </div>
        </div>
    )
}