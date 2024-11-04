import { FetchUserLoggedInDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";

export const useMyPageInfo = () => {
  // 내 정보 조회
  const { data: fetchUserData } = useQuery(FetchUserLoggedInDocument);
  const data = fetchUserData?.fetchUserLoggedIn;

  return {
    data,
  };
};
