"use client";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { FetchTravelproductDocument } from "@/commons/graphql/graphql";
import ProductRegist from "@/components/product-wrtie";

export default function ProductEditPage() {
  const params = useParams();
  console.log(params.travelproductId);
  const { data } = useQuery(FetchTravelproductDocument, {
    variables: { travelproductId: params.travelproductId as string },
  });

  return <ProductRegist isEdit={true} data={data} fileRefArray={[]} />;
}
