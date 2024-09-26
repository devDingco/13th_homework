import { Injectable } from '@nestjs/common';
import { BoardReactionRepository } from './repositories/boardReactionRepository';
import { BoardReaction } from './entities/reaction.entity';

@Injectable()
export class ReactionService {
    constructor(
        private readonly boardReactionRepository: BoardReactionRepository,
    ) {}
    // create(createReactionDto: CreateReactionDto) {
    //     return 'This action adds a new reaction';
    // }

    async findOne(boardId: number): Promise<BoardReaction> {
        return this.boardReactionRepository.findBoardReaction(boardId);
    }
}
