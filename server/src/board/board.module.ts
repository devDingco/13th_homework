import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { BoardRepository } from './repositories/boardRepository';
import { BoardIdCounterRepository } from './repositories/boardIdCounterRepository';
import { BoardIdCounter } from './entities/board-boardId.entity';
import { BoardReaction } from './entities/board-reaction.entity';
import { BoardReactionRepository } from './repositories/boardReactionRepository';

@Module({
    imports: [TypeOrmModule.forFeature([Board, BoardIdCounter, BoardReaction])],
    controllers: [BoardController],
    providers: [
        BoardService,
        BoardRepository,
        BoardIdCounterRepository,
        BoardReactionRepository,
    ],
})
export class BoardModule {}
