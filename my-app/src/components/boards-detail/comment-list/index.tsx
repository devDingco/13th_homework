import Image from "next/image";
import styles from "./styles.module.css";

import useBoardsDetailCommentList from "./hook";
import CommentItem from "../comment-list-item";

export default function BoardsDetailCommentList() {
  const { data } = useBoardsDetailCommentList();

  return (
    <div>
      <main>
        {data?.fetchBoardComments?.map((el) => (
          <CommentItem el={el} key={el._id} />
        ))}
      </main>
    </div>
  );
}
