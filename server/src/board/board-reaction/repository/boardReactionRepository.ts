import { MongoRepository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardReactionEntity } from '../entity/board-reaction.entity';

@Injectable()
export class BoardReactionRepository {
    constructor(
        @InjectRepository(BoardReactionEntity, 'MongoDB')
        private readonly boardReactionRepository: MongoRepository<BoardReactionEntity>,
    ) {}
    async initializatedBoardReaction(
        boardId: number,
    ): Promise<BoardReactionEntity> {
        const boardReaction = this.boardReactionRepository.create({
            boardId,
            like: 0,
            hate: 0,
        });

        return await this.boardReactionRepository.save(boardReaction);
    }

    async findBoardReaction(boardId: number): Promise<BoardReactionEntity> {
        const findReaction = await this.boardReactionRepository.findOneBy({
            boardId,
        });

        if (!findReaction) {
            throw new HttpException(
                `boardID: ${boardId} is not found`,
                HttpStatus.NOT_FOUND,
            );
        }

        return findReaction;
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
