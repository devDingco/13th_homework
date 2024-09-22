import { MongoRepository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardReaction } from '../entities/board-reaction.entity';

@Injectable()
export class BoardReactionRepository {
    constructor(
        @InjectRepository(BoardReaction)
        private readonly boardReactionRepository: MongoRepository<BoardReaction>,
    ) {}
    async initializatedBoardReaction(boardId: number): Promise<BoardReaction> {
        const boardReaction = this.boardReactionRepository.create({
            boardId,
            like: 0,
            hate: 0,
        });

        return await this.boardReactionRepository.save(boardReaction);
    }

    async deleteBoardReaction(boardId: number): Promise<boolean> {
        const deleteBoardReaction =
            await this.boardReactionRepository.deleteOne({
                boardId,
            });

        if (deleteBoardReaction.deletedCount === 0) {
            throw new HttpException(
                `boardID: ${boardId} is not found in boardReaction`,
                HttpStatus.NOT_FOUND,
            );
        }
        return true;
    }

    async clearBoardReaction(): Promise<void> {
        await this.boardReactionRepository.clear();
    }
}
