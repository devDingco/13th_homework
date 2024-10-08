import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

import { Column } from 'typeorm';
import { CreateBoardCommentDto } from './create-board-comment.dto';

@InputType()
export class UpdateBoardCommentDto extends PartialType(CreateBoardCommentDto) {
    @IsString()
    @IsNotEmpty()
    @Column()
    @Field()
    password: string;
}
