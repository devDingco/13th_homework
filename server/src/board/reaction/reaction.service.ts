import { BoardReaction } from './entities/reaction.entity';
import { BoardReactionRepository } from './repositories/boardReactionRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReactionService {
    constructor(
        private readonly boardReactionRepository: BoardReactionRepository,
    ) {}

    async getBoardReaction(boardId: number): Promise<BoardReaction> {
        return this.boardReactionRepository.findBoardReaction(boardId);
    }
}
