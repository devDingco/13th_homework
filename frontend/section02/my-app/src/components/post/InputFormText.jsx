import { useState } from "react";
import InputFormTitle from "./InputFormTitle";
import ValidationMessage from "./ValidationMessage";

const placeholderObj = {
  author: "작성자 명을 입력해 주세요.",
  password: "비밀번호를 입력해 주세요.",
  title: "제목을 입력해 주세요.",
  content: "내용을 입력해 주세요.",
  address: {
    num: "01234",
    addr: "주소를 입력해 주세요.",
    detail: "상세주소",
  },
  youtube: "링크를 입력해 주세요.",
};
const [inputValud, setInputValue] = useState({
  author: "",
  password: "",
  title: "",
  content: "",
});

export default function InputFormText({ title }) {
  console.log(title);
  const onChangeInputValue = (e) => {};
  return (
    <div className="content-area">
      <InputFormTitle title={title} />
      <input
        id={title}
        className="input-text"
        type={title === "password" ? "password" : "text"}
        placeholder={placeholderObj[title]}
        onChange={onChangeInputValue}
        // value={props.author}
      />
      {/* {isError && <ValidationMessage />} */}
    </div>
  );
}
