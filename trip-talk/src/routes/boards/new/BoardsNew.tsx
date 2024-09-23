import React, { useState } from "react";
import Button from "../../../components/Button/Button";
import ImageUploader from "../../../components/ImageUploader/ImageUploader";
import Input from "../../../components/input/Input";
import styles from "./Boards.module.css";

export default function BoardsNew() {
  const [authorName, setAuthorName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case "authorName":
        setAuthorName(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "title":
        setTitle(event.target.value);
        break;
    }
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const handleSubmit = () => {
    alert("등록!");
  };

  if (authorName && password && title && content) {
    document.getElementById("")
    alert("게시글 등록이 가능한 상태입니다!");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={styles.author_info_wrapper}>
          <div>
            <Input
              isLabel={true}
              id="authorName"
              type="text"
              placeholder="작성자 명을 입력해 주세요."
              isRequired={true}
              children="작성자"
              onChange={handleInputChange}
            />
            {!authorName && (
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
          {!content && (
            <div className={styles.required_field}>필수입력 사항 입니다.</div>
          )}
        </div>
        <div className={styles.address_wrapper}>
          <div>
            <Input
              isLabel={true}
              type="number"
              placeholder="01234"
              isRequired={false}
              children="주소"
            />
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
            disabled={!(authorName && password && title && content)}
            color={!(authorName && password && title && content) ? "gray" : "blue"}
          >
            등록하기
          </Button>
        </div>
      </form>
    </>
  );
}
