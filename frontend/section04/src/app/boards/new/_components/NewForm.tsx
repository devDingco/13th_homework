"use client";

import React, { useEffect, useState } from "react";

import NewFormText from "./NewFormText";
import NewFormPhoto from "./NewFormPhoto";
import NewFormButton from "./NewFormButton";
import { gql, useMutation } from "@apollo/client";

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      writer
      title
      contents
    }
  }
`;
export default function NewForm() {
  const [inputValue, setInputValue] = useState<IInputValue>({
    author: "",
    password: "",
    title: "",
    content: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [createBoard] = useMutation(CREATE_BOARD);
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

  const onClickSubmit = async () => {
    console.log("gkgk");
    const result = await createBoard({
      variables: {
        createBoardInput: {
          writer: inputValue.author,
          title: inputValue.title,
          password: inputValue.password,
          contents: inputValue.content,
        },
      },
    });
  };

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
        <NewFormButton
          value={"register"}
          disabled={isButtonDisabled}
          onClick={onClickSubmit}
        />
      </div>
    </>
  );
}
