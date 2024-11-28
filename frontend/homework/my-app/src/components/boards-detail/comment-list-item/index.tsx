import {
  FetchBoardCommentsQuery,
  FetchBoardsQuery,
} from "@/commons/graphql/graphql";
import { Rate } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./style.module.css";
import { EditOutlined } from "@ant-design/icons";
import CommentPage from "../comment-write";

interface ICommentItemProps {
  el: FetchBoardCommentsQuery["fetchBoardComments"][0];
}

const CommentItem = ({ el }: ICommentItemProps) => {
  const [isEdit, setIsEdit] = useState(false);

  const onClickEdit = () => {
    setIsEdit(true); // 수정 모드로 변경
  };

  return !isEdit ? (
    <>
      <div className={styles.commentList}>
        <div className={styles.profileContainer}>
          <Image
            src={el.user?.picture || "/image/profile.png"}
            className={styles.profilebasic}
            alt="프로필기본이미지"
            width={24}
            height={24}
            sizes="100vw"
          />
          <div className={styles.authorName}>{el.writer}</div>
          <div className={styles.rating}>
            <Rate disabled defaultValue={el.rating} />
          </div>
        </div>
        <div>
          {el.contents} <EditOutlined onClick={onClickEdit} />
        </div>
        <div className={styles.date}>
          {new Date(el.createdAt).toLocaleDateString()}
        </div>
      </div>
    </>
  ) : (
    // 수정 모드일 때 댓글 작성 컴포넌트로 전환, isEdit prop 전달
    <CommentPage isEdit={true} commentId={el._id} setIsEdit={setIsEdit} />
  );
};

export default CommentItem;
