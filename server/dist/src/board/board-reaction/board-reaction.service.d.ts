import { BoardReactionEntity } from './entity/board-reaction.entity';
import { BoardReactionRepository } from './repository/boardReactionRepository';
export declare class BoardReactionService {
    private readonly boardReactionRepository;
    constructor(boardReactionRepository: BoardReactionRepository);
    getBoardReaction(boardId: number): Promise<BoardReactionEntity>;
}
