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
  # * 경우에 따라서 입력값의 경우 input으로 만든다.
  input CreateBoardInput {
    writer: String
    title: String
    contents: String
  }

  # * type 으로 시작
  type MyBoard {
    id: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
    fetchBoards: [MyBoard]
  }

  type Mutation {
    # 연습용(main-example)으로 만들어진 API입니다.
    # createBoard(writer: String, title: String, contents: String): String!

    # 실무용(main-practice) 방식으로 만들어진 API입니다.
    createBoard(createBoardInput: CreateBoardInput!): String!
  }
`;

// 2. API 구현하기
const resolvers = {
  // * Query: 조회
  Query: {
    fetchBoards: async () => {
      // 1. 모두 꺼내기
      const result = await Board.find();
      return result;

      // 2. 한개만 꺼내기
      // const result = await Board.findOne({
      //   where: { number: 3 },
      // });
    },
  },
  // * Mutation: 변경
  Mutation: {
    // parent: 부모 객체, args: 전달인자, context: 컨텍스트, info: 정보
    createBoard: async (parent: any, args: any, context: any, info: any) => {
      await Board.insert({
        ...args.createBoardInput,

        // writer: args.createBoardInput.writer,
        // title: args.createBoardInput.title,
        // contents: args.createBoardInput.contents,
      });
      return "게시글이 성공적으로 등록되었습니다.";
    },

    // updateBoard: async (parent: any, args: any, context: any, info: any) => {
    // await Board.update({ id: 1 }, { title: "수정된 제목입니다." });
    // },

    // deleteBoard: async() => {
    // await Board.delete({ id: 1 }); -> 이렇게 하면 안됩니다. 진짜로 지우는 것이기 때문에
    // await Board.update({ id: 1 }, { isDeleted: true }); -> 이렇게 하면 됩니다. 지우는 척하기 (soft delete)
    // await Board.update({ id: 1 }, { isDeleted: true }, { deletedAt: new Date() }); // -> 이렇게 하면 유저가 삭제한 시간을 기록할 수 있습니다.
    // await Board.softRemove() // 내장 소프트 딜리트 함수
    // },
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
