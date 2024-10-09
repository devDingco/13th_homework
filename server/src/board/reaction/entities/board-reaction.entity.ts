import {
    Column,
    CreateDateColumn,
    Entity,
    ObjectIdColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { ObjectId } from 'mongodb';

@Entity()
@ObjectType()
export class BoardReaction {
    @ObjectIdColumn()
    @Field(() => ID)
    _id: ObjectId;

    @Column()
    @Field(() => Int)
    boardId: number;

    @Column({ default: 0 })
    @Field(() => Int)
    like: number;

    @Column({ default: 0 })
    @Field(() => Int)
    hate: number;

    @CreateDateColumn()
    @Field(() => Date)
    createdAt: Date;

    @UpdateDateColumn()
    @Field(() => Date)
    updatedAt: Date;
}
