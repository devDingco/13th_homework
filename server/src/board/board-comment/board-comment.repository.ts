import { BoardComment } from './entities/board-comment.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardCommentRepository {
    constructor(private readonly boardComment: BoardComment) {}
}
