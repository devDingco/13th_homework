"use client";

import { useQuery } from "@apollo/client";
import { FETCHTRAVELPRODUCT } from "../../queires/queries";
import { useParams, useRouter } from "next/navigation";
export default function UseProductListDetail() {
  const params = useParams();
  const { data } = useQuery(FETCHTRAVELPRODUCT, {
    variables: { travelproductId: params._id },
  });
  console.log(data?.fetchTravelproduct._id);
  const router = useRouter();
  const onClickProductdetail = (id: string) => {
    router.push(`../../../product/${id}`);
    console.log(data?.fetchTravelproducts._id);
  };

  return { onClickProductdetail };
}
