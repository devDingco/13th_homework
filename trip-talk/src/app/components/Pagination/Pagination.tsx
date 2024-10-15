import usePagination from "../../../commons/hooks/usePagination";
import { IPagination } from "../../../types/components.type";

export default function Pagination(props: IPagination) {
  const { startPage, onClickPage, onClickPrevPage, onClickNextPage } =
    usePagination(props);
  return (
    <>
      <span onClick={onClickPrevPage}>prev</span>
      {new Array(10).fill(1).map(
        (_, index) =>
          index + startPage <= props.lastPage && (
            <span
              key={index + startPage}
              id={String(index + startPage)}
              onClick={onClickPage}
            >
              {index + startPage}
            </span>
          )
      )}
      <span onClick={onClickNextPage}>next</span>
    </>
  );
}
