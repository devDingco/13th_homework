import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import usePagination from "../../../commons/hooks/usePagination";
import { IPagination } from "../../../types/components.type";
import styles from "./styles.module.css";

export default function Pagination(props: IPagination) {
  const {
    startPage,
    onClickPage,
    onClickPrevPage,
    onClickNextPage,
    currentPage,
  } = usePagination(props);
  return (
    <div className={styles.pagination_container}>
      <span onClick={onClickPrevPage}>
        <LeftOutlined />
      </span>
      {new Array(10).fill(1).map(
        (_, index) =>
          index + startPage <= props.lastPage && (
            <span
              key={index + startPage}
              id={String(index + startPage)}
              onClick={onClickPage}
              style={{
                color: index + startPage === currentPage ? "red" : "black",
              }}
            >
              {index + startPage}
            </span>
          )
      )}
      <span onClick={onClickNextPage}>
        <RightOutlined />
      </span>
    </div>
  );
}
