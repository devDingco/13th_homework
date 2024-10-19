// entities 만들어주기 _ 새로운 타입스크립트파일을 만들어 주세요
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

// @ -> 데코레이터(타입 오알엠에게 테이블임을 알려줍니다. 데코레이터는 함수입니다.)
@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  productId!: string;

  @Column({ type: "text" })
  seller!: string;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text" })
  detail!: string;

  @Column({ type: "int" })
  price!: number;

  @Column({ type: "date" })
  createdAt!: Date;

  @Column({ type: "date" })
  updatedAt!: Date;

  @Column({ type: "date" })
  deletedAt!: Date;
}
