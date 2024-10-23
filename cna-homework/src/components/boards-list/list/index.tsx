import styles from "./styles.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useBoardList from "./hook";
import Pagination from "../pagination";
import Search from "../search";
import { ChangeEvent, useState } from "react";
import _ from "lodash";

export default function BoardList() {
  const router = useRouter();
  const { onClickDelete, data, lastPage, refetch } = useBoardList();
  // console.log('list::',data);
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState("");
  const getDebounce = _.debounce((value) => {
    setKeyword(value); // Debounce 시 keyword를 업데이트
  }, 500);
  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    getDebounce(event.currentTarget.value);
    setSearch(event.currentTarget.value);
  };
  return (
    <>
      <Search refetch={refetch} onChangeSearch={onChangeSearch} search={search} />
      <div className={styles.allContainer}>
        <div className={styles.boardContainer}>
          <div className={styles.boardMenu}>
            <div className={styles.boardNum}>번호</div>
            <div className={styles.boardTitle}>제목</div>
            <div className={styles.boardWriter}>작성자</div>
            <div className={styles.boardDate}>날짜</div>
            <div className={styles.empty}></div>
          </div>
          <div className={styles.boardContents}>
            {data?.fetchBoards?.map((el, index) => (
              <div
                className={styles.boardContent}
                key={el._id}
                onClick={() => {
                  router.push(`/boards/${el._id}`);
                }}
              >
                <div className={styles.contentNum}>{index + 1}</div>
                <div className={styles.contentTitle}>
                  {el.title
                    .replaceAll(keyword, `@#$${keyword}@#$`)
                    .split("@#$")
                    .map((element, index) => (
                      <span key={`${element}_${index}`} style={{ color: element === keyword ? "red" : "black" }}>
                        {element}
                      </span>
                    ))}
                </div>
                <div className={styles.contentWriter}>{el.writer}</div>
                <div className={styles.contentDate}>{el.createdAt.slice(0, 10)}</div>
                <div className={styles.iconArea}>
                  <Image
                    className={styles.deleteIcon}
                    src="/images/delete-icon.png"
                    alt="delete-icon"
                    width={0}
                    height={0}
                    id={el._id}
                    onClick={onClickDelete}
                  />
                </div>
              </div>
            ))}
          </div>
          <Pagination lastPage={lastPage} refetch={refetch} />
        </div>
      </div>
    </>
  );
}
