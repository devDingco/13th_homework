"use client";

import React from "react";
import Image from "next/image";
import { Rate } from "antd";
import styles from "./styles.module.css";
import { FetchCommentsQuery } from "@/commons/graphql/graphql";
import CommentWrite from "../comment-write";
import useCommentItem from "./hook";

interface ICommentItemProps {
  comment: FetchCommentsQuery["fetchBoardComments"][0];
  index: number;
  totalComments: number;
}

export default function CommentItem({
  comment,
  index,
  totalComments, // 전체 댓글 수를 전달 받아야 마지막으로 표시되는 댓글 체크 가능
}: ICommentItemProps) {
  // 마지막으로 표시되는 댓글 (처음 등록한 댓글) 아래 border-bottom 삭제
  const lastComment = index === totalComments - 1;
  const { isEdit, onClickEditComment, isEditMode } = useCommentItem();

  return (
    <>
      {!isEdit ? (
        <div
          key={comment?._id}
          className={`${styles.listBody} ${
            lastComment ? styles.lastListBody : ""
          }`}
        >
          <div className={styles.titleSection}>
            <div className={styles.leftTitle}>
              <div className={styles.writerInfo}>
                <Image
                  src="/icon/profile_img.png"
                  className={styles.profile}
                  alt="프로필 이미지"
                  width={0}
                  height={0}
                />
                <div className={styles.titleText}>{comment?.writer}</div>
              </div>
              <div className={styles.stars}>
                <Rate disabled defaultValue={comment?.rating} />
              </div>
            </div>
            <div>
              <div className={styles.rightTitle}>
                <Image
                  src="/icon/edit.svg"
                  className={styles.commentEditButton}
                  alt="댓글 수정"
                  width={0}
                  height={0}
                  onClick={onClickEditComment}
                />
                <Image
                  src="/icon/close.svg"
                  className={styles.commentDeleteButton}
                  alt="댓글 삭제"
                  width={0}
                  height={0}
                />
              </div>
            </div>
          </div>
          <div className={styles.commentContents}>{comment?.contents}</div>
          <div className={styles.commentDate}>
            {isEdit
              ? comment?.createdAt?.split("T")[0].split("-").join(".")
              : comment?.updatedAt?.split("T")[0].split("-").join(".")}
          </div>
        </div>
      ) : (
        <CommentWrite
          comments={comment}
          isEdit={isEdit}
          isEditMode={isEditMode}
        />
      )}
    </>
  );
}
