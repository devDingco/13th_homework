'use client';
import { useMutation, gql } from '@apollo/client';

// 명시되어 있는 타입은 타입스크립트 타입이 아니라 GraphQL에 명시되어 있는 타입임
const CREATE_PRODUCT = gql`
  mutation createProduct($seller: String, $createProductInput: CreateProductInput!) {
    createProduct(seller: $seller, createProductInput: $createProductInput) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationPage() {
  const [나의함수] = useMutation(CREATE_PRODUCT);

  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: { // variables가 변수 앞에 $ 역할을 대신함
        seller: "나",
        createProductInput: {
          name: "키보드",
          detail: "한 번 사용함",
          price: 50000,
        },
      },
    });
    console.log(result);
  };

  // 한 줄일 때는 return 다음에 오는 괄호 생략 가능
  return <button onClick={onClickSubmit}>GRAPHQL-API 요청하기</button>;
}
