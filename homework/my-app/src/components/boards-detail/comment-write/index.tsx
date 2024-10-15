import styles from "./style.module.css";
import { gql, useMutation, useQuery } from "@apollo/client";
import { SetStateAction, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CREATE_BOARD_COMMENT, FETCH_BOARD_COMMENTS } from "./queries";
import { Flex, Rate } from "antd";

interface ICommentWriteProps {
  isEdit: boolean;
  commentId: string;
  setIsEdit: (value: boolean) => void;
}

export default function CommentPage({
  isEdit,
  commentId,
  setIsEdit,
}: ICommentWriteProps) {
  const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT);
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");
  const [rating, setRating] = useState(3);

  const params = useParams();
  const boardId = params.boardId;

  const { data, refetch } = useQuery(FETCH_BOARD_COMMENTS, {
    variables: { boardId },
  });

  useEffect(() => {
    if (isEdit && data) {
      const existingComment = data.fetchBoardComments.find(
        (comment: { _id: string }) => comment._id === commentId
      );
      if (existingComment) {
        setWriter(existingComment.writer);
        setContents(existingComment.contents);
        setRating(existingComment.rating);
      }
    }
  }, [isEdit, data, commentId]);

  const commentSubmit = async () => {
    try {
      await createBoardComment({
        variables: {
          boardId,
          writer,
          password,
          contents,
          rating,
        },
      });
      setWriter("");
      setPassword("");
      setContents("");

      console.log("댓글 등록 후 refetch 호출");
      await refetch();
    } catch (error) {
      console.error("Error creating comment:", error);
      alert("댓글 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleRatingChange = (value: SetStateAction<number>) => {
    setRating(value);
  };

  const UPDATE_BOARD_COMMENT = gql`
    mutation updateBoardComment(
      $updateBoardCommentInput: UpdateBoardCommentInput!
      $password: String!
      $boardCommentId: ID!
    ) {
      updateBoardComment(
        updateBoardCommentInput: $updateBoardCommentInput
        password: $password
        boardCommentId: $boardCommentId
      ) {
        _id
        contents
        rating
      }
    }
  `;

  const [updateBoardComment] = useMutation(UPDATE_BOARD_COMMENT);

  const updateComment = async () => {
    try {
      const result = await updateBoardComment({
        variables: {
          boardCommentId: commentId,
          password,
          updateBoardCommentInput: {
            contents,
            rating,
          },
        },
      });

      console.log("댓글 수정 후 refetch 호출");
      await refetch();
      setIsEdit(false);
    } catch (error: any) {
      console.error("Error updating comment:", error);
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        const errorMessage = error.graphQLErrors[0].message;
        alert(`댓글 수정 중 오류가 발생했습니다: ${errorMessage}`);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.commentContainer}>
        {!isEdit && (
          <>
            <div className={styles.title}>Add comment</div>
            <div className={styles.titil_sm}>Comment</div>
          </>
        )}
        <div className={styles.rating}>
          <Flex gap="middle" vertical>
            <Rate onChange={handleRatingChange} value={rating} />
          </Flex>
        </div>
        <input
          type="text"
          placeholder="작성자 이름"
          value={writer}
          onChange={(e) => setWriter(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <textarea
          className={styles.commentInput}
          placeholder="댓글을 입력해 주세요."
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        ></textarea>
        <button
          className={styles.commentUpload}
          onClick={isEdit ? updateComment : commentSubmit}
        >
          {isEdit ? "댓글 수정" : "댓글 등록"}
        </button>
      </div>
    </div>
  );
}
