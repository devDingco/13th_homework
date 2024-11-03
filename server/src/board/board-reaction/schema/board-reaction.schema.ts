import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { ObjectId } from 'typeorm';

@ObjectType()
export class BoardReactionSchema {
    @Field(() => ID)
    _id: ObjectId;

    @Field(() => Int)
    boardId: number;

    @Field(() => Int)
    like: number = 0;

    @Field(() => Int)
    hate: number = 0;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;
}
