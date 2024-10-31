"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import useBoardsList from "./hooks";

export default function BoardsList(props) {
  const { handlerDeleteList, handlerOnclickList } = useBoardsList();
  return (
    <div className={styles.cssContainer}>
      <div className={styles.css_main}>
        <section className={styles.css_header}>
          <span className={styles.css_headerNumber}>번호</span>
          <span className={styles.css_headerTitle}>제목</span>
          <span className={styles.css_headerWriter}>작성자</span>
          <span className={styles.css_headerDate}>날짜</span>
        </section>
        <section className={styles.css_boardDiv}>
          {props.data?.fetchBoards.map((el, index) => (
            <div
              key={el._id}
              className={styles.css_boardList}
              onClick={() => handlerOnclickList(el._id)}
            >
              <div className={styles.css_index}>{index + 1}</div>
              <div className={styles.css_title}>
                {el.title
                  .replaceAll(props.keyword, `@#$${props.keyword}@#$`)
                  .split("@#$")
                  .map((el, index) => (
                    <span
                      key={`${el}_${index}`}
                      style={{ color: el === props.keyword ? "red" : "black" }}
                    >
                      {el}
                    </span>
                  ))}
              </div>
              <div className={styles.css_writer}>{el.writer}</div>
              <div className={styles.css_date}>
                {el.createdAt.substring(0, 10)}
              </div>
              {/* TODO: delete 이미지 hover 처리하기 , css간격맞추기  */}
              <Image
                src="/img/delete.png"
                alt="deleteBtn"
                width={24}
                height={24}
                onClick={(e) => handlerDeleteList(e, el._id)}
              ></Image>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
