"use client";
import { useMutation, gql } from "@apollo/client";

const CREATE_PRODUCT = gql`
  mutation createProduct(
    $seller: String
    $createProductInput: CreateProductInput!
  ) {
    createProduct(seller: $seller, createProductInput: $createProductInput) {
      _id
      number
      message
    }
  }
`;

export default function GraphQlMutationPage() {
  const [나의함수] = useMutation(CREATE_PRODUCT);

  const onClickRequest = async () => {
    // useMutation Hook을 이용해 graphql mutation을 요청하는 코드
    const result = await 나의함수({
      variables: {
        seller: "mirajo",
        createProductInput: {
          name: "상품이름",
          detail: "상품설명",
          price: 10000,
        },
      },
    });
    console.log(result);
  };

  // return <button>graphql api 요청하기</button>;
  return (
    <div className="flex gap-3">
      <button className="btn" onClick={onClickRequest}>
        graphql api 요청하기
      </button>
    </div>
  );
}
