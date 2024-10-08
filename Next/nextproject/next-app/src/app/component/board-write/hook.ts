import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { FetchBoard, register, UPDATE_BOARD } from "./queries";
import { IProps } from "./types";

export const UseBoardsWrite = (props: IProps) => {
  const [name, setName] = useState(props.data?.fetchBoard.writer || "");

  const [password, setPassword] = useState(
    props.data?.fetchBoard.password || ""
  );

  const [title, setTitle] = useState(props.data?.fetchBoard.title || "");

  const [contents, setContents] = useState(
    props.data?.fetchBoard.contents || ""
  );

  const [nameblank, setNameBlank] = useState("");

  const [passwordblank, setPasswordBlank] = useState("");

  const [titleblank, setTitleBlank] = useState("");

  const [contentblank, setContentBlank] = useState("");

  const [isActive, setIsActive] = useState(false);

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (
      event.target.value !== "" &&
      title !== "" &&
      contents !== "" &&
      password !== ""
    ) {
      return setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (
      name !== "" &&
      title !== "" &&
      contents !== "" &&
      event.target.value !== ""
    ) {
      return setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (
      name !== "" &&
      event.target.value !== "" &&
      contents !== "" &&
      password !== ""
    ) {
      return setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeContent = (event: ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
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
  const router = useRouter();
  const params = useParams(); //라우터 사용 시 파라미터 정보를 가져오기 위한 설정
  const { data } = useQuery(FetchBoard, {
    variables: {
      myboardId: params.boardId,
    },
  });

  const [myfunction] = useMutation(register);
  const [updateBoard] = useMutation(UPDATE_BOARD);
  const isButtonDisabled = !name || !password || !title || !contents;
  const checkValid = () => {
    if (name === "") {
      setNameBlank("필수입력 사항입니다.");
    } else {
      setNameBlank("");
    }
    if (password === "") {
      setPasswordBlank("필수입력 사항입니다.");
    } else {
      setPasswordBlank("");
    }
    if (title === "") {
      setTitleBlank("필수입력 사항입니다.");
    } else {
      setTitleBlank("");
    }
    if (contents === "") {
      setContentBlank("필수입력 사항입니다.");
    } else {
      setContentBlank("");
    }
  };
  const onClickSignup = async () => {
    await checkValid;
    try {
      if (name !== "" && title !== "" && contents !== "" && password !== "") {
        const result = await myfunction({
          variables: {
            createBoardInput: {
              writer: name,
              password: password,
              title: title,
              contents: contents,
            },
          },
        });

        alert("게시글 등록 완료");
        console.log(result.data.createBoard._id);
        router.push("../../../boards");
      }
    } catch {
      alert("에러가 발생하였습니다. 다시 시도해 주세요.");
    }
  };

  const onClickUpdate = async () => {
    const password = prompt("글을 입력할때 입력하셨던 비밀번호를 입력해주세요");
    try {
      const result = await updateBoard({
        variables: {
          boardId: params.boardId,
          password: password,
          updateBoardInput: { title, contents },
        },
      });
      console.log(result);
      alert("수정완료");
      router.push(`../../boards/${result.data.updateBoard._id}`);
    } catch {
      alert("비밀번호 오류");
    }
  };

  return {
    onChangeContent,
    onChangeName,
    onChangePassword,
    onChangeTitle,
    onClickSignup,
    onClickUpdate,
    nameblank,
    passwordblank,
    titleblank,
    contentblank,
    name,
    title,
    contents,
    password,
    isActive,
    isButtonDisabled,
    data,
  };
};
