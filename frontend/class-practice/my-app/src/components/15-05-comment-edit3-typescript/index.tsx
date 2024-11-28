import { FetchBoardsQuery } from "@/commons/graphql/graphql";
import React, { useState } from "react";

interface ICommentItemProps {
  el: FetchBoardsQuery["fetchBoards"][0];
}

const CommentItem = ({ el }: ICommentItemProps) => {
  const [isEdit, setIsEdit] = useState(false);

  const onClickEdit = () => {
    setIsEdit(true);
  };

  return !isEdit ? (
    <div>
      <div>
        <span>{el.title}</span>
        <span>{el.writer}</span>

        <button onClick={onClickEdit}>수정하기</button>
      </div>
    </div>
  ) : (
    <input type="text" />
  );
};

export default CommentItem;
