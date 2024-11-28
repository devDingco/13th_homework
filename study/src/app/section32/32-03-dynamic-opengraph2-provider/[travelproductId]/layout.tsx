"use client";

import { useParams } from "next/navigation";
import { gql, useQuery } from "@apollo/client";

const FETCH_TRAVEL_PRODUCT = gql`
  query fetchTravelproduct($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
      _id
      name
      remarks
      images
    }
  }
`;

export default function OpenGraphProviderLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. useParams로 주소에서 입력한 정보(상품ID)를 가져온다.
  const { travelproductId } = useParams();

  // 2. 상품ID를 가지고 상품 정보를 가져온다.
  const { data } = useQuery(FETCH_TRAVEL_PRODUCT, {
    variables: { travelproductId },
  });

  // 3. 상품 정보를 가지고 메타데이터를 만든다.
  return (
    <>
      <meta property="og:title" content={data?.fetchTravelproduct?.name} />
      <meta
        property="og:description"
        content={data?.fetchTravelproduct?.remarks}
      />
      <meta
        property="og:image"
        content={data?.fetchTravelproduct?.images?.[0]}
      />
      {children}
    </>
  );
}
