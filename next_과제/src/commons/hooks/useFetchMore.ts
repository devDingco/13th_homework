import {
  FetchBoardCommentsQuery,
  FetchTravelproductQuestionsQuery,
} from "@/commons/graphql/graphql";
import { ApolloQueryResult, FetchMoreQueryOptions } from "@apollo/client";

type fetchDataType = FetchBoardCommentsQuery | FetchTravelproductQuestionsQuery;

interface IUseFetchMoreData<T> {
  data: T | undefined;
  dataKey: keyof T;
  fetchMore: (
    options: FetchMoreQueryOptions<{ page: number }, T> & {
      updateQuery: (
        previousQueryResult: T,
        options: { fetchMoreResult?: T }
      ) => T;
    }
  ) => Promise<ApolloQueryResult<T>>;
  setHasMore: (hasMore: boolean) => void;
}

export const useFetchMore = <T extends fetchDataType>({
  data,
  dataKey,
  fetchMore,
  setHasMore,
}: IUseFetchMoreData<T>) => {
  const fetchMoreData = async () => {
    if (!data) return;
    const dataSet = data[dataKey] as Array<T>;
    await fetchMore({
      variables: {
        page: Math.ceil((dataSet.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        const fetchMoreResultData = fetchMoreResult?.[dataKey] as Array<T>;
        if (!fetchMoreResultData?.length) {
          setHasMore(false);
          return prev;
        }
        return {
          ...prev,
          [dataKey]: [
            ...(prev[dataKey] as Array<T>),
            ...(fetchMoreResult?.[dataKey] as Array<T>),
          ],
        };
      },
    });
  };
  return { fetchMoreData };
};

// const fetchMoreData = async () => {
//   if (!data) return;
//   await fetchMore({
//     variables: {
//       page: Math.ceil((data.fetchBoardComments.length ?? 10) / 10) + 1,
//     },
//     updateQuery: (prev, { fetchMoreResult }) => {
//       if (!fetchMoreResult.fetchBoardComments?.length) {
//         setHasMore(false);
//         return prev;
//       }
//       return {
//         fetchBoardComments: [
//           ...prev.fetchBoardComments,
//           ...fetchMoreResult.fetchBoardComments,
//         ],
//       };
//     },
//   });
// };
