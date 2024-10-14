import Image from "next/image";
import { MouseEvent, useState } from "react";
import styles from "./styles.module.css";
import { ApolloQueryResult, useQuery } from "@apollo/client";
import {
  Exact,
  FetchBoardsCountDocument,
  FetchBoardsQuery,
  InputMaybe,
} from "@/commons/gql/graphql";

interface IPaginationProps {
  refetch: (
    variables?:
      | Partial<
          Exact<{
            page?: InputMaybe<number> | undefined;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<FetchBoardsQuery>>;
}

export default function Pagination(props: IPaginationProps) {
  const [startPage, setStartPage] = useState(1);
  const [selectedPage, setSelectedPage] = useState("");
  const { data: boardsCount } = useQuery(FetchBoardsCountDocument);
  const lastPage = Math.ceil((boardsCount?.fetchBoardsCount ?? 10) / 10);
  const hasNextPage = startPage + 5 <= lastPage;

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    setSelectedPage(event.currentTarget.id);
    props.refetch({ page: Number(event.currentTarget.id) });
  };

  const onClickPrevPage = (event: MouseEvent<HTMLSpanElement>) => {
    if (startPage === 1) return;

    setStartPage(startPage - 5);
    setSelectedPage(String(startPage - 5));
    props.refetch({ page: startPage - 5 });
  };

  const onClickNextPage = (event: MouseEvent<HTMLSpanElement>) => {
    if (startPage + 5 <= lastPage) {
      setStartPage(startPage + 5);
      setSelectedPage(String(startPage + 5));
      props.refetch({ page: startPage + 5 });
      return;
    }
  };

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
