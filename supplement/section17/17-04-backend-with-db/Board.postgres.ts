// entities 만들어주기 _ 새로운 타입스크립트파일을 만들어 주세요
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// @ -> 데코레이터(타입 오알엠에게 테이블임을 알려줍니다. 데코레이터는 함수입니다.)
@Entity()
export class Board {
  // PrimaryGeneratedColumn: 자동으로 생성되는 번호

  // increment: 1씩 증가하는 번호
  // uuid: 랜덤한 스크링
  // rowid
  // indentity

  @PrimaryGeneratedColumn("increment")
  id!: number;

  // Column: 컬럼을 만들어줍니다.
  @Column({ type: "text" })
  writer!: string;

  @Column({ type: "text" })
  title!: string;

  @Column({ type: "text" })
  contents!: string;

  // 없어도 되는것은 writer?: string; 이렇게 해주면 됩니다.
}
