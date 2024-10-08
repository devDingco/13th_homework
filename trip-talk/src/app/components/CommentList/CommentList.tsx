"use client";

import { COMMENT_FORM } from "../../../enums/constants";
import styles from "./styles.module.css";
import Comment from "../Comment/Comment";
import UseCommentList from "../../../commons/hooks/UseCommentList";

export default function CommentList() {
  const { data } = UseCommentList();

  return (
    <>
      <div className={styles.comment_area}>
        <div>
          <ul>
            {data?.fetchBoardComments.map((e, index: number) => (
              <Comment
                key={e._id}
                _id={e._id}
                number={index + 1}
                writer={String(e.writer)}
                contents={e.contents}
                createdAt={e.createdAt}
              />
            ))}
          </ul>
        </div>
        <p>{COMMENT_FORM.NO_COMMENTS}</p>
      </div>
    </>
  );
}
