import { BoardComment } from './entities/board-comment.entity';
import { BoardCommentController } from './board-comment.controller';
import { BoardCommentRepository } from './board-comment.repository';
import { BoardCommentResolver } from './board-comment.resolver';
import { BoardCommentService } from './board-comment.service';
import { BoardEntity } from '../entities/board.entity';
import { BoardModule } from '../board.module';
import { BoardRepository } from '../repositories/board.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([BoardComment, BoardEntity], 'mongodb'),
        BoardModule,
    ],
    controllers: [BoardCommentController],
    providers: [
        BoardCommentService,
        BoardCommentRepository,
        BoardRepository,
        BoardCommentResolver,
    ],
    exports: [BoardCommentRepository],
})
export class BoardCommentModule {}
