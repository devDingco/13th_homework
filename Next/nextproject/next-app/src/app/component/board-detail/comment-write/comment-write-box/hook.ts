"use client";

import { useMutation, useQuery } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { useParams } from "next/navigation";
import {
  Comment,
  FETCH_COMMENTS,
  UPDATE_COMMENT,
} from "../../../queires/queries";
import { ICommentWriteProps } from "./types";
import { FetchBoardCommentsDocument } from "@/commons/graphql/graphql";

export default function UseCommentWriteBox(props: ICommentWriteProps) {
  const params = useParams();

  const { data } = useQuery(FETCH_COMMENTS, {
    variables: {
      boardId: params.boardId,
    },
  });

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState(
    props.isEdit ? data?.fetchBoardComments[props.index].comment : ""
  );
  const [value, setValue] = useState(
    props.isEdit ? data?.fetchBoardComments[props.index].rating : 0
  );

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const onChangeComment = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const onChangeStar = (value: any) => {
    setValue(value);
  };

  const [submit] = useMutation(Comment);
  const [edit] = useMutation(UPDATE_COMMENT);

  // 댓글 등록
  const onClickSubmit = async () => {
    try {
      await submit({
        variables: {
          boardId: params.boardId,
          createBoardCommentInput: {
            writer: name,
            contents: comment,
            password: password,
            rating: value,
          },
        },
        refetchQueries: [
          {
            query: FETCH_COMMENTS,
            variables: {
              boardId: params.boardId,
              page: 1,
            },
          },
        ],
      });
    } catch {
      alert("에러");
    }
  };

  //댓글 수정
  const onClickEdit = async () => {
    try {
      await edit({
        variables: {
          boardCommentId: String(data?.fetchBoardComments[props.index]._id),
          password: password,
          updateBoardCommentInput: {
            contents: comment,
            rating: value,
          },
        },
        refetchQueries: [
          {
            query: FetchBoardCommentsDocument,
            variables: {
              boardId: params.boardId,
              page: 1,
            },
          },
        ],
      });
    } catch {
      alert("에러");
    }
  };

  return {
    name,
    password,
    comment,
    value,
    data,
    setName,
    onChangeName,
    onChangeComment,
    onChangePassword,
    onChangeStar,
    onClickSubmit,
    onClickEdit,
  };
}
