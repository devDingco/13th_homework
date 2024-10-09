import { ICommentList } from "../../types/components.type";

export default function useComment(props: ICommentList) {
  const { writer, contents, createdAt } = props;
  const onClickEditComment = () => {
    // edit!
  };

  const onClickDeleteComment = () => {
    // delete!!
  };

  return {
    onClickEditComment,
    onClickDeleteComment,
    writer,
    contents,
    createdAt,
  };
}
