import { Travelproduct } from "@/commons/graphql/graphql";
import { useParams } from "next/navigation";
// import { FETCH_PRODUCT_DETAIL } from "./queries";
import { FetchTravelproductDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";

export const useProductDetail = () => {
  const { productId }: { productId: string } = useParams();
  const { data: travelproductData } = useQuery(FetchTravelproductDocument, {
    variables: { travelproductId: productId },
  });

  const data = travelproductData?.fetchTravelproduct as Travelproduct;

  return {
    productId,
    data,
  };
};
