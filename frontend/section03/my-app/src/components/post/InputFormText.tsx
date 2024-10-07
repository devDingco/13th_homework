import { useState } from "react";
import InputFormTitle from "./InputFormTitle";
import ValidationMessage from "./ValidationMessage";
import { InputFormTextProps } from "../../models/InputFormText";

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

export default function InputFormText({ title, onChange }: InputFormTextProps) {
  // console.log("🥲", onChange);

  // const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // const onChangeInputValue = (event) => {
  //   // console.log(typeof event.target.id);
  //   setInputValue((prev) => ({
  //     ...prev,
  //     [event.target.id]: event.target.value,
  //   }));
  // };
  // console.log(inputValue.author);
  // console.log(inputValue.password);

  return (
    <div className="content-area">
      <InputFormTitle title={title} />
      {title !== "content" ? (
        <input
          id={title}
          className="input-text"
          type={title === "password" ? "password" : "text"}
          placeholder={placeholderObj.title}
          onChange={(e) => onChange(e)}
        />
      ) : (
        <textarea
          id={title}
          className="input-textarea"
          placeholder={placeholderObj.title}
          onChange={(e) => onChange(e)}
        ></textarea>
      )}
      {/* {inputValue[title] === "" && <ValidationMessage />} */}
    </div>
  );
}
