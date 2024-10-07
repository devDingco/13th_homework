import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { ObjectId } from 'mongodb';

@Entity()
@ObjectType()
export class BoardIdCounter {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    @Field()
    board: string;

    @Column()
    @Field(() => Int)
    boardId: number;
}
