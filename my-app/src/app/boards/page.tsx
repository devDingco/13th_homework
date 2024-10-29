"use client";

import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { gql, useQuery } from "@apollo/client";

const list = gql`
  query {
    fetchBoards(page: 1) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

export default function boards() {
  const { data } = useQuery(list);
  const router = useRouter();
  console.log(data, "데이터확인");

  const 상세페이지이동 = (boardId) => {
    router.push(`/boards/${boardId}`);
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.번호}>번호</div>
        <div className={styles.제목}>제목</div>
        <div className={styles.작성자}>작성자</div>
        <div className={styles.날짜}>날짜</div>
      </div>

      {data?.fetchBoards.map((el, index) => (
        <div
          key={el._id}
          className={styles.내용박스}
          onClick={() => 상세페이지이동(el._id)}
        >
          <div className={styles.넘버}>{index + 1}</div>
          <div className={styles.타이틀}>{el.title}</div>
          <div className={styles.라이터}>{el.writer}</div>
          <div className={styles.데이}>
            {el.createdAt.split("T")[0].replace(/-/g, ".")}
          </div>
        </div>
      ))}
    </div>
  );
}
