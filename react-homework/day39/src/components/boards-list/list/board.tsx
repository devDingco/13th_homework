import styles from "./styles.module.css";
import Image from "next/image";
import { useBoardsList } from "./hook";
import { IBoardProps } from "../list-container/types";
import { Fragment } from "react";

const Board: React.FC<IBoardProps> = ({
  id,
  number,
  title,
  writer,
  date,
  keyword,
}) => {
  const { onClickBoard, onMouseEnter, onMouseLeave, onClickDelete, isHovered } =
    useBoardsList(id);

  return (
    <>
      <div
        onClick={onClickBoard}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={styles.board_box}
      >
        <div>{number}</div>
        <div>
          {title
            .replaceAll(keyword, `@#$${keyword}@#$`)
            .split("@#$")
            .map((el, index) => (
              <span
                key={`${el}_${index}`}
                className={el === keyword ? styles.highlight : ""}
              >
                {el}
              </span>
            ))}
        </div>
        <div>{writer}</div>
        <div>{date}</div>

        <button
          className={
            isHovered ? styles.delete_btn_box_hover : styles.delete_btn_box
          }
          onClick={onClickDelete}
        >
          <Image
            className={styles.delete_btn}
            width={24}
            height={24}
            src="/images/delete.png"
            alt="삭제버튼"
          />
        </button>
      </div>
    </>
  );
};

export default Board;
