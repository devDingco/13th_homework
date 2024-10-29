import { ISearchParams } from "@/app/_store/boards/store";
import { FetchBoardsQuery } from "@/commons/gql/graphql";

export interface IBoardsListProps {
  data?: FetchBoardsQuery;
  refetchBoards: (searchParams: ISearchParams) => void;
}
