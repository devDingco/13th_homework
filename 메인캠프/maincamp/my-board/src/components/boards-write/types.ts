import { FetchBoardQuery } from '@/commons/graphql/graphql';

export interface IBoardWrite {
  isEdit: boolean;

  data?: FetchBoardQuery;
}
