"use client";

import PerchaseWrite from "@/components/purchase/purchase-write";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

const FETCH_TRAVEL_PRODUCT = gql`
  query fetchTravelproduct($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
      _id
      name
      remarks
      contents
      tags
      price
    }
  }
`;

export default function PurchaseDetailEditPage() {
  const params = useParams();
  console.log(params);
  // travelproductId가 유효한지 검사
  const travelproductId = Array.isArray(params.purchaseId)
    ? params.purchaseId[0]
    : params.purchaseId;

  if (!travelproductId) {
    return <div>상품 ID가 없습니다. 잘못된 접근입니다.</div>;
  }

  // travelproductId가 유효한 경우에만 useQuery 실행
  const { data, loading, error } = useQuery(FETCH_TRAVEL_PRODUCT, {
    variables: { travelproductId },
  });

  // 로딩 상태 처리
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 오류 상태 처리
  if (error) {
    return <div>오류 발생: {error.message}</div>;
  }

  return (
    <>
      <div>상품 수정 페이지 입니다.</div>
      <PerchaseWrite isEdit={true} data={data} />
    </>
  );
}
