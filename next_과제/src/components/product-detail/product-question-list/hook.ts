import { FetchTravelproductQuestionsDocument } from "@/commons/graphql/graphql";
import { useMyProductCheck } from "@/commons/stores/my-product-check-store";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFetchMore } from "@/commons/hooks/useFetchMore";

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
  }, [data]);

  // 더보기 처리 함수
  const { fetchMoreData } = useFetchMore({
    data,
    dataKey: "fetchTravelproductQuestions",
    fetchMore,
    setHasMore,
  });

  return {
    data,
    error,
    loading,
    fetchMoreData,
    hasMore,
    myProductCheck,
  };
};
