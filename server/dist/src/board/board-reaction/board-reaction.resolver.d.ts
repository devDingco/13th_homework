import { BoardReactionService } from './board-reaction.service';
export declare class BoardReactionResolver {
    private readonly boardReactionService;
    constructor(boardReactionService: BoardReactionService);
    getBoardReaction(boardId: number): Promise<import("./entity/board-reaction.entity").BoardReactionEntity>;
}
