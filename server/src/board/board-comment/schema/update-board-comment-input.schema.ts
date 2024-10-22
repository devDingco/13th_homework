import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateBoardCommentInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    content: string;

    @Field(() => Int, { nullable: true })
    @IsNumber()
    @IsOptional()
    rating?: number;

    @Field()
    @IsString()
    @IsOptional()
    password: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    parentId?: string;
}
