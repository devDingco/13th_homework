import Image from "next/image";
import styles from "./styles.module.css";
import { Rate } from "antd";
import useCommentsWrite from "./hook";
import { useMutation, useQuery } from "@apollo/client";
import { FetchBoardCommentsDocument, UpdateCommentDocument } from "@/commons/graphql/graphql";
import { useEffect } from "react";
import { useCommentList } from "../comment-list/hook";
import { CommentWriteProps } from "./types";



export default function CommentWrite(props: CommentWriteProps) {
  const {
    onChangeContent,
    onChangePw,
    onChangeWriter,
    value,
    setValue,
    writer,
    pw,
    content,
    setContent,
    setWriter,
    onClickSignup,
  } = useCommentsWrite();
  const { id: commentId } = useCommentList();

  console.log("commentId:", commentId);

  const [updateComment] = useMutation(UpdateCommentDocument);

  const { data: commentData } = useQuery(FetchBoardCommentsDocument, {
    variables: { page: 1, boardId: commentId },
    skip: !props.isEditComment,
  });
  console.log("commentData", commentData);

  useEffect(() => {
    if (props.isEditComment && commentData?.fetchBoardComments[props.index]) {
      const comment = commentData.fetchBoardComments[props.index];
      setWriter(comment?.writer || ""); // writer가 null이면 빈 문자열로 처리
      setContent(comment?.contents || "");
      setValue(comment?.rating || 0);
    }
  }, [commentData, props.isEditComment, props.index, setContent, setWriter, setValue]);

  const onClickEditComment = async () => {
    if (!commentData || !commentData.fetchBoardComments || !commentData.fetchBoardComments[props.index]) {
      console.error("Invalid comment data or index");
      return;
    }

    const boardCommentId = commentData.fetchBoardComments[props.index]._id;

    if (!boardCommentId) {
      console.error("Invalid boardCommentId");
      return;
    }
    try {
      const result = await updateComment({
        variables: {
          updateBoardCommentInput: {
            contents: content,
            rating: value,
          },
          password: String(pw),
          boardCommentId: boardCommentId, // 수정하려는 댓글 ID
        },
      });
      console.log("Comment updated:", result);
      props.setIsEditComment(false); // 수정 완료 후 수정 모드 종료
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.commentAllContainer}>
        <div className={styles.commentContainer}>
          {props.isEditComment ? (
            <></>
          ) : (
            <div className={styles.commentTitle}>
              <Image src="/images/comment.png" alt="comment-icon" width={0} height={0} className={styles.commentIcon} />
              <p>댓글</p>
            </div>
          )}

          <div className={styles.starArea}>
            <Rate onChange={setValue} value={value} />
          </div>
          <div className={styles.writerInfoArea}>
            <div className={styles.upInfo}>
              <div className={styles.writer}>
                <p>
                  작성자<span>*</span>
                </p>
                <input type="text" placeholder="작성자 명을 입력해 주세요." onChange={onChangeWriter} value={writer} />
              </div>
              <div className={styles.pw}>
                <p>
                  비밀번호<span>*</span>
                </p>
                <input type="password" placeholder="비밀번호를 입력해 주세요." onChange={onChangePw} value={pw} />
              </div>
            </div>
            <div className={styles.downInfo}>
              <textarea placeholder="댓글을 입력해 주세요." onChange={onChangeContent} value={content} />
            </div>
            {props.isEditComment ? (
              <div className={styles.editBtnArea}>
                <button className={styles.exit} onClick={() => props.setIsEditComment(false)}>
                  취소
                </button>
                <button className={styles.editBtn} onClick={onClickEditComment}>
                  수정 하기
                </button>
              </div>
            ) : (
              <div className={styles.btnArea}>
                <button onClick={onClickSignup}>댓글 등록</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
