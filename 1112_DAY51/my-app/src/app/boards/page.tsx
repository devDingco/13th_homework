"use client";

import styles from "./styles.module.css";

import { FETCH_BOARDS } from "@/components/boardQueries";

import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";

export default function BoardsPage() {
  const router = useRouter();

  const { data } = useQuery(FETCH_BOARDS);
  console.log(data?.fetchBoards);

  // const [hoveredId, setHoveredId] = useState();

  console.log("boards페이지에서 data.fetchBoards:", data?.fetchBoards);

  const onClickDetail = async (
    event: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    event.stopPropagation();
    router.push(`/boards/${id}`);
  };

  return (
    <div className={styles.board_list}>
      <div className={styles.list_box}>
        {data?.fetchBoards.map((el) => (
          <div
            key={el._id}
            className={styles.board_box}
            // onMouseEnter={() => setHoveredId(el._id)}
            // onMouseLeave={() => setHoveredId("")}
            onClick={(event) => onClickDetail(event, el._id)}
          >
            <div>{el.title}</div>

            <div>{el.createdAt.substring(0, 16).split("T")[0]}</div>
            <div>{el.createdAt.substring(0, 16).split("T")[1]}</div>
            {/* {hoveredId === el._id && (
              <button
                onClick={onClickDelete}
                className={
                  hoveredId
                    ? styles.delete_btn_box_hover
                    : styles.delete_btn_box
                }
              >
                <Image
                  className={styles.delete_btn}
                  src={deleteButton}
                  width={24}
                  height={24}
                  alt="삭제버튼"
                />
              </button>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
}
