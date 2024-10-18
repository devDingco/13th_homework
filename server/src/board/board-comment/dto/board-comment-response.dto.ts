import { Field, ObjectType } from '@nestjs/graphql';

import { BoardCommentEntity } from '../entity/board-comment.entity';
import { OmitType } from '@nestjs/mapped-types';

@ObjectType()
export class BoardCommentResponseDTO extends OmitType(BoardCommentEntity, [
    'password',
]) {
    @Field(() => [BoardCommentResponseDTO], { nullable: true })
    replies?: BoardCommentResponseDTO[];
}
