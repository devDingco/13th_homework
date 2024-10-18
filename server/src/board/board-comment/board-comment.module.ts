import { BoardCommentController } from './board-comment.controller';
import { BoardCommentEntity } from './entity/board-comment.entity';
import { BoardCommentRepository } from './board-comment.repository';
// import { BoardCommentResolver } from './board-comment.resolver';
import { BoardCommentService } from './board-comment.service';
import { BoardEntity } from '../entity/board.entity';
import { BoardModule } from '../board.module';
import { BoardRepository } from '../repository/board.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([BoardCommentEntity, BoardEntity], 'mongodb'),
        BoardModule,
    ],
    controllers: [BoardCommentController],
    providers: [
        BoardCommentService,
        BoardCommentRepository,
        BoardRepository,
        // BoardCommentResolver,
    ],
    exports: [BoardCommentRepository],
})
export class BoardCommentModule {}
