import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn("identity")
  id!: number;

  @Column({ type: "text" })
  writer!: string;

  @Column({ type: "text" })
  title!: string;

  @Column({ type: "text" })
  contents!: string;

  // 있어도 없어도 되는건 => contents?: string

  //BaseEntity로부터 find등을 상속받자!
  // power!: number;
  // attack() {}
  // find() {}
}
