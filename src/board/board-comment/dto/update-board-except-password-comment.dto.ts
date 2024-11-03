import { CreateBoardCommentDTO } from './create-board-comment.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateBoardCommentExceptPasswordDTO extends PartialType(
    CreateBoardCommentDTO,
) {}
