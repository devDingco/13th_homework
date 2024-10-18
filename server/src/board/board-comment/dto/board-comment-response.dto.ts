import { BoardCommentEntity } from '../entity/board-comment.entity';
import { ObjectType } from '@nestjs/graphql';
import { OmitType } from '@nestjs/mapped-types';
@ObjectType()
export class BoardCommentResponseDTO extends OmitType(BoardCommentEntity, [
    'password',
]) {
    replies?: BoardCommentResponseDTO[];
}
