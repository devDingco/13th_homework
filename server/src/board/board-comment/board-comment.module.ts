import { BoardComment } from './entities/board-comment.entity';
import { BoardCommentController } from './board-comment.controller';
import { BoardCommentRepository } from './board-comment.repository';
import { BoardCommentService } from './board-comment.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([BoardComment])],
    controllers: [BoardCommentController],
    providers: [BoardCommentService, BoardCommentRepository],
})
export class BoardCommentModule {}
