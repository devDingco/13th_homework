import {
  Exact,
  FetchBoardsQuery,
  InputMaybe,
  Scalars,
} from '@/commons/graphql/graphql';
import { ApolloQueryResult } from '@apollo/client';

export interface IPaginationProps {
  lastPageNum: number;
  refetch: (
    variables?:
      | Partial<
          Exact<{
            page?: InputMaybe<Scalars['Int']['input']>;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<FetchBoardsQuery>>;
}

// 게시글 번호 제대로 하기 위해서 추가 생성한 인터페이스
export interface IExtraPaginationProps {
  setSelectedPage: (page: number) => void;
  lastPageNum: number;
  refetch: (
    variables?:
      | Partial<
          Exact<{
            page?: InputMaybe<Scalars['Int']['input']>;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<FetchBoardsQuery>>;
}
