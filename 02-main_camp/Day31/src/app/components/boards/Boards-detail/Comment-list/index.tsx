import Comment from "../Comment";
import useCommentList from "./hook";
import styles from "./styles.module.css";

const CommentList = () => {
  const { data } = useCommentList();

  return (
    <div className={styles.boardCommentContainer}>
      {data?.fetchBoardComments.map((el) => (
        <Comment
          key={el._id}
          writer={String(el.writer)}
          contents={el.contents}
          rating={el.rating}
        />
      ))}
    </div>
  );
};

export default CommentList;
