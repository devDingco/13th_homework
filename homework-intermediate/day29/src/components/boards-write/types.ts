import { FetchBoardQuery } from 'commons/graphql/graphql';

export interface IBoardWriteProps {
  isEdit: boolean;
  data?: FetchBoardQuery;
}
