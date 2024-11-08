import { Field, Int, ObjectType } from '@nestjs/graphql';

import { BoardAddressOutput } from './board-address-input.schema';

@ObjectType()
export class BoardSchema {
    @Field()
    author: string;

    @Field()
    title: string;

    @Field()
    content: string;

    @Field(() => [String], { nullable: true })
    imageUrl?: string[];

    @Field({ nullable: true })
    youtubeUrl?: string;

    @Field(() => BoardAddressOutput, { nullable: true })
    boardAddressOutput?: BoardAddressOutput;

    @Field(() => Int)
    boardId: number;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;
}
