import { BoardReactionService } from './board-reaction.service';
export declare class BoardReactionController {
    private readonly boardReactionService;
    constructor(boardReactionService: BoardReactionService);
    getBoardReaction(BoardId: number): Promise<import("./entity/board-reaction.entity").BoardReactionEntity>;
}
