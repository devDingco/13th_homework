"use client";

import React, { useEffect, useState } from "react";

import NewFormText from "./NewFormText";
import NewFormPhoto from "./NewFormPhoto";
import NewFormButton from "./NewFormButton";
import { useMutation } from "@apollo/client";
import { CREATE_BOARD } from "../../queries";
import { useRouter } from "next/navigation";

export default function NewForm() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<IInputValue>({
    author: "",
    password: "",
    title: "",
    content: "",
  });
  // const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [createBoard] = useMutation(CREATE_BOARD);
  const onChangeInputValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const disabled: boolean =
    inputValue.author &&
    inputValue.password &&
    inputValue.title &&
    inputValue.content
      ? false
      : true;

  // useEffect(() => {
  //   inputValue.author &&
  //   inputValue.password &&
  //   inputValue.title &&
  //   inputValue.content
  //     ? setIsButtonDisabled(false)
  //     : setIsButtonDisabled(true);
  // }, [inputValue]);

  const onClickSubmit = async () => {
    try {
      console.log("GraphQL 쿼리 실행");
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
      console.log("등록성공:", result.data);
      router.push(`/boards/${result.data.createBoard._id}`);
    } catch (error) {
      console.error("GraphQL 요청 오류:", error);
    }
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
          disabled={disabled}
          onClick={onClickSubmit}
        />
      </div>
    </>
  );
}
