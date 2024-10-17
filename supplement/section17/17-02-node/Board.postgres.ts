// entities 만들어주기 _ 새로운 타입스크립트파일을 만들어 주세요
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// @ -> 데코레이터(타입 오알엠에게 테이블임을 알려줍니다. 데코레이터는 함수입니다.)
@Entity()
export class Board {
  // PrimaryGeneratedColumn: 자동으로 생성되는 번호
  @PrimaryGeneratedColumn("increment")
  id!: number;

  // Column: 컬럼을 만들어줍니다.
  @Column({ type: "text" })
  writer!: string;

  @Column({ type: "text" })
  title!: string;

  @Column({ type: "text" })
  contents!: string;
}
