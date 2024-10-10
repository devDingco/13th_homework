import styles from "./style.module.css";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { CREATE_BOARD_COMMENT, FETCH_BOARD_COMMENTS } from "./queries";
import { Flex, Rate } from "antd";

export default function CommentPage() {
  const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT);
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");
  const [rating, setRating] = useState(3);

  const params = useParams();
  const boardId = params.boardId;

  // 쿼리에서 boardId 변수를 사용하여 데이터 조회
  const { data, refetch } = useQuery(FETCH_BOARD_COMMENTS, {
    variables: { boardId },
  });

  const commentSubmit = async () => {
    try {
      const result = await createBoardComment({
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

      refetch();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.commentContainer}>
        <div className={styles.title}>Add comment</div>
        <div className={styles.titil_sm}>Comment</div>
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
        <button className={styles.commentUpload} onClick={commentSubmit}>
          댓글 등록
        </button>
      </div>
    </div>
  );
}
