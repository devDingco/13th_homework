'use client'
import React, { useEffect } from "react";
import { useState } from 'react'
import styles from './styles.module.css'
import Image from "next/image";

const BoardsNewPage = () => {
  // state
  const [writer, setWriter] = useState("");
  const [pw, setPw] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<string[]>([]);

  // error state
  const [errorWriter, setErrorWriter] = useState("");
  const [errorPw, setErrorPw] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [errorContent, setErrorContent] = useState("");

  // active state
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (writer !== "" && title !== "" && pw !== "" && content !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [writer, title, pw, content]);

  // onChange
  const onChangeWriter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkWriter = event.target.value;
    setWriter(checkWriter);
  };
  const onChangePw = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPw(event.target.value);
  };
  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const onChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  // onClick
  const onClickSignup = () => {
    // 등록버튼 클릭시 입력창이 비어있는지 안 비어있는지 확인 후 에러메세지
    if (writer === "") {
      setErrorWriter("작성자명을 입력해 주세요!");
    } else if (writer !== "") {
      setErrorWriter("");
    }
    if (pw === "") {
      setErrorPw("비밀번호를 입력해 주세요!");
    } else if (pw !== "") {
      setErrorPw("");
    }
    if (title === "") {
      setErrorTitle("제목을 입력해 주세요!");
    } else if (title !== "") {
      setErrorTitle("");
    }
    if (content === "") {
      setErrorContent("내용을 입력해 주세요!");
    } else if (content !== "") {
      setErrorContent("");
    }
    if (writer !== "" && pw !== "" && title !== "" && content !== "") {
      alert("게시글 등록이 가능한 상태입니다!");
    }
  };

  // 이미지 업로드 시 미리보기 input의 onChange
  const saveImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || []);
    const newFilePreviews: string[] = [];

    if (files.length + uploadedFiles.length > 5) {
      alert("최대 5개의 이미지만 업로드 할 수 있습니다.");
      return; // 경고 후 함수 종료
    }

    uploadedFiles.forEach((file: File) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        newFilePreviews.push(reader.result as string);
        // 모든 파일을 읽은 후 상태를 업데이트
        if (newFilePreviews.length === uploadedFiles.length) {
          setFiles((prevFiles: string[]) => [...prevFiles, ...newFilePreviews]);
        }
      };
    });
  };

  return (
    <div className={styles.allContainer}>
      <div className={styles.container}>
        <div className={styles.title}>게시글 등록</div>
        <div className={styles.writerInfo}>
          <div className={styles.writer}>
            <p>
              작성자<span>*</span>
            </p>
            <input onChange={onChangeWriter} placeholder="작성자 명을 입력해 주세요."></input>
            <div className={styles.errorMsg}>{errorWriter}</div>
          </div>
          <div className={styles.writer}>
            <p>
              비밀번호<span>*</span>
            </p>
            <input onChange={onChangePw} type="password" placeholder="비밀번호를 입력해 주세요."></input>
            <div className={styles.errorMsg}>{errorPw}</div>
          </div>
        </div>
        <div className={styles.titleArea}>
          <p>
            제목<span>*</span>
          </p>
          <input onChange={onChangeTitle} placeholder="제목을 입력해 주세요."></input>
          <div className={styles.errorMsg}>{errorTitle}</div>
        </div>
        <div className={styles.contentArea}>
          <p>
            내용<span>*</span>
          </p>
          <textarea onChange={onChangeContent} placeholder="내용을 입력해 주세요."></textarea>
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
            disabled={isActive ? false : true}
            style={{
              backgroundColor: isActive === true ? "#2974e5" : "#c7c7c7",
              cursor: isActive === true ? "pointer" : "default",
            }}
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardsNewPage;
