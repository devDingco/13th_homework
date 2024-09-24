import React from "react";
import "./post-editor.css";
import {
  InputForm,
  EditorHeader,
  EditButton,
  Divider,
} from "./post-editor-input.js";

const PostEditor = (props) => {
  const [inputs, setInputs] = React.useState({
    author: "",
    password: "",
    title: "",
    content: "",
  });
  const [val, setVal] = React.useState({
    author: "",
    password: "",
    title: "",
    content: "",
  });
  let tmpName, tmpPassword, tmpTitle, tmpContent;

  const placeholder = {
    author: "작성자 명을 입력해 주세요.",
    password: "비밀번호를 입력해 주세요.",
    title: "제목을 입력해 주세요.",
    content: "내용을 입력해 주세요.",
    address: {
      number: "01234",
      addr: "주소를 입력해 주세요.",
      detail: "상세주소",
    },
    youtube: "링크를 입력해 주세요.",
    photo: "클릭해서 사진 업로드",
  };

  const validationMessage = {
    default: "",
    required: "필수입력 사항 입니다.",
  };

  const onChangeName = (event) => {
    console.log(event.target.value);
    setInputs((prev) => ({ ...prev, ["author"]: event.target.value }));

    // tmpPassword = event.target.value;
  };
  const onChangeTitle = (event) => {
    tmpTitle = event.target.value;
  };
  const onChangeContent = (event) => {
    tmpContent = event.target.value;
  };

  const RegPost = (event) => {
    // if (inputs.author === "") {
    //   setVal(validationMessage.required);
    //   return;
    // }
    // if (inputs.password === "") {
    // }
    // if (inputs.title === "") {
    // }
    // if (inputs.content === "") {
    // }
  };

  return (
    <div className="editor-page">
      <EditorHeader title="게시물 등록" />
      <div className="input-area">
        <div className="id-pw-area">
          <InputForm
            as="text"
            title="작성자"
            required={true}
            placeholder={placeholder.author}
            onChange={onChangeName}
            // isError={errorMessage}
          />
          <InputForm
            as="text"
            title="비밀번호"
            required={true}
            placeholder={placeholder.password}
            // onChange={onChangePassword}
            // isError={errorMessage}
          />
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
      </div>
      <div className="button-area">
        <EditButton reg={true} value="취소" />
        <EditButton value="등록하기" onClick={(event) => RegPost(event)} />
      </div>
    </div>
  );
};

export default PostEditor;
