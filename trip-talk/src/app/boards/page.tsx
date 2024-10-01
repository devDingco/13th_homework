"use client";

import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import styles from "./styles.module.css";

const FETCH_BOARDS = gql`
  query {
    fetchBoards(page: 1) {
      writer
      title
      createdAt
    }
  }
`;

export default function Boards() {
  const { data } = useQuery(FETCH_BOARDS);
  console.log(data);

  return (
    <>
      <div className={styles.post_contain}>
        <div className={styles.post_header}>
          <span className={styles.post_header_number}>번호</span>
          <span className={styles.post_header_title}>제목</span>
          <span className={styles.post_header_writer}>작성자</span>
          <span className={styles.post_header_createdAt}>날짜</span>
        </div>
        <div className={styles.posts}>
          {data?.fetchBoards.map((item) => (
            <div key={item.number} className={styles.post_list}>
              <span className={styles.post_number}>243</span>
              <span className={styles.post_title}>{item.title}</span>
              <span className={styles.post_writer}>{item.writer}</span>
              <span className={styles.post_createdAt}>
                {item.createdAt.slice(0, 10).replaceAll("-", ".")}
              </span>
              <div className={styles.delete}>
                <Image
                  src="/svgs/delete.svg"
                  alt="delete"
                  width={24}
                  height={24}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
