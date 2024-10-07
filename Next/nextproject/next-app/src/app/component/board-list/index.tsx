import Image from "next/image";
import React from "react";
import styles from "./style.module.css";
import UseListWrite from "./hook";
export default function ListPage() {
  const { onMoveDeatilPage, onClickDelete, data } = UseListWrite();
  return (
    <>
      <div className={styles.css_listlayout}>
        <div className={styles.css_listmain}>
          <div className={styles.css_main}>
            <div className={styles.css_all}>
              <div className={styles.css_listheader}>
                <div className={styles.css_number}>번호</div>
                <div className={styles.css_listtitle}>제목</div>
                <div className={styles.css_listwriter}>작성자</div>
                <div className={styles.css_listdate}>날짜</div>
              </div>
              <div className={styles.css_listall}>
                {data?.fetchBoards.map((el, index) => (
                  <div key={el._id}>
                    <div className={styles.css_yourboard}>
                      <div className={styles.css_border}>
                        <div
                          className={styles.css_boardnum}
                          onClick={() => onMoveDeatilPage(el._id)}
                        >
                          {data?.fetchBoards.length - index}
                        </div>
                        <div
                          className={styles.css_boardtitle}
                          onClick={() => onMoveDeatilPage(el._id)}
                        >
                          {el.title}
                        </div>
                        <div
                          className={styles.css_boardwriter}
                          onClick={() => onMoveDeatilPage(el._id)}
                        >
                          {el.writer}
                        </div>
                        <div
                          className={styles.css_boarddate}
                          onClick={() => onMoveDeatilPage(el._id)}
                        >
                          {el.createdAt.split("T")[0]}
                        </div>
                        <Image
                          src="/assets/Delete.png"
                          width={0}
                          height={0}
                          alt="delete"
                          className={styles.css_delete}
                          id={el._id}
                          onClick={() => onClickDelete(el._id)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
