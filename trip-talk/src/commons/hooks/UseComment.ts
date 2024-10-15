import { ICommentList } from "../../types/components.type";

export default function useComment(commentData: ICommentList) {
  // const { writer, contents, createdAt } = props;
  const onClickEditComment = () => {
    // edit!
  };

  const onClickDeleteComment = () => {
    // delete!!
  };

  return {
    onClickEditComment,
    onClickDeleteComment,
    commentData,
  };
}
