"use client";
import React from "react";
import styles from './styles.module.css'
import Image from "next/image";
import { IBoardsWriteProps } from "../types";
import { useBoardsWrite } from "./hook";

export default function BoardsWrite(props: IBoardsWriteProps) {
  const {
    saveImgFile,
    onClickSignup,
    onChangeContent,
    onChangeTitle,
    disabledBtn,
    onChangePw,
    onChangeWriter,
    errorWriter,
    errorPw,
    errorTitle,
    errorContent,
    files,
    data
  } = useBoardsWrite(props);
  console.log("sss",data)

  return (
    <div className={styles.allContainer}>
      <div className={styles.container}>
        <div className={styles.title}>게시글 {props.isEdit ? "수정" : "등록"}</div>
        <div className={styles.writerInfo}>
          <div className={styles.writer}>
            <p>
              작성자<span>*</span>
            </p>
            <input
              onChange={onChangeWriter}
              placeholder="작성자 명을 입력해 주세요."
              defaultValue={props.isEdit? String(props?.data?.fetchBoard?.writer):""}
              style={props.isEdit ? { backgroundColor: "#f2f2f2" } : { backgroundColor: "#ffffff" }}
              disabled={props.isEdit ? true : false}
            ></input>
            <div className={styles.errorMsg}>{errorWriter}</div>
          </div>
          <div className={styles.writer}>
            <p>
              비밀번호<span>*</span>
            </p>
            <input
              onChange={onChangePw}
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              defaultValue={props.isEdit ? "******" : ""}
              style={props.isEdit ? { backgroundColor: "#f2f2f2" } : { backgroundColor: "#ffffff" }}
              disabled={props.isEdit ? true : false}
            ></input>
            <div className={styles.errorMsg}>{errorPw}</div>
          </div>
        </div>
        <div className={styles.titleArea}>
          <p>
            제목<span>*</span>
          </p>
          <input
            onChange={onChangeTitle}
            placeholder="제목을 입력해 주세요."
            defaultValue={props.data?.fetchBoard.title}
          ></input>
          <div className={styles.errorMsg}>{errorTitle}</div>
        </div>
        <div className={styles.contentArea}>
          <p>
            내용<span>*</span>
          </p>
          <textarea
            onChange={onChangeContent}
            placeholder="내용을 입력해 주세요."
            defaultValue={props.data?.fetchBoard.contents}
          ></textarea>
          <div className={styles.errorMsg}>{errorContent}</div>
        </div>
        <div className={styles.addressArea}>
          <p>주소</p>
          <div className={styles.postNum}>
            <input placeholder="01234" />
            <button>우편번호 검색</button>
          </div>
          <div className={styles.address}>
            <input placeholder="주소를 입력해 주세요." />
          </div>
          <div className={styles.address}>
            <input placeholder="상세주소" />
          </div>
        </div>
        <div className={styles.youtubeArea}>
          <p>유튜브 링크</p>
          <input placeholder="링크를 입력해 주세요." />
        </div>
        <div className={styles.fileArea}>
          <p>사진 첨부</p>
          <div className={styles.addFileArea}>
            {files.map((file, index) => (
              <div className={styles.file} key={index}>
                <Image src={file} alt={`upload-${index}`} width={0} height={0} sizes="100vw" />
              </div>
            ))}
            <label htmlFor="input-file">
              <div className={styles.file}>
                <div className={styles.noImage}>
                  <p>+</p>
                  <p>클릭해서 사진 업로드</p>
                </div>
                <input
                  type="file"
                  id="input-file"
                  multiple
                  style={{ display: "none" }}
                  onChange={(e) => saveImgFile(e)}
                  accept="image/*"
                />
              </div>
            </label>
          </div>
        </div>
        <div className={styles.btnArea}>
          <button>취소</button>
          <button
            onClick={onClickSignup}
            disabled={!props.isEdit && disabledBtn}
            className={!props.isEdit && disabledBtn ? `${styles.unActiveBtn} ${styles.disabled}` : styles.unActiveBtn}
            // style={{
            //   backgroundColor: isActive ? "#2974e5" : "#c7c7c7",
            //   cursor: isActive ? "pointer" : "default",
            // }}
          >
            {props.isEdit ? "수정" : "등록"}하기
          </button>
        </div>
      </div>
    </div>
  );
}
