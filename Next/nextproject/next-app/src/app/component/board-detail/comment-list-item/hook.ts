"use client";

import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { FETCH_COMMENTS } from "../comment-write/queries";
import { useState } from "react";
export const EditComment = () => {
  const params = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [data] = useQuery(FETCH_COMMENTS, {
    variables: { boardId: params.boardId },
  });
  const editModeHandler = () => {
    setIsEdit(!isEdit);
  };
  return {};
};
