import { useMutation } from "@apollo/client";
// import { TOGGLE_TRAVEL_PRODUCT_PICK } from "./queries";
// import { FETCH_TRAVEL_PRODUCTS_OF_THE_BEST } from "@/components/product-recommended/queries";
import {
  ToggleTravelproductPickDocument,
  FetchTravelproductsOfTheBestDocument,
  FetchTravelproductDetailDocument,
  FetchTravelproductsDocument,
} from "@/commons/graphql/graphql";
import { useAccessTokenStore } from "@/commons/stores/access-token";
import { useLoadStore } from "@/commons/stores/load-store";

export const usePickedBtn = () => {
  const [productPick] = useMutation(ToggleTravelproductPickDocument);
  const { accessToken } = useAccessTokenStore();
  const { isLoaded } = useLoadStore();
  //! 상품 북마크 토글
  const onClickProductPick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    travelproductId: string
  ) => {
    e.preventDefault();
    // 로그인을 하지 않은 경우
    if (!accessToken && isLoaded) {
      alert("북마크 하려면 로그인이 필요합니다.");
      return;
    }

    try {
      const result = await productPick({
        variables: { travelproductId },
        refetchQueries: [
          { query: FetchTravelproductsOfTheBestDocument },
          {
            query: FetchTravelproductDetailDocument,
            variables: { travelproductId },
          },
          { query: FetchTravelproductsDocument },
        ],
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    onClickProductPick,
  };
};
