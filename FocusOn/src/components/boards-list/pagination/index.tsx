"use client";
import { usePagination } from "./hook";
import { IPaginationProps } from "./types";
import styles from "./styles.module.css";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { IconButton } from "@mui/material";

export default function Pagination(props: IPaginationProps) {
  const {
    startPage,
    selectedPage,
    isNextDisabled,
    isPrevDisabled,
    onClickPage,
    onClickPrevPage,
    onClickNextPage,
  } = usePagination(props);
  return (
    <div className={styles.pagination_box}>
      {/* 이전페이지 버튼 */}
      <IconButton onClick={onClickPrevPage}>
        <NavigateBeforeRoundedIcon
          sx={{ color: isPrevDisabled ? "#C7C7C7" : "#333333" }}
        />
      </IconButton>
      <div className={styles.number_box}>
        {new Array(10).fill("페이지").map(
          (_, index) =>
            index + startPage <= props.lastPage && (
              <span
                key={index + startPage}
                id={String(index + startPage)}
                onClick={onClickPage}
                className={
                  selectedPage === index + startPage
                    ? styles.click_number
                    : styles.number
                }
              >
                {index + startPage}
              </span>
            )
        )}
      </div>
      {/* 다음페이지 버튼 */}
      <IconButton onClick={onClickNextPage}>
        <NavigateNextRoundedIcon
          sx={{ color: isNextDisabled ? "#C7C7C7" : "#333333" }}
        />
      </IconButton>
    </div>
  );
}
