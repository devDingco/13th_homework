import { DataSource } from "typeorm";
import { Product } from "./Board.postgres";

import { ApolloServer } from "@apollo/server"; // preserve-line
import { startStandaloneServer } from "@apollo/server/standalone"; // preserve-line

console.log("백엔드 프로그램을 실행합니다!!!");
console.log("====================================s");

console.log("여기서 API를 만들거에요!!!");

const typeDefs = `#graphql

  input UpdateProductInput {
    name: String
    detail: String
    price: Int
  }

  input CreatedProductInput {
    name: String
    detail: String
    price: Int
  }

  type ProductReturn {
    productId: ID!
    seller: String
    name: String
    detail: String
    price: Int
    createdAt: Date
  }

  scalar Date # Date 타입을 정의합니다.

  type Return {
    id: ID
    message: String
  }

  type Query {
    fetchProduct(productId: ID): ProductReturn
    fetchProducts(page: Int): [ProductReturn!]
  }

  type Mutation {
    createProduct(seller: String, createProductInput: CreatedProductInput!): Return
    updateProduct(productId: ID, updateProductInput: UpdateProductInput!): Return
    deleteProduct(productId: ID): Return
  }
`;

// 2. API 구현하기
const resolvers = {
  // * Query: 조회
  Query: {
    fetchProducts: async (parent: any, args: any, context: any, info: any) => {
      try {
        const result = await Product.find(args.page);
        console.log("상품 목록 조회: ", result);
        return result;
      } catch (error) {
        console.error("상품 목록 조회 실패: ", error);
        throw new Error("상품 목록 조회 실패");
      }
    },
    fetchProduct: async (parent: any, args: any, context: any, info: any) => {
      try {
        const result = await Product.findOne({
          where: { productId: args.productId },
        });
        console.log("상품 상세 조회: ", result);
        return result;
      } catch (error) {
        console.error("상품 상세 조회 실패: ", error);
        throw new Error("상품 상세 조회 실패");
      }
    },
  },
  // * Mutation: 변경
  Mutation: {
    createProduct: async (parent: any, args: any, context: any, info: any) => {
      try {
        const result = await Product.insert({
          seller: args.seller,
          ...args.createProductInput,
        });
        return {
          id: result.identifiers[0].id,
          message: "상품이 성공적으로 등록되었습니다.",
        };
      } catch (error) {
        console.error("상품 등록 실패: ", error);
        throw new Error("상품 등록 실패");
      }
    },
    updateProduct: async (parent: any, args: any, context: any, info: any) => {
      try {
        await Product.update(
          { productId: args.productId },
          { ...args.updateProductInput }
        );
        return {
          id: args.productId,
          message: "상품이 성공적으로 수정되었습니다.",
        };
      } catch (error) {
        console.error("상품 수정 실패: ", error);
        throw new Error("상품 수정 실패");
      }
    },
    deleteProduct: async (parent: any, args: any, context: any, info: any) => {
      try {
        await Product.update(
          { productId: args.productId },
          { deletedAt: new Date() }
        );
        return {
          id: args.productId,
          message: "상품이 성공적으로 삭제되었습니다.",
        };
      } catch (error) {
        console.error("상품 삭제 실패: ", error);
        throw new Error("상품 삭제 실패");
      }
    },
  },
};

// 3. API-DOCS와 API를 그룹핑한 아폴로 서버 만들기
// 위에 선언한 변수명이 일치하면 하나로 묶어줄수 있음 (typeDefs, resolvers)
// 만약 위에서 선언한 변수명이 다르다면 { typeDefs: 내가작성한독스명, resolvers: 내가작성한API명 }
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

console.log("====================================");

console.log("DB접속하고, 테이블을 만들어요!!!");
const AppDataSource = new DataSource({
  type: "postgres", // DB의 종류
  host: "34.64.38.113", // DB가 있는 컴퓨터의 IP 주소
  port: 5025, // DB가 있는 컴퓨터의 port
  username: "postgres", // DB의 유저 이름
  password: "postgres2022", // DB 비밀번호
  database: "postgres", // DB의 이름
  synchronize: true, // DB에 없는 테이블을 생성해줍니다.
  logging: true, // 로그를 확인할 수 있게 해줍니다.
  entities: [Product], // DB에 있는 테이블을 만들어줍니다.
});

// DB접속을 시도합니다. 접속을 성공하면 성공 메시지를 출력하고, 실패하면 실패 메시지를 출력합니다.
AppDataSource.initialize()
  .then(() => {
    console.log("DB접속에 성공했습니다!!! 동기화 할께요!!!");

    // 4. 최종 완성된 아폴로서버 실행시키기 (리스팅하기 -> 대기하기)
    // startStandaloneServer: 아폴로 서버를 실행시키는 함수
    // server: 아폴로 서버가 실행될 때 필요한 정보들이 담긴 변수 (위에서 작성한 내용들)
    startStandaloneServer(server, {
      listen: { port: 4000 },
    }).then(() => {
      console.log("서버가 가동되었습니다.");
    });
  })
  .catch((error) => {
    console.log("DB접속에 실패했습니다!!!");
    console.log("원인: ", error);
  });
