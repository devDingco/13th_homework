import { useMutation } from "@apollo/client";
import { TOGGLE_TRAVEL_PRODUCT_PICK } from "./queries";
import { FETCH_TRAVEL_PRODUCTS_OF_THE_BEST } from "@/components/product-recommended/queries";

export const usePickedBtn = () => {
  const [productPick] = useMutation(TOGGLE_TRAVEL_PRODUCT_PICK);
  //! 상품 북마크 토글
  const onClickProductPick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    travelproductId: string
  ) => {
    e.preventDefault();
    console.log("북마크 클릭");
    try {
      await productPick({
        variables: { travelproductId },
        refetchQueries: [{ query: FETCH_TRAVEL_PRODUCTS_OF_THE_BEST }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    onClickProductPick,
  };
};
