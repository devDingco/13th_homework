// 댓글 등록, 수정 컴포넌트
"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useCommentWrite } from "./hooks";
import LibaryStarPage from "./comment-write-star";
import CommentListUI from "../comment-list";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import {
  FetchBoardCommentsDocument,
  UpdateBoardCommentDocument,
} from "@/commons/graphql/graphql";

export default function CommentWriteUI({
  isEdit,
  el,
  boardCommentId,
  setIsEdit,
}) {
  const {
    writer,
    password,
    contents,
    rating,
    onClickCommmentAdd,
    onChangeWriter,
    onChangePassword,
    onChangeContents,
    onChangeRating,
  } = useCommentWrite();

  console.log("댓글아이디 :", boardCommentId);

  const params = useParams();
  // console.log("구조분해할당으로받은 isEdit : ", isEdit);

  const { data } = useQuery(FetchBoardCommentsDocument, {
    variables: {
      page: 1,
      boardId: params.boardId as string,
    },
  });
  console.log(data);

  const [updateBoardComment] = useMutation(UpdateBoardCommentDocument);
  const onClickUpdateComment = async () => {
    const myEditComment = {};
    if (contents) myEditComment.contents = contents;

    const updateCommentResult = await updateBoardComment({
      variables: {
        updateBoardCommentInput: myEditComment,
        password: password,
        boardCommentId: boardCommentId,
      },
    });
    console.log("업데이이트댓글:", updateCommentResult);
    setIsEdit(false);
  };

  return (
    <div className={styles.css_display}>
      <div className={styles.css_wrapper}>
        <section className={styles.css_section}>
          <section>
            <div className={styles.css_commentTitle}>
              <Image
                src="/img/chat.png"
                alt="chat"
                width={24}
                height={24}
                sizes="100vw"
              />
              <span>댓글</span>
            </div>
            <div className={styles.css_commentStar}>
              <LibaryStarPage />
            </div>
          </section>
          <section className={styles.css_sectionInput}>
            <div className={styles.css_inputDiv}>
              <div className={styles.css_commentWrite}>
                <div className={styles.css_input}>
                  <span>작성자</span>
                  <input
                    className={styles.css_SInput}
                    placeholder="작성자 명을 입력해주세요"
                    onChange={onChangeWriter}
                    defaultValue={isEdit ? el.writer : ""}
                    disabled={isEdit ? true : false}
                  />
                </div>
                <div className={styles.css_input}>
                  <span>비밀번호</span>
                  <input
                    className={styles.css_SInput}
                    placeholder="비밀번호를 입력해주세요"
                    onChange={onChangePassword}
                    defaultValue={""}
                  />
                </div>
              </div>
              <input
                className={styles.css_commentAdd}
                placeholder="댓글을 입력해주세요"
                onChange={onChangeContents}
                defaultValue={isEdit ? el.contents : ""}
              />
              <div className={styles.css_btnDiv}>
                <button
                  className={styles.css_commentBtn}
                  onClick={isEdit ? onClickUpdateComment : onClickCommmentAdd}
                >
                  {isEdit ? "수정하기" : "댓글등록"}
                </button>
              </div>
            </div>
          </section>
        </section>
        {data && data?.fetchBoardComments.length > 0 ? (
          <CommentListUI />
        ) : (
          <div className={styles.css_noComment}>댓글이없습니다</div>
        )}
        {/* <p className={styles.css_commentList}>등록된 댓글이 없습니다</p> */}
      </div>
    </div>
  );
}
