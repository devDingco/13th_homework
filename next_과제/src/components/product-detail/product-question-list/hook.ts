// import {
//   FETCH_TRAVEL_PRODUCT_QUESTIONS,
//   FETCH_TRAVEL_PRODUCT_OF_MINE,
//   FETCH_TRAVEL_PRODUCT_SELLER_ID,
// } from "./queries";

import {
  FetchTravelproductQuestionsDocument,
  FetchTravelproductOfMineDocument,
  FetchTravelproductSellerIdDocument,
} from "@/commons/graphql/graphql";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useQuestionList = ({ sellerId }: { sellerId: string }) => {
  const { productId }: { productId: string } = useParams();
  const [reply, setReply] = useState(false);

  // 내 상품인지 확인용 로그인한 유저의 ID 조회
  const { data: fetchUserData } = useQuery(FetchTravelproductOfMineDocument);
  const loggedUserId = fetchUserData?.fetchUserLoggedIn?._id;

  useEffect(() => {
    if (loggedUserId === sellerId) {
      setReply(true);
    }
  }, [loggedUserId, sellerId]);

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
    reply,
  };
};
