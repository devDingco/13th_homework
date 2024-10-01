"use client";

import { useMutation, gql } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import styles from "./styles.module.css";
import close from "../../../../public/icons/close.svg";
import {
  addressSearchButton,
  postCancelButton,
  postSubmitButton,
  addImageButton,
} from "../../../components/button/button";

const CREATE_BROAD = gql`
  mutation createBoard($writer: String, $password: String, $title: String!, $contents: String!) {
    createBoard(createBoardInput: { writer: $writer, password: $password, title: $title, contents: $contents }) {
      _id
      writer
      title
      contents
      likeCount
      dislikeCount
    }
  }
`;

const BoardsNew = () => {
  const router = useRouter();

  const [signup] = useMutation(CREATE_BROAD);

  const [isVaild, setIsVaild] = useState(false);
  const [buttonActiveStyle, setButtonActiveStyle] = useState(false);

  // 이벤트 받아올 변수
  const [owner, setOwner] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 경고 메시지 변수
  const [ownerVaild, setOwnerVaild] = useState("");
  const [passwordVaild, setPasswordVaild] = useState("");
  const [titleVaild, setTitleVaild] = useState("");
  const [contentVaild, setContentVaild] = useState("");

  const onChangeOwner = (event: ChangeEvent<HTMLInputElement>) => {
    setOwner(event.target.value);

    if (event.target.value && password && title && content) {
      setIsVaild(true);
      setButtonActiveStyle(true);
    } else {
      setButtonActiveStyle(false);
      setOwnerVaild("필수입력 사항입니다.");
      setIsVaild(false);
    }
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);

    if (owner && event.target.value && title && content) {
      setIsVaild(true);
      setButtonActiveStyle(true);
    } else {
      setButtonActiveStyle(false);
      setPasswordVaild("필수입력 사항입니다.");
      setIsVaild(false);
    }
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (owner && password && event.target.value && content) {
      setIsVaild(true);
      setButtonActiveStyle(true);
    } else {
      setButtonActiveStyle(false);
      setTitleVaild("필수입력 사항입니다.");
      setIsVaild(false);
    }
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);

    if (owner && password && title && event.target.value) {
      setIsVaild(true);
      setButtonActiveStyle(true);
    } else {
      setButtonActiveStyle(false);
      setContentVaild("필수입력 사항입니다.");
      setIsVaild(false);
    }
  };

  const onClickPostVaildation = async () => {
    try {
      if (isVaild && owner && password && title && content) {
        const result = await signup({
          variables: {
            writer: owner,
            password: password,
            title: title,
            contents: content,
          },
        });

        console.log(result);
        alert("게시글 등록이 완료 되었습니다.");

        router.push(`/boards/${result.data.createBoard._id}`);
      }
    } catch (error) {
      console.log(error);
      alert(`에러가 발생했습니다. 다시 시도하여 주세요. \n error: ${error}`);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.menu}>
        <p>게시글 등록하기</p>
        <Image src={close} alt="" width="0" height="0" />
      </div>
      <div className={styles.container}>
        {/* 작성자, 비번 */}
        <div className={styles.title}>
          <div className={styles.input}>
            <div className={styles.labelTitle}>
              <p className={styles.label}>작성자</p>
              <p className={styles.star}>*</p>
            </div>
            <input
              id="postOwner"
              className={styles.info}
              type="text"
              placeholder="작성자 명을 입력해 주세요."
              onChange={onChangeOwner}
            />
            <p
              id="postOwnerVaild"
              className={styles.vaildation}
              style={{
                display: !owner ? "block" : "none",
                color: "var(--red, #F66A6A)",
                fontSize: "1.6rem",
                fontWeight: "500",
                lineHeight: "2.4rem",
              }}
            >
              {ownerVaild}
            </p>
          </div>
          <div className={styles.input}>
            <div className={styles.labelTitle}>
              <p className={styles.label}>비밀번호</p>
              <p className={styles.star}>*</p>
            </div>
            <input
              id="postPassword"
              className={styles.info}
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              onChange={onChangePassword}
            />
            <p
              id="postPasswordVaild"
              className={styles.vaildation}
              style={{
                display: !password ? "block" : "none",
                color: "var(--red, #F66A6A)",
                fontSize: "1.6rem",
                fontWeight: "500",
                lineHeight: "2.4rem",
              }}
            >
              {passwordVaild}
            </p>
          </div>
        </div>
        <hr className={styles.line} />
        {/* 제목 */}

        <div className={styles.input}>
          <div className={styles.labelTitle}>
            <p className={styles.label}>제목</p>
            <p className={styles.star}>*</p>
          </div>
          <input
            id="postTitle"
            className={styles.info}
            type="text"
            placeholder="제목을 입력해 주세요."
            onChange={onChangeTitle}
          />
          <p
            id="postTitleVaild"
            className={styles.vaildation}
            style={{
              display: !title ? "block" : "none",
              color: "var(--red, #F66A6A)",
              fontSize: "1.6rem",
              fontWeight: "500",
              lineHeight: "2.4rem",
            }}
          >
            {titleVaild}
          </p>
        </div>
        <hr className={styles.line} />
        {/* 내용 */}
        <div className={styles.input}>
          <div className={styles.labelTitle}>
            <p className={styles.label}>내용</p>
            <p className={styles.star}>*</p>
          </div>
          <textarea
            id="postContent"
            className={styles.infoContent}
            placeholder="내용을 입력해 주세요."
            onChange={onChangeContent}
          ></textarea>
          <p
            id="postContentVaild"
            className={styles.vaildation}
            style={{
              display: !content ? "block" : "none",
              color: "var(--red, #F66A6A)",
              fontSize: "1.6rem",
              fontWeight: "500",
              lineHeight: "2.4rem",
            }}
          >
            {contentVaild}
          </p>
        </div>
        {/* 주소 */}
        <div className={`${styles.input} ${styles.address}`}>
          <p className={styles.label}>주소</p>
          <div className={styles.addressMail}>
            <input className={styles.infoAddress} type="text" placeholder="01234" />
            {addressSearchButton()}
          </div>
          <input className={styles.info} type="text" placeholder="주소를 입력해 주세요." />
          <input className={styles.info} type="text" placeholder="상세주소" />
        </div>
        <hr className={styles.line} />
        {/* 유튜브 링크 */}
        <div className={styles.input}>
          <p className={styles.label}>유튜브 링크</p>
          <input className={styles.info} type="text" placeholder="링크를 입력해 주세요." />
        </div>
        <hr className={styles.line} />
        {/* 사진 첨부 */}
        <div className={styles.postUploadeImg}>
          <p className={styles.label}>사진 첨부</p>
          <div className={styles.postUploadImage}>
            {addImageButton()}
            {addImageButton()}
            {addImageButton()}
          </div>
        </div>
        <div className={styles.postButtonGroup}>
          {postCancelButton()}
          {postSubmitButton({ onClick: onClickPostVaildation }, buttonActiveStyle)}
        </div>
      </div>
    </div>
  );
};

export default BoardsNew;
