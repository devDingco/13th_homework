import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { BoardRepository } from './repositories/boardRepository';
import { BoardIdCounterRepository } from './repositories/boardIdCounterRepository';
import { BoardIdCounter } from './entities/board-boardId.entity';
import { BoardReaction } from './reaction/entities/reaction.entity';
import { BoardReactionRepository } from './reaction/repositories/boardReactionRepository';
import { ReactionModule } from './reaction/reaction.module';
import { BoardResolver } from './board.resolver';
import { BoardCommentModule } from './board-comment/board-comment.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Board, BoardIdCounter, BoardReaction]),
        ReactionModule,
        BoardCommentModule,
    ],
    controllers: [BoardController],
    providers: [
        BoardService,
        BoardRepository,
        BoardIdCounterRepository,
        BoardReactionRepository,
        BoardResolver,
    ],
})
export class BoardModule {}
