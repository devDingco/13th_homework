import Image from "next/image";
import LibaryStarPage from "../comment-write/comment-write-star";
import styles from "./styles.module.css";
import { useState } from "react";
import CommentWriteUI from "../comment-write";
import { useMutation } from "@apollo/client";
import { UpdateBoardCommentDocument } from "@/commons/graphql/graphql";

export default function CommentListItem({ el, boardCommentId }: any) {
  const [isEdit, setIsEdit] = useState(false);
  const onClickEditBtn = () => {
    setIsEdit(true);
  };

  return (
    <>
      {!isEdit ? (
        <section className={styles.css_section}>
          <div className={styles.css_wrapper}>
            <div className={styles.css_container}>
              <div className={styles.css_writer}>
                <div className={styles.css_writerDiv}>
                  <Image
                    src="/img/profile.png"
                    alt="profile"
                    width={24}
                    height={24}
                    sizes="100vw"
                  />
                  <span>{el.writer}</span>
                  <LibaryStarPage></LibaryStarPage>
                </div>
                <div className={styles.css_editCloseBtn}>
                  <Image
                    src="/img/edit.png"
                    alt="edit"
                    width={24}
                    height={24}
                    sizes="100vw"
                    onClick={onClickEditBtn}
                  />
                  <Image
                    src="/img/close.png"
                    alt="close"
                    width={24}
                    height={24}
                    sizes="100vw"
                  />
                </div>
              </div>
              <div className={styles.css_comment}>{el.contents}</div>
              <div className={styles.css_date}>
                {el.createdAt.substring(0, 10)}
              </div>
            </div>
            <hr />
          </div>
        </section>
      ) : (
        <CommentWriteUI
          isEdit={isEdit}
          el={el}
          boardCommentId={boardCommentId}
          setIsEdit={setIsEdit}
        />
      )}
    </>
  );
}
