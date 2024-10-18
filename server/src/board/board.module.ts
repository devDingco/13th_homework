import { BoardComment } from './board-comment/entities/board-comment.entity';
import { BoardCommentRepository } from './board-comment/board-comment.repository';
import { BoardController } from './board.controller';
import { BoardEntity } from './entity/board.entity';
import { BoardIdCounterEntity } from './entity/board-boardId.entity';
import { BoardIdCounterRepository } from './repository/board-id-counter.repository';
import { BoardImageModule } from './board-image/board-image.module';
import { BoardReaction } from './reaction/entities/board-reaction.entity';
import { BoardReactionModule } from './reaction/board-reaction.module';
import { BoardReactionRepository } from './reaction/repositories/boardReactionRepository';
import { BoardRepository } from './repository/board.repository';
import { BoardResolver } from './board.resolver';
import { BoardService } from './board.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [BoardEntity, BoardIdCounterEntity, BoardReaction, BoardComment],
            'mongodb',
        ),
        BoardReactionModule,
        BoardImageModule,
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
