import { usePagination } from "./hook";
import { useState } from "react";
import { IPaginationProps } from "./types";

export default function Pagination(props: IPaginationProps) {
  const [startPage, setStartPage] = useState(1);
  const { lastPage } = props;

  const { onClickPage, prevPage, nextPage } = usePagination({
    startPage,
    setStartPage,
    refetch: props.refetch,
  });

  return (
    <div className="flex gap-5 justify-center my-5">
      {startPage !== 1 && (
        <button className="text-2xl" onClick={() => prevPage()}>
          ⇇
        </button>
      )}
      {/* {startPage !== 1 && (
      <button className="text-2xl" onClick={() => prevPage(1)}>
        ←
      </button>
    )} */}

      {Array.from({ length: 10 }).map(
        (_, index) =>
          startPage + index <= lastPage && (
            <button
              className={`paginationBtn w-7 h-7 rounded-xl ${
                index === 0 && "bg-blue-300"
              }`}
              key={index + startPage}
              id={String(index + startPage)}
              onClick={(e) => onClickPage(e)}
            >
              {index + startPage}
            </button>
          )
      )}
      {/* <button className="text-2xl" onClick={() => nextPage(1)}>
      →
    </button> */}
      {startPage + 10 <= lastPage && (
        <button className="text-2xl" onClick={() => nextPage()}>
          ⇉
        </button>
      )}
    </div>
  );
}
