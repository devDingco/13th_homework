import { BoardCommentController } from './board-comment.controller';
import { BoardCommentService } from './board-comment.service';
import { Module } from '@nestjs/common';

@Module({
    controllers: [BoardCommentController],
    providers: [BoardCommentService],
})
export class BoardCommentModule {}
