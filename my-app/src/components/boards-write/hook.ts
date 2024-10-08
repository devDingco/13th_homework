import { useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { CREATE_BOARD, UPDATE_BOARD } from "./queries";
import React from "react";

// import React from "react"; 이부분 작성안해도 잘 돌아감. 근데 이거 안해주면 ts(2686)에러가 8개 나와서 그거땜에 넣어줌
export const useBoardsWrite = () => {
  const router = useRouter();
  const params = useParams();

  // 작성자인풋, 작성자인풋에러
  const [name, setName] = React.useState("");
  const [nameError, setNameError] = React.useState("");
  // 비번인풋, 비번인풋에러
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  // 제목인풋, 제목인풋에러
  const [title, setTitle] = React.useState("");
  const [titleError, setTitleError] = React.useState("");
  // 내용인풋, 내용인풋에러
  const [content, setContent] = React.useState("");
  const [contentError, setContentError] = React.useState("");

  // 상황에 따른 버튼 활성화 or 비활성화
  const [isActive, setIsActive] = useState(false);

  // 그냥 esLint에러 보기싫어서 만든 줄
  console.log(nameError, passwordError, titleError, contentError, isActive);

  // 인풋값이 바뀐다면 저장하는 곳
  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);

    if (
      event.target.value !== "" &&
      password !== "" &&
      title !== "" &&
      content !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);

    if (
      name !== "" &&
      event.target.value !== "" &&
      title !== "" &&
      content !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (
      name !== "" &&
      password !== "" &&
      event.target.value !== "" &&
      content !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);

    if (
      name !== "" &&
      password !== "" &&
      title !== "" &&
      event.target.value !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const [나의함수] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);

  //
  //
  //
  //
  //

  const onCLickUpdate = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const inputPassword = prompt(
      "글을 작성할 때 입력하셨던 비밀번호를 입력해주세요"
    );

    if (!inputPassword) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    const myvariables = {
      boardId: params.boardId, // 수정할 게시물의 ID
      title: title || undefined, // 수정할 제목
      contents: content || undefined, // 수정할 내용
      password: inputPassword, // 입력받은 비밀번호
    };

    try {
      const result = await updateBoard({
        variables: myvariables,
      });

      if (result.data) {
        alert("게시물 수정 완료됨");
        router.push(`/boards/${result.data.updateBoard._id}`);
      }
      // 밑에 있는 error이 es린트때문에 줄생겨서 밑에 주석으로 지운상태
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("비밀번호가 맞지 않습니다.");
    }
  };

  //
  //
  //
  //
  //

  const onClickSignup = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    console.log("작성자 이름은:", name);
    console.log("작성자 비번은:", password);
    console.log("게시물 제목은:", title);
    console.log("게시물 내용은:", content);

    // 유효성을 우선 true로 박아두고 문제가 1개라도 생긴다면 즉시 false로 바뀌므로
    // 마지막에 alert로 알리는 것을 못함.

    let isValid = true;

    // 작성자 확인
    if (name === "") {
      setNameError("필수입력 사항 입니다.");
      isValid = false;
    } else {
      setNameError("");
    }

    // 비밀번호 확인
    if (password === "") {
      setPasswordError("필수입력 사항 입니다.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // 제목 확인
    if (title === "") {
      setTitleError("필수입력 사항 입니다.");
      isValid = false;
    } else {
      setTitleError("");
    }

    // 내용 확인
    if (content === "") {
      setContentError("필수입력 사항 입니다.");
      isValid = false;
    } else {
      setContentError("");
    }

    // 제출 전 모든 부분이 만족해서 true인지 확인하고 alert을 띄울지 정하는 곳

    try {
      if (isValid) {
        alert("게시물 등록 완료됨");

        const result = await 나의함수({
          variables: {
            writer: name,
            password: password,
            title: title,
            contents: content,
          },
        });
        console.log(result);
        router.push(`/boards/${result.data.createBoard._id}`);
      } else {
        alert("다시 작성해주세요");
      }
    } catch (error) {
      alert(error);
    }
  };
  // console.log(props.data?.fetchBoard.contents);
  return {
    onChangeName,
    onChangePassword,
    onChangeTitle,
    onChangeContent,
    onCLickUpdate,
    onClickSignup,
  };
};
