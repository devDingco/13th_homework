import { FetchTravelproductQuestionsDocument } from "@/commons/graphql/graphql";
import { useMyProductCheck } from "@/commons/stores/my-product-check-store";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useQuestionList = () => {
  const { productId }: { productId: string } = useParams();
  const { myProductCheck } = useMyProductCheck();

  // 질문 목록 조회
  const { data, error, loading, fetchMore } = useQuery(
    FetchTravelproductQuestionsDocument,
    { variables: { travelproductId: productId } }
  );

  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setHasMore(true);
  }, []);

  const fetchMoreData = async () => {
    if (!data) return;
    await fetchMore({
      variables: {
        page:
          Math.ceil((data.fetchTravelproductQuestions.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchTravelproductQuestions?.length) {
          setHasMore(false);
          return prev;
        }
        return {
          fetchTravelproductQuestions: [
            ...prev.fetchTravelproductQuestions,
            ...fetchMoreResult.fetchTravelproductQuestions,
          ],
        };
      },
    });
  };

  return {
    data,
    error,
    loading,
    fetchMoreData,
    hasMore,
    myProductCheck,
  };
};
