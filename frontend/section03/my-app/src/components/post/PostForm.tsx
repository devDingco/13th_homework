import React, { useEffect, useState } from "react";

import InputFormText from "./InputFormText";
import InputFormAddr from "./InputFormAddr";
import InputFormPhoto from "./InputFormPhoto";
import Button from "./InputFromButton";

export interface InputValue {
  author: string;
  password: string;
  title: string;
  content: string;
  [key: string]: string;
}

const PostForm = () => {
  const [inputValue, setInputValue] = useState<InputValue>({
    author: "",
    password: "",
    title: "",
    content: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const onChangeInputValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };
  useEffect(() => {
    inputValue.author &&
    inputValue.password &&
    inputValue.title &&
    inputValue.content
      ? setIsButtonDisabled(false)
      : setIsButtonDisabled(true);
  }, [inputValue]);
  console.log(isButtonDisabled);
  return (
    <>
      <div className="input-area">
        <div className="id-pw-area">
          <InputFormText title={"author"} onChange={onChangeInputValue} />
          <InputFormText title={"password"} onChange={onChangeInputValue} />
        </div>
        <InputFormText title={"title"} onChange={onChangeInputValue} />

        <InputFormText title={"content"} onChange={onChangeInputValue} />

        <InputFormText title={"youtube"} onChange={onChangeInputValue} />
        {/* <InputFormPhoto title={"photo"} /> */}
      </div>
      <div className="button-area">
        <Button value={"cancel"} />
        <Button value={"register"} disabled={isButtonDisabled} />
      </div>
    </>
  );
};

export default PostForm;
