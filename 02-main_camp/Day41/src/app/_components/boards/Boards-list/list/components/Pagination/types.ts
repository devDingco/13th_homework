import { ISearchParams } from "@/app/_store/boards/store";
import { FetchBoardsCountQuery } from "@/commons/gql/graphql";

export interface IPaginationProps {
  boardsCount: FetchBoardsCountQuery | undefined;
  refetchBoards: (searchParams: ISearchParams, page: number) => void;
}
