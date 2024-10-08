import { FetchBoardCommentsQuery } from "@/commons/graphql/graphql";
import styles from "./styles.module.css";

const Comment = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment._id} className={styles.comment_box}>
          <div>
            <div>
              <div>
                <div>프로필사진</div>
                <div>{comment.writer}</div>
              </div>
              <div>{comment.rating}</div>
            </div>
            <div>
              <div>수정버튼</div>
              <div>삭제버튼</div>
            </div>
          </div>
          <div>{comment.contents}</div>
          <div>{comment.createdAt}</div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
