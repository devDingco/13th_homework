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
  // const { data, refetch } = useQuery<FetchBoardsQuery>(FetchBoardsDocument);
  // const { data: dataBoardsCount } = useQuery(FetchBoardsCountDocument);
  // const { keyword } = useSearchComponent();

  // const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);

  // console.log(data);

  // // data가 있을 때 첫 번째 게시물의 _id를 가져오고, 만약 data나 첫 번째 게시물이 없으면 빈 문자열 ""을 boardId에 넣는다는 의미
  // // => 게시물이 있을 때는 그 게시물의 ID를 사용하고, 게시물이 없으면 그냥 빈 문자열을 넣어주는 안전한 방법
  // // const boardId = data?.fetchBoards[0]?._id || "";

  // return (
  //   <>
  //     <SearchComponent refetch={refetch} />
  //     <BoardList isEdit={false} data={data} keyword={keyword} />
  //     <PaginationPage refetch={refetch} lastPage={lastPage} />
  //   </>
  // );

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
