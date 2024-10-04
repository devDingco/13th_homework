import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { Column } from 'typeorm';

@InputType()
@ObjectType()
export class CreateBoardCommentDto {
    @IsString()
    @IsNotEmpty()
    @Column()
    @Field()
    author: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    @Field()
    title: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    @Field()
    content: string;

    @IsNumber()
    @IsNotEmpty()
    @Column()
    @Field(() => Int)
    rating: number;
}
