"use client";

import styles from "./styles.module.css";
import Input from "@/components/writeform/Input";
import { ChangeEvent, useEffect, useState } from "react";
import Textarea from "@/components/writeform/Textarea";
import { ApolloError, gql, useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

const FETCH_BOARDS = gql`
  mutation fetchBoards($page: int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      createdAt
    }
  }
`;

const UPDATE_BOARD = gql`
  mutation updateBoard(
    $boardId: ID!
    $password: String
    $updateBoardInput: UpdateBoardInput!
  ) {
    updateBoard(
      boardId: $boardId
      password: $password
      updateBoardInput: $updateBoardInput
    ) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function BoardsNew(props) {
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

  return (
    <div className="flex flex-col w-[1280px] gap-10 mx-auto my-0 px-0 py-10">
      <div className="w-full font-bold text-xl leading-7">게시물 등록</div>
      <div className="flex flex-col gap-10">
        <div className="flex gap-10">
          <Input
            id="writer"
            onChange={onChangeInput}
            errorMessage={errorMessage.writer}
            defaultValue={props.isEdit ? data?.fetchBoard.writer : ""}
            disabled={props.isEdit ? true : false}
          />
          <Input
            type="password"
            id="password"
            onChange={onChangeInput}
            errorMessage={errorMessage.password}
          />
        </div>
        <hr className={styles.hr} />
        <Input
          id="title"
          onChange={onChangeInput}
          errorMessage={errorMessage.title}
          defaultValue={props.isEdit ? data?.fetchBoard.title : ""}
        />
        <hr className={styles.hr} />
        <Textarea
          id="contents"
          onChange={onChangeInput}
          errorMessage={errorMessage.contents}
          defaultValue={props.isEdit ? data?.fetchBoard.contents : ""}
        />
        <div className={styles.address_box}>
          <label>주소</label>
          <div className={styles.address_search_box}>
            <input
              className={styles.addressNumber}
              type="text"
              placeholder="01234"
            />
            <button>우편번호 검색</button>
          </div>
          <input type="text" placeholder="주소를 입력해주세요." />
          <input type="text" placeholder="상세주소" />
        </div>
        <hr className={styles.hr} />
        <div className={styles.youtube_box}>
          <label>유튜브 링크</label>
          <input type="text" placeholder="링크를 입력해 주세요." />
        </div>
        <hr className={styles.hr} />
        <div className={styles.photo_box}>
          <label>사진첨부</label>
          <div className={styles.add_photo}></div>
        </div>
      </div>
      <div className={styles.footer}>
        <button className={styles.board_new_button} onClick={onClickEditCancel}>
          취소
        </button>
        <button
          onClick={props.isEdit ? onClickEdit : onClickRegister}
          className={
            registerCheck === true
              ? styles.board_new_button
              : styles.board_new_button_register
          }
          disabled={registerCheck}
        >
          등록하기
        </button>
      </div>
    </div>
  );
}
