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
export class UpdateBoardCommentDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    @Column()
    @Field()
    content: string;

    @IsNumber()
    @IsOptional()
    @Min(1)
    @Max(5)
    @Column()
    @Field(() => Int)
    rating?: number;

    @IsString()
    @IsOptional()
    @Column()
    @Field(() => ID, { nullable: true })
    parentId?: string | null;

    @IsString()
    @IsNotEmpty()
    @Column()
    @Field({})
    password?: string;
}
