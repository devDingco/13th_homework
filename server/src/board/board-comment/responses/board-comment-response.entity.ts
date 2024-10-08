import { Field, ObjectType, OmitType } from '@nestjs/graphql';

import { BoardComment } from '../entities/board-comment.entity';

@ObjectType()
export class BoardCommentResponse extends OmitType(BoardComment, [
    'password',
] as const) {
    @Field(() => [BoardCommentResponse], { nullable: true })
    replies?: BoardCommentResponse[];
}
