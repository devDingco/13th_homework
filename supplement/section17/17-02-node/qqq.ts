import { DataSource } from "typeorm";
import { Board } from "./Board.postgres";

console.log("DB접속을 시작합니다!!!");
console.log("DB접속 중입니다!!!");

const AppDataSource = new DataSource({
  type: "postgres", // DB의 종류
  host: "34.64.38.113", // DB가 있는 컴퓨터의 IP 주소
  port: 5025, // DB가 있는 컴퓨터의 port
  username: "postgres", // DB의 유저 이름
  password: "postgres2022", // DB 비밀번호
  database: "postgres", // DB의 이름
  entities: [Board], // DB에 있는 테이블을 만들어줍니다.
  synchronize: true, // DB에 없는 테이블을 생성해줍니다.
  logging: true, // 로그를 확인할 수 있게 해줍니다.
});

AppDataSource.initialize()
  .then(() => {
    console.log("DB접속에 성공했습니다!!!");
  })
  .catch((error) => {
    console.log("DB접속에 실패했습니다!!!");
    console.log("원인: ", error);
  });
