import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
    IsNotEmpty,
    IsNumber,
    IsString,
    Length,
    Max,
    Min,
} from 'class-validator';

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
    @Length(1, 100)
    @Column()
    @Field()
    password: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    @Field()
    content: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(5)
    @Column()
    @Field(() => Int)
    rating: number;
}
