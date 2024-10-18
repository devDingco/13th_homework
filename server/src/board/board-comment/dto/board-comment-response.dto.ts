import { BoardCommentEntity } from '../entity/board-comment.entity';
import { OmitType } from '@nestjs/mapped-types';

export class BoardCommentResponseDTO extends OmitType(BoardCommentEntity, [
    'password',
]) {
    replies?: BoardCommentResponseDTO[];
}
