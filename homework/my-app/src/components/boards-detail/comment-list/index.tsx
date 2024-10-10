import Image from "next/image";
import styles from "./style.module.css";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { CREATE_BOARD_COMMENT, FETCH_BOARD_COMMENTS } from "./queries";

export default function CommentPage() {
  const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT);
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");
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

  return (
    <div className={styles.container}>
      <div className={styles.commentContainer}>
        <div className={styles.title}>Add comment</div>
        <div className={styles.titil_sm}>Comment</div>
        <div className={styles.rating}>
          <Image
            src="/image/star.png"
            width={24}
            height={24}
            sizes="100vw"
            alt="별점별이미지"
          />
          <Image
            src="/image/star.png"
            width={24}
            height={24}
            sizes="100vw"
            alt="별점별이미지"
          />
          <Image
            src="/image/star.png"
            width={24}
            height={24}
            sizes="100vw"
            alt="별점별이미지"
          />
          <Image
            src="/image/star.png"
            width={24}
            height={24}
            sizes="100vw"
            alt="별점별이미지"
          />
          <Image
            src="/image/star.png"
            width={24}
            height={24}
            sizes="100vw"
            alt="별점별이미지"
          />
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
