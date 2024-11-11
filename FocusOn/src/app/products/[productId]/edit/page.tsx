"use client";

import { FetchTravelproductDocument } from "@/commons/graphql/graphql";
import { withAuth } from "@/commons/hocs/withAuth";
import ProductsWrite from "@/components/products-write";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

const ProductsEditPage = () => {
  const params = useParams();
  const productId = params.productId as string;
  const { data } = useQuery(FetchTravelproductDocument, {
    variables: { productId },
  });
  return <ProductsWrite isEdit={true} data={data} />;
};
export default withAuth(ProductsEditPage);
