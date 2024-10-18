import { BoardReactionEntity } from './entity/board-reaction.entity';
import { BoardReactionRepository } from './repository/boardReactionRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardReactionService {
    constructor(
        private readonly boardReactionRepository: BoardReactionRepository,
    ) {}

    async getBoardReaction(boardId: number): Promise<BoardReactionEntity> {
        return this.boardReactionRepository.findBoardReaction(boardId);
    }
}
