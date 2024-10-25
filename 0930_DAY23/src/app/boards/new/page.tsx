"use client";
import React, { ChangeEvent, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/navigation";

import addImage from "@assets/add_image.png";
import { MouseEvent } from "react";

// 서버에 보낼 GraphQL 쿼리를 작성합니다.
// 게시물을 생성하기 위한 정보를 서버에 보내는 구조입니다.
const 나의그래프큐엘셋팅 = gql`
  mutation createBoard(
    $writer: String
    $password: String
    $title: String!
    $contents: String!
    $youtubeUrl: String
    $images: [String!]
    $boardAddress: BoardAddressInput
  ) {
    createBoard(
      createBoardInput: {
        writer: $writer
        password: $password
        title: $title
        contents: $contents
        youtubeUrl: $youtubeUrl
        images: $images
        boardAddress: $boardAddress
      }
    ) {
      _id
    }
  }
`;

// 게시물 작성 페이지를 나타내는 함수입니다.
export default function BoardsNewPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  // const isButtonDisabled = !name || !password || !title || !content;  

  const [submit] = useMutation(나의그래프큐엘셋팅);

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    console.log(event.target.value)
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const onClickSignup = async (event: MouseEvent<HTMLButtonElement>) => {
    let hasError = false;

    if (name === "") {

      setNameError("필수입력 사항입니다.");
      hasError = true;
    } else {
      setNameError("");
    }

    if (password === "") {

      setPasswordError("필수입력 사항입니다.");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (title === "") {
      setTitleError("필수입력 사항입니다.");
      hasError = true;
    } else {
      setTitleError("");
    }

    if (content === "") {
      setContentError("필수입력 사항입니다.");
      hasError = true;
    } else {
      setContentError("");
    }
    console.log(hasError)
    if (!hasError) {
      console.log(!hasError)
      try {
        console.log(hasError)
        console.log("try");
        const result = await submit({
          variables: {
            writer: name,
            password: password,
            title: title,
            contents: content,
            youtubeUrl: "",
            boardAddress: {
              zipcode: "",
              address: "",
              addressDetail: "",
            },
            images: ["", ""],
          },
        });

        console.log(result);
        // console.log({ data }.data.createBoard.boardId);
        // console.log("id확인::::::", data?.createBoard._id);
        alert("게시글이 등록되었습니다!");

        router.push(`/boards/${result.data.createBoard._id}`);
      } catch (err) {
        console.error(err);
        alert("에러가 발생하였습니다. 다시 시도해 주세요.");
      } finally {
      }
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles["enroll-subject"]}>
        <div className={styles["enroll-subject-text"]}>게시물 등록</div>
      </div>
      <div className={styles["enroll-row-container"]}>
        <div className={styles["enroll-row-section"]}>
          <div className={styles["enroll-row-flex"]}>
            <div className={styles["flex-half"]}>
              <div className={styles["enroll-form-title"]}>
                <div>작성자 </div>
                <div className={styles["enroll-required-indicator"]}> *</div>
              </div>
              <input
                type="text"
                value={name}
                placeholder="작성자 명을 입력해 주세요."
                className={styles["enroll-input"]}
                onChange={onChangeName}
              />
              <div className={styles["error-msg"]}>{name ? "" : "필수 입력 사항입니다."}</div>
            </div>
            <div className={styles["flex-half"]}>
              <div className={styles["enroll-form-title"]}>
                <div>비밀번호</div>
                <div className={styles["enroll-required-indicator"]}> *</div>
              </div>
              <input
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                className={styles["enroll-input"]}
                onChange={onChangePassword}
              />
              <div className={styles["error-msg"]}>{password ? "" : "필수 입력 사항입니다."}</div>
            </div>
          </div>
        </div>

        <div className={styles["enroll-border"]}></div>

        <div className={styles["enroll-row-section"]}>
          <div className={styles["enroll-form-title"]}>
            <div>제목</div>
            <div className={styles["enroll-required-indicator"]}> *</div>
          </div>
          <input
            type="text"
            className={styles["enroll-input"]}
            placeholder="제목을 입력해 주세요."
            onChange={onChangeTitle}
          />
          <div className={styles["error-msg"]}>{title ? "" : "필수 입력 사항입니다."}</div>
        </div>
        <div className={styles["enroll-border"]}></div>
        <div className={styles["enroll-row-section"]}>
          <div className={styles["enroll-form-title"]}>
            <div>내용</div>
            <div className={styles["enroll-required-indicator"]}> *</div>
          </div>
          <textarea
            placeholder="내용을 입력해 주세요."
            className={`${styles["enroll-input"]} ${styles["enroll-textarea"]}`}
            onChange={onChangeContent}
          ></textarea>
          <div className={styles["error-msg"]}>{content ? "" : "필수 입력 사항입니다."}</div>
        </div>
        <div className={styles["enroll-row-section"]}>
          <div className={styles["enroll-form-title"]}>
            <div>주소</div>
          </div>
          <div className={styles["enroll-address-firstrow"]}>
            <input
              type="number"
              className={styles["zipcode-input"]}
              placeholder="12345"
            />
            <button className={styles["zipcode-search-button"]}>
              우편번호 검색
            </button>
          </div>

          <input
            placeholder="주소를 입력해주세요."
            className={styles["enroll-input"]}
            type="text"
          />
          <input
            placeholder="상세주소"
            className={styles["enroll-input"]}
            type="text"
          />
        </div>
        <div className={styles["enroll-border"]}></div>
        <div className={styles["enroll-row-section"]}>
          <div className={styles["enroll-form-title"]}>
            <div>유튜브 링크</div>
          </div>
          <input
            className={styles["enroll-input"]}
            placeholder="링크를 입력해 주세요."
          />
        </div>

        <div className={styles["enroll-border"]}></div>

        <div className={styles["enroll-row-section"]}>
          <div>사진 첨부</div>
          <div className={styles["picture-enroll-row"]}>
            <Image src={addImage} alt="이미지추가" />
            <Image src={addImage} alt="이미지추가" />
            <Image src={addImage} alt="이미지추가" />
          </div>
        </div>
      </div>
      <div className={styles["enroll-button-container"]}>
        <button className={styles["enroll-cancel-button"]}>취소</button>
        <button
          // className={
          //   isButtonDisabled
          //     ? `${styles["enroll-submit-button"]} ${styles["disabled"]}`
          //     : styles["enroll-submit-button"]
          // }
          onClick={onClickSignup}
          // disabled={isButtonDisabled}
        >
          등록하기
        </button>
      </div>
    </div>
  );
}

// playground 전송해보기
/*
mutation {
  createBoard(createBoardInput: {
    writer: "John Doe",
    password: "securepassword",
    title: "My First Board",
    contents: "This is the content of my first board.",
    youtubeUrl: "https://youtube.com/example",
    boardAddress: {
      zipcode: "12345",
      address: "Seoul, Gangnam-gu",
      addressDetail: "Test Detailed Address"
    },
    images: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg"
    ]
  }) {
    _id
    writer
    title
    contents
    youtubeUrl
    likeCount
    images
    boardAddress {
      zipcode
      address
      addressDetail
    }
    createdAt
    updatedAt
    deletedAt
  }
}
  */

