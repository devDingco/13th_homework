import { IsNotEmpty, IsString } from 'class-validator';

import { CreateBoardCommentDTO } from './create-board-comment.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateBoardCommentDTO extends PartialType(CreateBoardCommentDTO) {
    @IsString()
    @IsNotEmpty()
    password: string;
}
