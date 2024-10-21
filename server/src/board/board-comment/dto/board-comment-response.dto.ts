import { Field, ObjectType, OmitType } from '@nestjs/graphql';

import { BoardCommentSchema } from '../schema/board-comment.schema';

@ObjectType()
export class BoardCommentResponseDTO extends OmitType(BoardCommentSchema, [
    'password',
]) {
    @Field(() => [BoardCommentResponseDTO], { nullable: true })
    replies?: BoardCommentResponseDTO[];
}
