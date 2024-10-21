import { ApolloQueryResult, OperationVariables } from "@apollo/client";

export interface IPaginationProps {
  refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>;
  lastPage: number;
}
