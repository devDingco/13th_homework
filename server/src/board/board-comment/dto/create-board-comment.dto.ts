import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
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
    @Column()
    @Field()
    password: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
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

    @IsString()
    @IsOptional()
    @Column()
    @Field(() => ID, { nullable: true })
    parentId: string | null;
}
