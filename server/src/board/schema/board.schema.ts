import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { BoardAddressOutput } from './board-address-input.schema';
import { ObjectId } from 'typeorm';

@ObjectType()
export class BoardSchema {
    @Field(() => ID)
    _id: ObjectId;

    @Field()
    author: string;

    @Field()
    password: string;

    @Field()
    title: string;

    @Field()
    content: string;

    @Field(() => [String], { nullable: true })
    imageUrl?: string[];

    @Field({ nullable: true })
    youtubeUrl?: string;

    @Field(() => BoardAddressOutput, { nullable: true })
    BoardAddressOutput?: BoardAddressOutput;

    @Field(() => Int)
    boardId: number;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;
}
