import { useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { CREATE_BOARD, UPDATE_BOARD } from "../graphql/backend-api";
import { IBoardsWriteHook, IError } from "../../types/components.type";

export default function UseBoardsWrite(boardsWriteProps: IBoardsWriteHook) {
  const params = useParams();
  const router = useRouter();
  const [writer, setWriter] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [createBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);
  const formAction = boardsWriteProps.isEdit ? "수정" : "등록";
  const disabledInput = boardsWriteProps.isEdit ? true : false;
  const disabledButton = boardsWriteProps.isEdit
    ? !(title && contents)
    : !(writer && password && title && contents);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case "writer":
        setWriter(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "title":
        setTitle(event.target.value);
        break;
      case "youtubeUrl":
        setYoutubeUrl(event.target.value);
    }
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };

  const handleSubmitRegistration = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    try {
      event.preventDefault();
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer,
            password,
            title,
            contents,
          },
        },
      });
      const boardId = result.data.createBoard._id;
      router.push(`/boards/${boardId}`);
    } catch (error) {
      console.error(error);
      alert("An error has occurred. Please try again.");
    }
  };

  const handleSubmitEdit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const userPassword = prompt(
        "글을 입력할때 입력하셨던 비밀번호를 입력해주세요"
      );
      const editVariables = {
        updateBoardInput: {
          title: title,
          contents: contents,
          youtubeUrl: youtubeUrl,
          // boardAddress: {
          //   zipcode: string,
          //   address: string,
          //   addressDetail: string;
          // };
          // likeCount: number;
          // dislikeCount: number;
          // images: string;
        },
        boardId: params.boardId,
        password: userPassword,
      };
      if (title) editVariables.updateBoardInput.title = title;
      if (contents) editVariables.updateBoardInput.contents = contents;

      const result = await updateBoard({
        variables: editVariables,
      });
      alert("수정 완료");
      router.push(`/boards/${result.data?.updateBoard._id}`);
      router.refresh();
    } catch (error: unknown) {
      const err = error as IError;
      console.error(err);
      const graphQLErrors = `${err}.graphQLErrors[0]`;
      if (graphQLErrors.includes("비밀번호가 일치하지 않습니다."))
        alert("비밀번호가 일치하지 않습니다.");
      else alert("An error occurred while editing. Please try again.");
    }
  };

  const onSubmit = boardsWriteProps.isEdit
    ? handleSubmitEdit
    : handleSubmitRegistration;

  return {
    formAction,
    disabledInput,
    disabledButton,
    handleInputChange,
    handleContentChange,
    onSubmit,
    writer,
    password,
    title,
    contents,
  };
}
