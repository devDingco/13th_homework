"use client";

import React, { useEffect, useState } from "react";

import { IInputValue } from "../../_models/new-inputValue";

import NewFormText from "./NewFormText";
import NewFormAddress from "./NewFormAddress";
import NewFormPhoto from "./NewFormPhoto";
import NewFormButton from "./NewFormButton";

export default function NewForm() {
  const [inputValue, setInputValue] = useState<IInputValue>({
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

  return (
    <>
      <div className="input-area">
        <div className="id-pw-area">
          <NewFormText title={"author"} onChange={onChangeInputValue} />
          <NewFormText title={"password"} onChange={onChangeInputValue} />
        </div>
        <NewFormText title={"title"} onChange={onChangeInputValue} />

        <NewFormText title={"content"} onChange={onChangeInputValue} />

        <NewFormText title={"youtube"} onChange={onChangeInputValue} />
        <NewFormPhoto title={"photo"} />
      </div>
      <div className="button-area">
        <NewFormButton value={"cancel"} />
        <NewFormButton value={"register"} disabled={isButtonDisabled} />
      </div>
    </>
  );
}
