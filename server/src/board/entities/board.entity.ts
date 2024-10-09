import {
    Column,
    CreateDateColumn,
    Entity,
    ObjectId,
    ObjectIdColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { CreateBoardDto } from '../dto/create-board.dto';

@Entity()
@ObjectType()
export class Board extends CreateBoardDto {
    @ObjectIdColumn()
    @Field(() => ID)
    _id: ObjectId;

    @Column()
    @Field(() => Int)
    boardId: number;

    @CreateDateColumn()
    @Field(() => Date)
    createdAt: Date;

    @UpdateDateColumn()
    @Field(() => Date)
    updatedAt: Date;
}
