import React from "react";
import "./post-editor.css";
import {
  InputForm,
  EditorHeader,
  EditButton,
  Divider,
} from "./post-editor-input.js";

const PostEditor = (props) => {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onChangeName = (event) => {
    console.log(name);
    setName(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onClickSignup = (event) => {
    console.log(name);
    console.log(password);
  };

  return (
    <div className="editor-page">
      <EditorHeader title="게시물 등록" />
      <div className="id-pw-area">
        <InputForm
          as="text"
          title="작성자"
          required={true}
          placeholder="작성자 명을 입력해 주세요."
          실행할함수="onChangeName"
        />
        <InputForm as="text" title="비밀번호" required={true} />
      </div>
      <Divider />
      <InputForm as="text" title="제목" required={true} />
      <Divider />

      <InputForm as="textarea" title="내용" required={true} />
      <InputForm as="text" title="주소" />
      <Divider />

      <InputForm as="text" title="유튜브링크" />
      <Divider />
      <InputForm as="photo" title="사진첨부" />
      <div className="button-area">
        <EditButton reg={true} value="취소" />
        <EditButton value="등록하기" />
      </div>
    </div>
  );
};

export default PostEditor;
