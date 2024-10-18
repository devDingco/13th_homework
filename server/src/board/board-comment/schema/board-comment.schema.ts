import { Field, ID, ObjectType } from '@nestjs/graphql';

import { ObjectId } from 'typeorm';

@ObjectType()
export class BoardCommentSchema {
    @Field(() => ID)
    _id: ObjectId;

    @Field()
    author: string;

    @Field()
    content: string;

    @Field({ nullable: true })
    rating?: number;

    @Field({ nullable: true })
    parentId?: string;

    @Field()
    password: string;

    @Field()
    boardId: number;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;
}
