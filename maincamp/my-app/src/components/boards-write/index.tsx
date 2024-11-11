"use client"

import styles from "./styles.module.css";
import Image from "next/image"
import useBoardDetailEdit from "./hook";
import { IBoardWriteProps } from "./types";
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";

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
        isOpen,
        writeAddress,
        zoneAddress,
        fileRef,
        imageUrl,
        onChangeName,
        onChangePassword,
        onChangeSubject,
        onChangeTitle,
        onClickAddress,
        setZoneAddress,
        setWriteAddress,
        handleOk,
        handleCancel,
        handleComplete,
        onClickImageFile,
        onChangeImageUpload,
        register

    } = useBoardDetailEdit(isEdit);

    return (
        <div className={styles.content}>
            <h1 className="new-h1">{props.isEdit===true ? "게시글 수정" : "게시글 등록"}</h1>
            <div className={styles.name_pw_bg}>
                <div>
                    <span className="new-span">작성자</span><span className={`${styles.red} new-span`}>*</span>
                    <input 
                        disabled={props.isEdit} 
                        defaultValue={props.isEdit ? data?.fetchBoard.writer || "" :name} 
                        // fetchBoard.writer || "" : name > data?.fetchBoard.writer가 null 또는 undefined일 경우 빈 문자열("")이 사용됨.
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
                    <input 
                        type="text" 
                        placeholder="01234" 
                        value={zoneAddress}
                        onChange={(event) => setZoneAddress(event.target.value)}
                        readOnly
                    >
                    </input>
                    <button onClick={onClickAddress}>우편번호 검색</button>
                    {isOpen && (
                        <Modal open={true} onOk={handleOk} onCancel={handleCancel}>
                            <DaumPostcodeEmbed onComplete={handleComplete} />
                        </Modal>
                    )}
                </div>
                <input 
                    className="d-block" 
                    type="text" 
                    placeholder="주소를 입력해 주세요." 
                    value={writeAddress}
                    onChange={(event) => setWriteAddress(event.target.value)}
                    readOnly
                >    
                </input>
                <input type="text" placeholder="상세주소"></input>
            </div>
            <div className={styles.link}>
                <p className="new-p">유튜브 링크</p>
                <input type="text" placeholder="링크를 입력해 주세요."></input>
            </div>
            <div className={styles.picture}>
                <p className="new-p">사진 첨부</p>
                <div className={styles.imageWrap}>
                    {imageUrl.map((imageUrl, index) => (
                        <div key={index} className={styles.imageUpload}>
                            <button 
                                onClick={() => onClickImageFile(index)} 
                                className={styles.onClickImageFile}>
                            </button>
                            <input 
                                type="file"
                                onChange={(event) => onChangeImageUpload(index, event)}
                                accept="image/jpeg, image/png"
                                ref={fileRef[index]}
                                style={{display:"none"}}
                            />
                                {imageUrl && 
                                <img src={`https://storage.googleapis.com/${imageUrl}`} 
                                alt={`미리보기 ${index + 1}`} />}
                        </div>
                    ))}
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