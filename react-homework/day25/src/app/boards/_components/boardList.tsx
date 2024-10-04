import React, { MouseEvent, useState } from "react";
import styles from "../styles.module.css";
import Image from "next/image";

import { IBoardList } from "@/types/components";
import { useRouter } from "next/navigation";
import { DELETE_BOARD } from "@/graphql/mutation";
import { FETCH_BOARDS } from "@/graphql/query";
import { useMutation } from "@apollo/client";

const BoardList: React.FC<IBoardList> = ({
  id,
  number,
  title,
  writer,
  date,
}) => {
  console.log(date);
  // 호버 state
  const [isHovered, setIsHovered] = useState(false);

  const router = useRouter();
  const [deleteBoard] = useMutation(DELETE_BOARD);

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  // 게시글 클릭시 디테일페이지로 이동
  const onClickBoard = () => {
    console.log("boardList 클릭 ID: " + id);
    router.push(`/boards/${id}`);
  };

  // 게시글 삭제
  const onClickDelete = (event: MouseEvent<HTMLButtonElement>) => {
    // 디테일페이지로 이동되는 거 막기! (이벤트버블링))
    event.stopPropagation();

    try {
      deleteBoard({
        variables: {
          boardId: id,
        },
        refetchQueries: [{ query: FETCH_BOARDS }],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        onClick={onClickBoard}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={styles.board_box}
      >
        <div>{number}</div>
        <div>{title}</div>
        <div>{writer}</div>
        <div>{date}</div>

        {isHovered && (
          <button className={styles.delete_btn_box} onClick={onClickDelete}>
            <Image
              className={styles.delete_btn}
              width={24}
              height={24}
              src="/images/delete.png"
              alt="삭제버튼"
            />
          </button>
        )}
      </div>
    </>
  );
};

export default BoardList;
