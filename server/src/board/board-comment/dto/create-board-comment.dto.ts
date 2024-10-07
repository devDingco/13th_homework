import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

import { Column } from 'typeorm';
import { UpdateBoardCommentDto } from './update-board-comment.dto';

@InputType()
@ObjectType()
export class CreateBoardCommentDto extends UpdateBoardCommentDto {
    @IsString()
    @IsNotEmpty()
    @Column()
    @Field()
    author: string;
}
