import { DataSource } from "typeorm";
import { Board } from "./Board.postgres";

import { ApolloServer } from "@apollo/server"; // preserve-line
import { startStandaloneServer } from "@apollo/server/standalone"; // preserve-line

console.log("백엔드 프로그램을 실행합니다!!!");
console.log("====================================s");

console.log("여기서 API를 만들거에요!!!");
// 1. API-DOCS 만들기 - graphql의 타입 작성 규칙에 맞춰서 작성한다.
// []: 배열(리스트), {}: 객체, !: 필수값, String: 문자열, Int: 정수
const typeDefs = `#graphql
  type MyBoard {
    number: Int
    writer: String
    title: String
    content: String
  }
  type Query {
    fetchBoards: [MyBoard]
  }
  type Mutation {
    createBoard(writer: String, title: String, content: String): String!
  }
`;

// 2. API 구현하기
const resolvers = {
  // Query: 조회
  Query: {
    fetchBoards: () => {
      return [
        {
          number: 1,
          writer: "철수",
          title: "안녕하세요",
          content: "반갑습니다.",
        },
        // ... 더 많은 게시글을 리턴할 수 있습니다.
      ];
    },
  },
  // Mutation: 변경
  Mutation: {
    // parent: 부모 객체, args: 전달인자, context: 컨텍스트, info: 정보
    createBoard: (parent: any, args: any, context: any, info: any) => {
      console.log("작성자 : ", args.writer);
      console.log("제목 : ", args.title);
      console.log("내용 : ", args.content);
      return "게시글이 성공적으로 등록되었습니다.";
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
  entities: [Board], // DB에 있는 테이블을 만들어줍니다.
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
