import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class UpdateBoardCommentInput {
    @Field()
    content: string;

    @Field(() => Int, { nullable: true })
    @Min(1)
    @Max(5)
    rating?: number;

    @Field()
    password: string;
}
