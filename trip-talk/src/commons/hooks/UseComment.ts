import { useState } from "react";
import { ICommentList } from "../../types/components.type";

export default function useComment(commentData: ICommentList) {
  // const { writer, contents, createdAt } = props;
  const [isEdit, setIsEdit] = useState(false);

  const onClickEditComment = () => {
    setIsEdit(true);
  };

  const onClickDeleteComment = () => {
    // delete!!
  };

  return {
    onClickEditComment,
    onClickDeleteComment,
    commentData,
    isEdit,
  };
}
