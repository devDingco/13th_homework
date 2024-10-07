import { ObjectType, OmitType } from '@nestjs/graphql';

import { BoardComment } from './board-comment.entity';

@ObjectType()
export class BoardCommentResponseDto extends OmitType(BoardComment, [
    'password',
] as const) {}
