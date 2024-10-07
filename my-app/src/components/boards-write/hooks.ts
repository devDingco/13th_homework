import { useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import type { IBoardsWriteProps, IupdateVariables, IInput } from "./types";
import {
  CreateBoardDocument,
  UpdateBoardDocument,
} from "@/commons/gql/graphql";

export const useBoardsWrite = (props: IBoardsWriteProps) => {
  const params = useParams();
  const router = useRouter();
  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);

  const [errorMessage, setErrorMessage] = useState<IInput>({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });

  const [validation, setValidation] = useState<IInput>({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });

  const [isActive, setIsActive] = useState<boolean>(false);

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedValidation = {
      ...validation,
      [event.target.name]: event.target.value,
    };

    const isAllFilled = props.isEdit
      ? updatedValidation.title !== "" && updatedValidation.contents !== ""
      : Object.values(updatedValidation).every((value) => value !== "");

    setValidation(updatedValidation);
    setIsActive(isAllFilled);
  };

  const onClickSubmit = async () => {
    try {
      const errors: IInput = {
        writer: "",
        password: "",
        title: "",
        contents: "",
      };

      // 빈 값 검증
      if (!validation.writer) errors.writer = "필수 입력 사항입니다.";
      if (!validation.password) errors.password = "필수 입력 사항입니다.";
      if (!validation.title) errors.title = "필수 입력 사항입니다.";
      if (!validation.contents) errors.contents = "필수 입력 사항입니다.";

      setErrorMessage(errors);

      if (
        validation.writer &&
        validation.password &&
        validation.title &&
        validation.contents
      ) {
        alert("게시글 등록이 가능한 상태입니다!");
        const result = await createBoard({
          variables: {
            createBoardInput: {
              ...validation,
            },
          },
        });
        console.log(result, "등록결과");
        router.push(`/boards/${result.data?.createBoard._id}`);
      }
    } catch (error) {
      console.error("에러가 발생하였습니다. 다시 시도해 주세요.", error);
    }
  };

  const onClickEdit = async () => {
    try {
      const checkPassWord = prompt(
        "글을 작성할때 입력하셨던 비밀번호를 입력해주세요"
      );

      const errors: IInput = {
        writer: "",
        password: "",
        title: "",
        contents: "",
      };

      // 빈 값 검증
      if (!validation.writer) errors.writer = "필수 입력 사항입니다.";
      if (!validation.password) errors.password = "필수 입력 사항입니다.";
      if (!validation.title) errors.title = "필수 입력 사항입니다.";
      if (!validation.contents) errors.contents = "필수 입력 사항입니다.";

      setErrorMessage(errors);

      if (checkPassWord && validation.title && validation.contents) {
        const updateVariables: IupdateVariables = {};
        if (validation.title) updateVariables.title = validation.title;
        if (validation.contents) updateVariables.contents = validation.contents;
        const result = await updateBoard({
          variables: {
            updateBoardInput: {
              ...updateVariables,
            },
            password: checkPassWord,
            boardId: String(params.boardId),
          },
        });
        console.log(result, "수정결과");
        router.push(`/boards/${params.boardId}`);
      }
    } catch (error: any) {
      alert(error.graphQLErrors[0].message);
    }
  };
  return {
    onChange,
    onClickSubmit,
    onClickEdit,
    isActive,
    errorMessage,
  };
};
