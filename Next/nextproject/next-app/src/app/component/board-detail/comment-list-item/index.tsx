"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./style.module.css";
import { Rate } from "antd";
import CommentWriteBox from "../comment-write/comment-write-box";
import { FetchBoardCommentsQuery } from "../../../../commons/graphql/graphql";

interface IProps {
  // el: FetchBoardCommentsQuery["fetchBoardComments"][0];
  el: FetchBoardCommentsQuery["fetchBoardComments"][0];
  index: number;
}

export default function CommentItem({ el, index }: IProps) {
  const [isEdit, setIsEdit] = useState(false);

  const onClickEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <>
      {isEdit ? (
        <CommentWriteBox isEdit={isEdit} index={index} />
      ) : (
        <>
          <div className={styles.css_commentshow}>
            <div className={styles.css_commentwriter}>
              <div className={styles.css_profilewriter}>
                <Image
                  src="/assets/Profile.png"
                  alt="profile"
                  width={18}
                  height={10}
                  className={styles.css_profileimage}
                />
                <div className={styles.css_writer}>
                  {el.writer}
                  <Rate allowHalf defaultValue={el.rating} />
                </div>
              </div>

              <div className={styles.css_image}>
                <Image
                  src="/assets/Edit.png"
                  alt="edit"
                  width={0}
                  height={0}
                  className={styles.css_commentedit}
                  onClick={onClickEdit}
                />
                <Image
                  src="/assets/Close.png"
                  alt="close"
                  width={0}
                  height={0}
                  className={styles.css_commentclose}
                />
              </div>
            </div>
            <div className={styles.css_commentcontents}>{el.contents}</div>
            <div>{el.createdAt.split("T")[0]}</div>
            <div className={styles.css_hr}></div>
          </div>
        </>
      )}
    </>
  );
}
