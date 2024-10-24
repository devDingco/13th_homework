import styles from "./styles.module.css";
import useCommentList from "./hook";
import CommentListItem from "../comment-list-item";

export default function CommentList() {
  const { data, handleDelete, isEdit, onEdit } = useCommentList();

  return (
    <div className={styles.commentsList_gap}>
      {data?.fetchBoardComments.map((el, index, array) => (
        <CommentListItem
          key={el._id}
          _id={el._id}
          writer={el.writer as string}
          rating={el.rating}
          contents={el.contents}
          createdAt={el.createdAt}
          isLast={index === array.length - 1}
          onDelete={() => handleDelete(el._id)}
          isEdit={isEdit}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
