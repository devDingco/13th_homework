import { useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, SetStateAction, useState } from "react";
import {
  CreateBoardDocument,
  UpdateBoardDocument,
} from "@/commons/gql/graphql";
import CONSTANTS_DESCRIPTION from "@/commons/constants/description";

export const useBoardWrite = (isEdit: boolean) => {
  const router = useRouter();
  const params = useParams();

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [isActive, setIsActive] = useState(isEdit ? true : false);

  // 오류 메세지
  const defaultErrorMessage = isEdit ? "" : CONSTANTS_DESCRIPTION.ERROR_MESSAGE;
  const [writerErrorMessage, setWriterErrorMessage] =
    useState(defaultErrorMessage);
  const [passwordErrorMessage, setPasswordErrorMessage] =
    useState(defaultErrorMessage);
  const [titleErrorMessage, setTitleErrorMessage] =
    useState(defaultErrorMessage);
  const [contentsErrorMessage, setContentsErrorMessage] =
    useState(defaultErrorMessage);

  // graphql
  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);

  // onChange
  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setWriter(value);
    checkTextInput(value, setWriterErrorMessage);
    if (value && password && title && contents) return setIsActive(true);
    return setIsActive(false);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    checkTextInput(value, setPasswordErrorMessage);
    if (writer && value && title && contents) return setIsActive(true);
    return setIsActive(false);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTitle(value);
    checkTextInput(value, setTitleErrorMessage);
    if (writer && password && value && contents) return setIsActive(true);
    return isEdit ? setIsActive(true) : setIsActive(false);
  };

  const onChangeContents = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setContents(value);
    checkTextInput(value, setContentsErrorMessage);
    if (writer && password && title && value) return setIsActive(true);
    return isEdit ? setIsActive(true) : setIsActive(false);
  };

  // onClick
  const onClickSubmit = async () => {
    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: writer,
            password: password,
            title: title,
            contents: contents,
          },
        },
      });

      const boardId = result.data?.createBoard._id;
      router.push(`/boards/${boardId}`);
    } catch {
      alert(CONSTANTS_ALERT_MESSAGE.CREATE_BOARD_FAILED);
    }
  };

  const onClickEdit = async () => {
    const passwordInput = prompt(
      CONSTANTS_ALERT_MESSAGE.UPDATE_BOARD_INPUT_PASSWORD
    );

    try {
      const result = await updateBoard({
        variables: {
          updateBoardInput: {
            title: title,
            contents: contents,
            youtubeUrl: "www.youtube.com",
          },
          password: passwordInput,
          boardId: params.boardId as string,
        },
      });
      alert(CONSTANTS_ALERT_MESSAGE.UPDATE_BOARD_SUCCEED);
      router.push(`/boards/${params.boardId}`);
    } catch (error: any) {
      alert(error.graphQLErrors[0].message);
      console.log(error.message);
    }
  };

  const onClickCancel = () => {
    if (isEdit) {
      router.push(`/boards/${params.boardId}`);
    } else {
      router.push(`/boards`);
    }
  };

  const checkTextInput = (
    input: string,
    handler: (value: SetStateAction<string>) => void
  ) => {
    if (input && !checkSpace(input)) {
      handler("");
    } else if (checkString(input)) {
      handler("");
    } else if (isEdit) {
      handler("");
    } else {
      handler(defaultErrorMessage);
    }
  };

  const checkString = (str: string) => {
    const regex = /[ㄱ-ㅎ가-힣a-zA-Z0-9]/;
    if (str.search(regex) != -1) return true;
    return false;
  };

  const checkSpace = (str: string) => {
    if (str.search(/\s/) != -1) return true;
    return false;
  };

  return {
    onChangeWriter,
    onChangePassword,
    onChangeTitle,
    onChangeContents,
    onClickSubmit,
    onClickEdit,
    onClickCancel,
    writerErrorMessage,
    passwordErrorMessage,
    titleErrorMessage,
    contentsErrorMessage,
    isActive,
  };
};
