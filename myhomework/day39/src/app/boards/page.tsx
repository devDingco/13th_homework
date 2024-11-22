"use client";

import {
  FetchBoardsCountDocument,
  FetchBoardsDocument,
  FetchBoardsQuery,
} from "@/commons/graphql/graphql";
import BoardList from "@/components/boards-list/list";
import PaginationPage from "@/components/boards-list/pagination";
import SearchComponent from "@/components/boards-list/search";
import { useSearchComponent } from "@/components/boards-list/search/hook";
import { useQuery } from "@apollo/client";

export default function BoardListPage() {
  const { data, refetch } = useQuery<FetchBoardsQuery>(FetchBoardsDocument, {
    variables: { page: 1 }, // 초기 페이지 설정
  });
  const { data: dataBoardsCount } = useQuery(FetchBoardsCountDocument);
  const { keyword } = useSearchComponent();

  // 검색된 게시글 개수 계산
  const searchedBoardsCount = data?.fetchBoards.length || 0;
  const totalBoardsCount = keyword
    ? searchedBoardsCount
    : dataBoardsCount?.fetchBoardsCount ?? 10;

  // 마지막 페이지 계산
  const lastPage = Math.ceil(totalBoardsCount / 10);

  console.log("Total boards count:", totalBoardsCount);
  console.log("Last page:", lastPage);

  return (
    <>
      <SearchComponent refetch={refetch} />
      <BoardList isEdit={false} data={data} keyword={keyword} />
      <PaginationPage refetch={refetch} lastPage={lastPage} />
    </>
  );
}
