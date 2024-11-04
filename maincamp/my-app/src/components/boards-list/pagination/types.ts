// import { ApolloQueryResult, OperationVariables } from "@apollo/client";

import { FetchBoardsQuery } from "@/commons/graphql/graphql";


// export interface IPagiNationProps {
//     refetch: (
//         variables?: Partial<OperationVariables> | undefined
//     ) => Promise<ApolloQueryResult<any>>;
//     lastPage: number;
// }

export interface IPaginationProps {
  page: number;
  setPage: (page: number) => void;
  refetch: () => void;
  data: FetchBoardsQuery | undefined;
}
