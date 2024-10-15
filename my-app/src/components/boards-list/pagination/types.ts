import { Exact, InputMaybe, Scalars } from "@/commons/gql/graphql";
import { ApolloQueryResult } from "@apollo/client";

export interface IpaginationProps {
  refetch: (
    variables?:
      | Partial<
          Exact<{
            mypage?: InputMaybe<Scalars["Int"]["input"]>;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<any>>;

  lastPage: number;
}
