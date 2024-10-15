"use client";

import { useMutation } from "@apollo/client";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  CreateBoardDocument,
  UpdateBoardDocument,
  UpdateBoardMutationVariables,
} from "@/commons/graphql/graphql";
import { IBoardsWriteProps } from "./types";
import { GraphQLError } from "graphql";

export const useBoardsWrite = ({ isEdit }: IBoardsWriteProps) => {
  const router = useRouter();
  const params = useParams();
  console.log("Params:", params);

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [isActive, setIsActive] = useState(false);

  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);

  // useEffect로 입력값 유효성 체크하여 버튼 활성화
  useEffect(() => {
    if (isEdit) {
      setIsActive(!!title.trim() || !!content.trim());
    } else {
      setIsActive(
        !!writer.trim() &&
          !!password.trim() &&
          !!title.trim() &&
          !!content.trim()
      );
    }
  }, [writer, password, title, content, isEdit]);
  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const registButton = async () => {
    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: writer,
            password: password,
            title: title,
            contents: content,
          },
        },
      });
      console.log(result);
      resetFormData();
      alert("게시글 등록에 성공하였습니다.");

      router.push(`/boards/${result.data?.createBoard._id}`);
      console.log(result.data?.createBoard._id);
    } catch {
      alert("에러가 발생하였습니다. 다시 시도해주세요.");
    }
  };

  const onClickUpdate = async () => {
    const promptPassword = prompt("비밀번호를 입력해주세요");

    if (!promptPassword) {
      alert("비밀번호가 입력되지 않았습니다.");
      return;
    }

    try {
      const myvariables: UpdateBoardMutationVariables = {
        boardId: String(params.boardId),
        password: promptPassword,
        updateBoardInput: {},
      };

      if (title) myvariables.updateBoardInput.title = title;
      if (content) myvariables.updateBoardInput.contents = content;

      const result = await updateBoard({ variables: myvariables });

      // 성공적으로 수정된 경우
      alert("수정이 완료되었습니다.");
      router.push(`/boards/${result.data?.updateBoard._id}`);
      console.log(result.data?.updateBoard._id);
    } catch (error) {
      // 조건부 타입 검사 적용: 에러가 Error 타입인지 확인
      if (error instanceof Error) {
        console.error("Update error:", error.message);

        if (
          (error as { graphQLErrors?: GraphQLError[] }).graphQLErrors?.some(
            (e: GraphQLError) => e.message === "Invalid password"
          )
        ) {
          alert("비밀번호가 틀렸습니다.");
        } else {
          alert("오류가 발생했습니다. 다시 시도해주세요.");
        }
      } else {
        console.error("Unknown error", error);
        alert("예기치 않은 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const writername = "작성자 명을 입력해 주세요.";
  const passwordPlaceholder = "비밀번호를 입력해 주세요.";
  const titlePlaceholder = "제목을 입력해 주세요.";
  const contentsPlaceholder = "내용을 입력해 주세요.";
  const adrNum = "01234";
  const adrType = "주소를 입력해 주세요.";
  const adrDetail = "상세주소";
  const youtube = "링크를 입력해 주세요.";

  function resetFormData() {
    // 폼 초기화
    const el = document.querySelectorAll("input, textarea");
    for (let i = 0; i < el.length; i++) {
      const element = el[i] as HTMLInputElement | HTMLTextAreaElement;
      element.value = "";
    }
  }

  const cancelButton = () => {
    resetFormData();
    alert("등록이 취소되었습니다.");
  };

  return {
    onChangeWriter,
    onChangePassword,
    onChangeTitle,
    onChangeContent,
    registButton,
    onClickUpdate,
    cancelButton,
    isActive,
    writername,
    passwordPlaceholder,
    titlePlaceholder,
    contentsPlaceholder,
    adrNum,
    adrType,
    adrDetail,
    youtube,
  };
};
