import { PartialType } from '@nestjs/swagger';
import { CreateBoardCommentDto } from './create-board-comment.dto';

export class UpdateBoardCommentDto extends PartialType(CreateBoardCommentDto) {}
