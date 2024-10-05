import { Board } from '../entities/board.entity';
import { BoardComment } from './entities/board-comment.entity';
import { BoardCommentController } from './board-comment.controller';
import { BoardCommentRepository } from './board-comment.repository';
import { BoardCommentService } from './board-comment.service';
import { BoardModule } from '../board.module';
import { BoardRepository } from '../repositories/board.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([BoardComment, Board]), BoardModule],
    controllers: [BoardCommentController],
    providers: [BoardCommentService, BoardCommentRepository, BoardRepository],
    exports: [BoardCommentRepository],
})
export class BoardCommentModule {}
