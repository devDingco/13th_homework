import { useParams } from "next/navigation";
import { FetchTravelproductDetailDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";

export const useProductDetail = () => {
  const { productId }: { productId: string } = useParams();
  const { data: travelproductData } = useQuery(
    FetchTravelproductDetailDocument,
    {
      variables: { travelproductId: productId },
    }
  );

  const data = travelproductData?.fetchTravelproduct;

  return {
    productId,
    data,
  };
};
