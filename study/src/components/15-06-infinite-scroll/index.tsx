import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  FetchBoardCommentsDocument,
  FetchBoardCommentsQuery,
  UpdateBoardCommentDocument,
} from "@/commons/graphql/graphql";

interface ICommentItemProps {
  commentData: FetchBoardCommentsQuery["fetchBoardComments"][0];
}

export default function CommentItem({ commentData }: ICommentItemProps) {
  const [isEdit, setIsEdit] = useState(false);

  const [updateBoardComment] = useMutation(UpdateBoardCommentDocument);

  const onEditSubmit = async () => {
    const commentContents = document
      .getElementById("commentContents")
      ?.getAttribute("value");
    const commentPassword = document
      .getElementById("commentPassword")
      ?.getAttribute("value");

    console.log(commentContents, commentPassword);

    try {
      const result = await updateBoardComment({
        variables: {
          updateBoardCommentInput: {
            contents: commentContents,
          },
          password: commentPassword,
          boardCommentId: commentData._id,
        },
        refetchQueries: [
          {
            query: FetchBoardCommentsDocument,
            variables: { boardId: "670dbd425413b3002914d39b", page: 1 },
          },
        ],
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const onEdit = () => {
    setIsEdit(!isEdit);

    if (isEdit) {
      onEditSubmit();
    }
  };

  return (
    <div className="flex gap-7">
      <div>글쓴이 : {commentData.writer}</div>
      <div>
        댓글내용 :{" "}
        {isEdit ? (
          <div className="flex">
            <input
              type="text"
              id="commentContents"
              defaultValue={commentData.contents}
              className="border p-2"
              // onChange={() => changeValue()}
            />
            비밀번호 :{" "}
            <input
              type="password"
              id="commentPassword"
              className="border p-2"
            />
          </div>
        ) : (
          commentData.contents
        )}
      </div>
      <div>별점 : {commentData.rating}</div>
      <div>댓글날짜 : {commentData.createdAt}</div>
      <div>
        <button
          className={`btn ${isEdit ? "btn-primary text-white" : ""}`}
          onClick={() => onEdit()}
        >
          {isEdit ? "수정완료" : "수정하기"}
        </button>
      </div>
    </div>
  );
}
