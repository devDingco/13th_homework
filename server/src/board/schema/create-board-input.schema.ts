import { Field, InputType } from '@nestjs/graphql';

import { BoardAddressInput } from './board-address-input.schema';

@InputType()
export class CreateBoardInput {
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

    @Field(() => BoardAddressInput, { nullable: true })
    BoardAddressInput?: BoardAddressInput;
}
