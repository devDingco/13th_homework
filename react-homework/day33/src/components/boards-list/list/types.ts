import { FetchBoardsQuery } from "@/commons/graphql/graphql";

export interface IListProps {
  // 앞에 물음표 붙여도 똑같음
  data: FetchBoardsQuery | undefined;
}
