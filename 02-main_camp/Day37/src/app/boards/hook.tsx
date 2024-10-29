import {
  FetchBoardsCountDocument,
  FetchBoardsDocument,
} from "@/commons/gql/graphql";
import { useQuery } from "@apollo/client";
import { ISearchParams, useSearchStore } from "../_store/boards/store";

export const useBoards = () => {
  const { searchParams } = useSearchStore();
  const { data: boards, refetch: _refetchBoards } = useQuery(
    FetchBoardsDocument,
    {
      variables: {
        search: searchParams.keyword,
        startDate: searchParams.startDate,
        endDate: searchParams.endDate,
      },
    }
  );

  const { data: boardsCount } = useQuery(FetchBoardsCountDocument, {
    variables: {
      search: searchParams.keyword,
      startDate: searchParams.startDate,
      endDate: searchParams.endDate,
    },
  });

  const refetchBoards = (searchParams: ISearchParams, page?: number) => {
    console.log("게시글 목록을 다시 가져옵니다.", searchParams);
    _refetchBoards({
      search: searchParams.keyword,
      startDate: searchParams.startDate,
      endDate: searchParams.endDate,
      page: page ?? 1,
    });
  };

  return { boards, boardsCount, refetchBoards };
};
