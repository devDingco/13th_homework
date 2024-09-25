import React, { useEffect, useState } from "react";
import InputForm from "./InputForm";
import InputFormText from "./InputFormText";
import InputFormAddr from "./InputFormAddr";
import InputFormPhoto from "./InputFormPhoto";
import Button from "./InputFromButton";

const PostForm = () => {
  const [inputValue, setInputValue] = useState({
    author: "",
    password: "",
    title: "",
    content: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const onChangeInputValue = (event) => {
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
    console.log(isButtonDisabled);
  }, [inputValue]);

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
        <InputFormPhoto title={"photo"} />
      </div>
      <div className="button-area">
        <Button value={"cancel"} />
        <Button value={"register"} disabled={isButtonDisabled} />
      </div>
    </>
  );
};

export default PostForm;
