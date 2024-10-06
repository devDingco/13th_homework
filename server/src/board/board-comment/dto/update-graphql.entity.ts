import { InputType, OmitType } from '@nestjs/graphql';

import { UpdateBoardCommentDto } from './update-board-comment.dto';

@InputType()
export class UpdateBoardCommentGraphDto extends OmitType(
    UpdateBoardCommentDto,
    ['password'] as const,
) {}
