import { DataSource } from "typeorm";
import { Board } from "./Board.postgres";

console.log("백엔드 프로그램을 실행합니다!!!");
console.log("====================================s");

console.log("여기서 API를 만들거에요!!!");

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
  })
  .catch((error) => {
    console.log("DB접속에 실패했습니다!!!");
    console.log("원인: ", error);
  });
