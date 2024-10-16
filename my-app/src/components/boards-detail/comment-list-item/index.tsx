"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { Rate } from "antd";
import CommentWrite from "../comment-write";
import { useState } from "react";

export default function CommentListItem({ el, commentId }) {
  const [isEdit, setIsEdit] = useState(false);
  const onClickEdit = () => {
    setIsEdit(true);
  };

  const onFalseEdit = () => {
    setIsEdit(false);
  };

  return (
    <>
      {!isEdit ? (
        <div className={styles.comment_box} key={el._id}>
          <div className={styles.comment_header}>
            <div className={styles.comment_header_left}>
              <Image
                src="/img/profile.png"
                alt="profileImg"
                width={24}
                height={24}
              />
              <div className="writer">{el.writer}</div>
              <Rate value={el.rating} disabled={true} />
            </div>
            <div className={styles.comment_header_right}>
              <Image
                src="/img/edit.svg"
                alt="editImg"
                width={24}
                height={24}
                className="img"
                onClick={onClickEdit}
              />
              <Image
                src="/img/delete.svg"
                alt="deleteImg"
                width={24}
                height={24}
                className="img"
              />
            </div>
          </div>
          <div className={styles.comment_main}>{el.contents}</div>
          <div className={styles.date}>
            {el.createdAt.split("T")[0].replace(/-/g, ".")}
          </div>
        </div>
      ) : (
        <CommentWrite
          el={el}
          isEdit={isEdit}
          commentId={commentId}
          onFalseEdit={onFalseEdit}
        />
      )}
    </>
  );
}
