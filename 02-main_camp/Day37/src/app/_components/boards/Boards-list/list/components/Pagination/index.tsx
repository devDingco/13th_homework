import Image from "next/image";
import styles from "./styles.module.css";
import { IPaginationProps } from "./types";
import usePagination from "./hook";

export default function Pagination(props: IPaginationProps) {
  const {
    startPage,
    lastPage,
    selectedPage,
    hasNextPage,
    onClickPage,
    onClickPrevPage,
    onClickNextPage,
  } = usePagination(props);
  return (
    <div className={styles.paginationContainer}>
      <span className={styles.enabledMovePageButton} onClick={onClickPrevPage}>
        <Image
          src="/assets/move_prev_page_icon.png"
          alt="이전 페이지 버튼 이미지"
          width={6.5}
          height={6.5}
          className={
            startPage >= 6
              ? styles.enabledPrevPageButton
              : styles.disabledPrevPageButton
          }
        ></Image>
      </span>
      {new Array(5).fill("").map(
        (_, index) =>
          index + startPage <= lastPage && (
            <span
              key={index + startPage}
              id={String(index + startPage)}
              className={
                String(index + startPage) === selectedPage
                  ? styles.selectedPageNumber
                  : styles.pageNumber
              }
              onClick={onClickPage}
            >
              {index + startPage}
            </span>
          )
      )}
      <span className={styles.enabledMovePageButton} onClick={onClickNextPage}>
        <Image
          src="/assets/move_next_page_icon.png"
          alt="다음 페이지 버튼 이미지"
          width={6.5}
          height={6.5}
          className={
            hasNextPage
              ? styles.enabledPrevPageButton
              : styles.disabledPrevPageButton
          }
        ></Image>
      </span>
    </div>
  );
}
