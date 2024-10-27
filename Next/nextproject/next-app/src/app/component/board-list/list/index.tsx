import Image from "next/image";
import React from "react";
import styles from "./style.module.css";
import UseListWrite from "./hook";
import { IListProps } from "./types";
import SearchPage from "../search";
import UseSearchPage from "../search/hook";
export default function ListPage(props: IListProps) {
  const { onMoveDetailPage, onClickDelete, onClickWriteBoard } =
    UseListWrite(props);

  const { onChangeSearch, keyword } = UseSearchPage(props);
  // const [keyword, setKeyWord] = useState("");
  console.log(props.data?.fetchBoards);
  //노션 24
  return (
    <>
      <SearchPage keyword={keyword} onChange={onChangeSearch} />
      <div className={styles.css_layout}>
        <div className={styles.css_listborder}>
          <div className={styles.css_listheader}>
            <div className={styles.css_number}>번호</div>
            <div className={styles.css_listtitle}>제목</div>
            <div className={styles.css_listwriter}>작성자</div>
            <div className={styles.css_listdate}>날짜</div>
          </div>
          <div className={styles.css_listall}>
            {props.data?.fetchBoards.map((el, index) => (
              <div key={el._id}>
                <div
                  className={styles.css_yourboard}
                  onClick={() => onMoveDetailPage(el._id)}
                >
                  <div className={styles.css_border}>
                    <div className={styles.css_boardnum}>
                      {props.count?.fetchBoardsCount +
                        10 -
                        index -
                        props.currentPage * 10}
                    </div>
                    <div className={styles.css_boardtitle}>
                      {el.title
                        .replaceAll(keyword, `@@@${keyword}@@@`)
                        .split("@@@")
                        .map((el, index) => (
                          <span
                            key={`${el}_${index}`}
                            style={{
                              color: el === keyword ? "red" : "black",
                            }}
                          >
                            {el}
                          </span>
                        ))}
                    </div>
                    <div className={styles.css_boardwriter}>{el.writer}</div>
                    <div className={styles.css_boarddate}>
                      {el.createdAt.split("T")[0]}
                    </div>
                  </div>
                  <Image
                    src="/assets/Delete.png"
                    width={0}
                    height={0}
                    alt="delete"
                    className={styles.css_delete}
                    id={el._id}
                    onClick={(event) => onClickDelete(event, el._id)}
                  />
                </div>
              </div>
            ))}
            <div className={styles.css_createboard} onClick={onClickWriteBoard}>
              작성하기
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
