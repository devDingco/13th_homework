import { gql } from "@apollo/client";
import { GraphQLClient } from "graphql-request";

const FETCH_TRAVELPRODUCT = gql`
  query fetchTravelproduct($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
      _id
      name
      remarks
      images
    }
  }
`;

export default async function OpengraphProviderLayout({ children, params }) {
  // 1. useParams로 travelproductId 가져오기
  // const params = useParams();
  // const travelproductId = params.travelproductId;

  // 2. travelproductId로 조회하기 << useQuery
  // const { data } = useQuery(FETCH_TRAVELPRODUCT, {
  //   variables: { travelproductId },
  // });
  const graphQLClient = new GraphQLClient(
    "https://main-practice.codebootcamp.co.kr/graphql"
  );
  const data = await graphQLClient.request(FETCH_TRAVELPRODUCT, {
    travelproductId: params.travelproductId,
  });

  // 3. data로 <meta /> 바꾸기

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
      <>{children}</>
    </>
  );
}
