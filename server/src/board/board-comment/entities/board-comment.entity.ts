import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ObjectIdColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { CreateBoardCommentDto } from '../dto/create-board-comment.dto';
import { ObjectId } from 'mongodb';

@Entity()
@ObjectType()
export class BoardComment extends CreateBoardCommentDto {
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

    @DeleteDateColumn()
    @Field(() => Date)
    deletedAt?: Date;
}
