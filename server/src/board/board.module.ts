import { BoardCommentEntity } from './board-comment/entity/board-comment.entity';
import { BoardCommentRepository } from './board-comment/repository/board-comment.repository';
import { BoardController } from './board.controller';
import { BoardEntity } from './entity/board.entity';
import { BoardIdCounterEntity } from './entity/board-boardId.entity';
import { BoardIdCounterRepository } from './repository/board-id-counter.repository';
import { BoardReactionEntity } from './board-reaction/entity/board-reaction.entity';
import { BoardReactionModule } from './board-reaction/board-reaction.module';
import { BoardReactionRepository } from './board-reaction/repository/boardReactionRepository';
import { BoardRepository } from './repository/board.repository';
import { BoardResolver } from './board.resolver';
import { BoardService } from './board.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                BoardEntity,
                BoardIdCounterEntity,
                BoardReactionEntity,
                BoardCommentEntity,
            ],
            'mongodb',
        ),
        BoardReactionModule,
    ],
    controllers: [BoardController],
    providers: [
        BoardService,
        BoardRepository,
        BoardIdCounterRepository,
        BoardReactionRepository,
        BoardCommentRepository,
        BoardResolver,
    ],
    exports: [BoardService, BoardRepository],
})
export class BoardModule {}
