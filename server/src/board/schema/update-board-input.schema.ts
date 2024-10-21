import { Field, InputType } from '@nestjs/graphql';

import { BoardAddressInput } from './board-address-input.schema';

@InputType()
export class UpdateBoardInput {
    @Field()
    title: string;

    @Field()
    content: string;

    @Field(() => [String], { nullable: true })
    imageUrl?: string[];

    @Field({ nullable: true })
    youtubeUrl?: string;

    @Field({ nullable: true })
    BoardAddressInput: BoardAddressInput;
}
