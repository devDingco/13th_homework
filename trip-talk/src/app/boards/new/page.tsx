"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import Button from "../../components/Button/Button";
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import Input from "../../components/Input/Input";
import styles from "./styles.module.css";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

export default function BoardsNew() {
  const router = useRouter();
  const [writer, setWriter] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");

  const [createBoard] = useMutation(CREATE_BOARD);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case "writer":
        setWriter(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "title":
        setTitle(event.target.value);
        break;
    }
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer,
            password,
            title,
            contents,
          },
        },
      });
      const boardId = result.data.createBoard._id;
      router.push(`/routes/boards/${boardId}`);
    } catch (error) {
      console.error(error);
      alert("An error has occurred. Please try again.");
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.author_info_wrapper}>
          <div>
            <Input
              isLabel={true}
              id="writer"
              type="text"
              placeholder="작성자 명을 입력해 주세요."
              isRequired={true}
              children="작성자"
              onChange={handleInputChange}
            />
            {!writer && (
              <div className={styles.required_field}>필수입력 사항 입니다.</div>
            )}
          </div>
          <div>
            <Input
              isLabel={true}
              id="password"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              isRequired={true}
              children="비밀번호"
              onChange={handleInputChange}
            />
            {!password && (
              <div className={styles.required_field}>필수입력 사항 입니다.</div>
            )}
          </div>
        </div>
        <div className={styles.title_wrapper}>
          <Input
            isLabel={true}
            id="title"
            type="text"
            placeholder="제목을 입력해 주세요."
            isRequired={true}
            children="제목"
            onChange={handleInputChange}
          />
          {!title && (
            <div className={styles.required_field}>필수입력 사항 입니다.</div>
          )}
        </div>
        <div className={styles.content_wrapper}>
          <div>
            <p>내용</p>
            <b>*</b>
          </div>
          <textarea
            id="content"
            placeholder="내용을 입력해 주세요."
            onChange={handleContentChange}
          />
          {!contents && (
            <div className={styles.required_field}>필수입력 사항 입니다.</div>
          )}
        </div>
        <div className={styles.address_wrapper}>
          <div>
            <div>
              <Input
                isLabel={true}
                type="number"
                placeholder="01234"
                isRequired={false}
                children="주소"
              />
            </div>
            <Button color="white">우편번호 검색</Button>
          </div>
          <Input
            isLabel={false}
            type="text"
            placeholder="주소를 입력해 주세요."
            isRequired={false}
          />
          <Input
            isLabel={false}
            type="text"
            placeholder="상세주소"
            isRequired={false}
          />
        </div>
        <div className={styles.link_wrapper}>
          <Input
            isLabel={true}
            type="url"
            placeholder="링크를 입력해 주세요."
            isRequired={false}
            children="유튜브 링크"
          />
        </div>
        <div className={styles.photo_wrapper}>
          <p>사진 첨부</p>
          <div>
            <ImageUploader />
            <ImageUploader />
            <ImageUploader />
          </div>
        </div>
        <div className={styles.button_wrapper}>
          <Button color="white">취소</Button>
          <Button
            type="submit"
            disabled={!(writer && password && title && contents)}
            color={!(writer && password && title && contents) ? "gray" : "blue"}
          >
            등록하기
          </Button>
        </div>
      </form>
    </>
  );
}
