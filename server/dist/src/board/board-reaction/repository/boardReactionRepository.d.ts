import { MongoRepository } from 'typeorm';
import { BoardReactionEntity } from '../entity/board-reaction.entity';
export declare class BoardReactionRepository {
    private readonly boardReactionRepository;
    constructor(boardReactionRepository: MongoRepository<BoardReactionEntity>);
    initializatedBoardReaction(boardId: number): Promise<BoardReactionEntity>;
    findBoardReaction(boardId: number): Promise<BoardReactionEntity>;
    deleteBoardReaction(boardId: number): Promise<boolean>;
    clearBoardReaction(): Promise<void>;
}
