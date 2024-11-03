import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateBoardCommentInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    author: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    content: string;

    @Field(() => Int, { nullable: true })
    @IsNumber()
    @IsOptional()
    rating?: number;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    parentId?: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    password: string;
}
