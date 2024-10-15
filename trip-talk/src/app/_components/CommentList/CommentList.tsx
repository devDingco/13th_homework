"use client";

import { COMMENT_FORM } from "../../../constants/constants";
import styles from "./styles.module.css";
import Comment from "../Comment/Comment";
import useCommentList from "../../../commons/hooks/useCommentList";

export default function CommentList() {
  const { data } = useCommentList();
  const hasComments = data?.fetchBoardComments.length;

  return (
    <div className={styles.comment_area}>
      {hasComments ? (
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
                rating={e.rating}
              />
            ))}
          </ul>
        </div>
      ) : (
        <p>{COMMENT_FORM.NO_COMMENTS}</p>
      )}
    </div>
  );
}
