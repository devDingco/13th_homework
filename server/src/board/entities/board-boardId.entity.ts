import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { ObjectId } from 'mongodb';

@Entity()
@ObjectType()
export class BoardIdCounter {
    @ObjectIdColumn()
    @Field(() => ID)
    _id: ObjectId;

    @Column()
    @Field()
    board: string;

    @Column()
    @Field(() => Int)
    boardId: number;
}
