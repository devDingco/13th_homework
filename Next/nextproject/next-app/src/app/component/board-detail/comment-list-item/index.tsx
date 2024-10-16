"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./style.module.css";
import { Rate } from "antd";
import { FetchBoardCommentsQuery } from "@/commons/graphql/graphql";
import CommentWrite from "../comment-write";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCommentList } from "../comment-list/hook";

interface IProps {
  el: FetchBoardCommentsQuery["fetchBoardComments"][0];
}

export default function CommentItem({ el }: IProps) {
  const [isEdit, setIsEdit] = useState(false);
  const { data, onNext, hasMore } = useCommentList();

  const onClickEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <>
      <InfiniteScroll
        next={onNext}
        hasMore={hasMore}
        loader={<div>로딩중입니다.</div>}
        dataLength={data?.fetchBoardComments?.length ?? 0}
      >
        {isEdit ? (
          <CommentWrite />
        ) : (
          <>
            {data && data.fetchBoardComments ? (
              data.fetchBoardComments.map((comment) => (
                <div key={comment._id} className={styles.css_commentshow}>
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
                        {comment.writer}
                        <Rate allowHalf defaultValue={comment.rating} />
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
                  <div className={styles.css_commentcontents}>
                    {comment.contents}
                  </div>
                  <div>{comment.createdAt.split("T")[0]}</div>
                  <div className={styles.css_hr}></div>
                </div>
              ))
            ) : (
              <div>댓글이 없습니다.</div>
            )}
          </>
        )}
      </InfiniteScroll>
    </>
  );
}
