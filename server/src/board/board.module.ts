import { Board } from './entities/board.entity';
import { BoardComment } from './board-comment/entities/board-comment.entity';
import { BoardCommentRepository } from './board-comment/board-comment.repository';
import { BoardController } from './board.controller';
import { BoardIdCounter } from './entities/board-boardId.entity';
import { BoardIdCounterRepository } from './repositories/board-id-counter.repository';
import { BoardReaction } from './reaction/entities/reaction.entity';
import { BoardReactionRepository } from './reaction/repositories/boardReactionRepository';
import { BoardRepository } from './repositories/board.repository';
import { BoardResolver } from './board.resolver';
import { BoardService } from './board.service';
import { Module } from '@nestjs/common';
import { ReactionModule } from './reaction/reaction.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Board,
            BoardIdCounter,
            BoardReaction,
            BoardComment,
        ]),
        ReactionModule,
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
