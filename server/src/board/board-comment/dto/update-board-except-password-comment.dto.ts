import { InputType, PartialType } from '@nestjs/graphql';

import { CreateBoardCommentDto } from './create-board-comment.dto';

@InputType()
export class UpdateBoardCommentExceptCommentDto extends PartialType(
    CreateBoardCommentDto,
) {}
