// "use client";
import { GraphQLClient } from "graphql-request";
import { gql } from "@apollo/client";

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

export default async function OpenGraphProviderLayoutPage({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { travelproductId: string };
}) {
  // 1. useParams로 주소에서 입력한 정보(상품ID)를 가져온다.
  // const { travelproductId } = useParams();

  // 2. 상품ID를 가지고 상품 정보를 가져온다.
  const graphQlClient = new GraphQLClient(
    "https://main-practice.codebootcamp.co.kr/graphql"
  );
  const data: {
    fetchTravelproduct: { name: string; remarks: string; images: string[] };
  } = await graphQlClient.request(FETCH_TRAVEL_PRODUCT, {
    travelproductId: params.travelproductId,
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
