"use client";

import React, { useEffect, useRef, useState } from "react";

import NewFormText from "./NewFormText";
import NewFormPhoto from "./NewFormPhoto";
import NewFormButton from "./NewFormButton";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import {
  CreateBoardDocument,
  FetchBoardDocument,
  UpdateBoardDocument,
} from "@/commons/graphql/graphql";
import { Button } from "@/components/ui/button";

export default function NewForm({ isEdit }: INewFormProps) {
  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);

  const router = useRouter();
  const params = useParams();

  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: params.boardId as string },
    skip: !isEdit,
  });

  const [inputValue, setInputValue] = useState<IInputValue>(
    isEdit
      ? {
          author: data?.fetchBoard.writer,
          password: "",
          title: data?.fetchBoard.title,
          content: data?.fetchBoard.contents,
        }
      : {
          author: "",
          password: "",
          title: "",
          content: "",
        }
  );
  console.log("😎", inputValue);

  const isPromptShown = useRef(false);
  // const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const onChangeInputValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const promptForPassword = async () => {
    const dummyInput = {};

    console.log("비밀번호 검사 수행");

    const inputPassword: string =
      "" + prompt("글을 작성할 떄 입력하셨던 비밀번호를 입력해주세요");
    try {
      const result = await updateBoard({
        variables: {
          updateBoardInput: dummyInput,
          boardId: params.boardId as string,
          password: inputPassword,
        },
      });
      inputValue.password = inputPassword;
    } catch (error) {
      const gqlError = error as GraphQLError;
      const errorMessages = gqlError.graphQLErrors!.map((err) => err.message);
      alert(errorMessages.join(", "));
      router.back();
    }
  };

  useEffect(() => {
    if (isEdit && isPromptShown.current) return; // 이미 실행되었다면 중단
    if (!isEdit) return;
    isPromptShown.current = true; // 첫 실행 이후 상태 업데이트
    promptForPassword(); // 비동기 작업 호출
  }, []);

  const disabled: boolean =
    inputValue.author &&
    inputValue.password &&
    inputValue.title &&
    inputValue.content
      ? false
      : true;

  // // useEffect 써야할까? 안쓰는게 나을까?
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
            title: String(inputValue.title),
            password: inputValue.password,
            contents: String(inputValue.content),
          },
        },
      });
      console.log("등록성공:", result.data);
      router.push(`/boards/${result.data?.createBoard._id}`);
    } catch (error) {
      console.error("GraphQL 요청 오류:", error);
    }
  };

  const onClickUpdate = async () => {
    // [x] : updateInput
    const updateInput: any = {};
    if (
      inputValue.title?.trim() &&
      inputValue.title !== data?.fetchBoard?.title
    ) {
      updateInput.title = inputValue.title;
    }

    if (
      inputValue.content?.trim() &&
      inputValue.content !== data?.fetchBoard?.contents
    ) {
      updateInput.contents = inputValue.content;
    }

    if (Object.keys(updateInput).length > 0) {
      console.log("수정된 항목만 날아가고있나? ::: updateInput", updateInput);
      try {
        const result = await updateBoard({
          variables: {
            updateBoardInput: updateInput,
            password: inputValue.password,
            boardId: params.boardId as string,
          },
        });

        if (result.data) {
          console.log("기존의 글을 수정하는 경우:::", result);
          alert("게시글이 성공적으로 수정되었습니다!");
        } else {
          alert("수정에 실패했습니다.");
        }
        // 수정이 완료되면 상세 화면으로 이동하기
        router.push(`/boards/${params.boardId}`);
      } catch (error) {
        console.error("GraphQL 요청 오류:", error);
      }
    } else {
      alert("수정된 내용이 없습니다.");
    }
  };

  return (
    <div className="flex flex-col gap-10 py-10">
      <div className="prose-b_20_28">
        {!isEdit ? "게시물 등록" : "게시물 수정"}
      </div>
      <div className="input-area">
        <div className="id-pw-area">
          <NewFormText
            title={"author"}
            value={`${inputValue.author}`}
            onChange={onChangeInputValue}
            disabled={isEdit && true}
          />
          <NewFormText
            title={"password"}
            value={inputValue.password}
            onChange={onChangeInputValue}
            disabled={isEdit && true}
          />
        </div>
        <NewFormText
          title={"title"}
          value={inputValue.title}
          onChange={onChangeInputValue}
        />
        <NewFormText
          title={"content"}
          value={inputValue.content}
          onChange={onChangeInputValue}
        />
        <div>
          <div className="flex justify-start items-end gap-2">
            <NewFormText title={"addressNum"} />
            <Button variant={"outlined"}>우편번호 검색</Button>
          </div>
          <NewFormText title={"addressInput"} />
          <NewFormText title={"addressDetail"} />
        </div>
        <NewFormText title={"youtube"} onChange={onChangeInputValue} />
        <hr />
        <NewFormPhoto title={"photo"} />
      </div>
      <div className="button-area">
        <NewFormButton value={"cancel"} />
        <NewFormButton
          value={isEdit ? "edit" : "register"}
          disabled={disabled}
          onClick={isEdit ? onClickUpdate : onClickSubmit}
        />
      </div>
    </div>
  );
}
