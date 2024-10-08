import { FetchBoardQuery } from "@/commons/gql/graphql";

export interface IBoardWriteInput {
  isEdit: boolean;
  data?: FetchBoardQuery | undefined;
}
