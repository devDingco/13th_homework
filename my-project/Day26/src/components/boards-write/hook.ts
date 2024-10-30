"use client";

import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import {
  CREATE_BOARD,
  FETCH_BOARD,
  FETCH_BOARDS,
  UPDATE_BOARD,
} from "./queries";

export default function useBoardNew(props) {
  const router = useRouter();
  const params = useParams();
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: params.boardId,
    },
  });

  const [input, setInput] = useState({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });

  const [errorMessage, setErrorMessage] = useState<{
    writer: "visible" | "hidden";
    password: "visible" | "hidden";
    title: "visible" | "hidden";
    contents: "visible" | "hidden";
  }>({
    writer: "visible",
    password: "visible",
    title: "visible",
    contents: "visible",
  });

  const [registerCheck, setRegisterCheck] = useState(true);
  const [createBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });

    setErrorMessage({
      ...errorMessage,
      [event.target.name]: event.target.value === "" ? "visible" : "hidden",
    });

    if (!Object.values(input).every((el) => el === "")) setRegisterCheck(false);
  };

  const onClickRegister = async () => {
    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            ...input,
          },

          refetchQueries: [{ query: FETCH_BOARDS }],
        },
      });

      router.push(`/boards/${result.data.createBoard._id}`);
    } catch (error) {
      let errorMessage;

      if (error instanceof ApolloError) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          errorMessage = error.graphQLErrors[0].message;
        } else if (error.message) {
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log("에러메시지", errorMessage);
    }
  };

  const onClickEdit = async () => {
    try {
      await updateBoard({
        variables: {
          boardId: params.boardId,
          password: input.password,
          updateBoardInput: {
            title: input.title,
            contents: input.contents,
          },
          refetchQueries: [{ query: FETCH_BOARDS }],
        },
      });

      router.push(`/boards`);
    } catch (error) {
      let errorMessage;

      if (error instanceof ApolloError) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          errorMessage = error.graphQLErrors[0].message;
        } else if (error.message) {
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log("에러메시지", errorMessage);
    }
  };

  const onClickEditCancel = () => {
    router.push(`/boards/${params.boardId}`);
  };

  useEffect(() => {
    if (props.isEdit && data) {
      setInput({
        writer: data.fetchBoard.writer || "",
        password: "",
        title: data.fetchBoard.title || "",
        contents: data.fetchBoard.contents || "",
      });

      setErrorMessage({
        writer: "hidden",
        password: "visible",
        title: "hidden",
        contents: "hidden",
      });
    }
  }, [props.isEdit, data]);

  return {
    data,
    registerCheck,
    errorMessage,
    onChangeInput,
    onClickRegister,
    onClickEdit,
    onClickEditCancel,
  };
}
