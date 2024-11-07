import { BoardCommentService } from './board-comment.service';
import { BoardCommentResponseDTO } from './dto/board-comment-response.dto';
import { CreateBoardCommentInput } from './schema/create-board-comment-input.schema';
import { UpdateBoardCommentInput } from './schema/update-board-comment-input.schema';
export declare class BoardCommentResolver {
    private readonly boardCommentService;
    constructor(boardCommentService: BoardCommentService);
    getBoardComment(boardId: number, page?: number): Promise<BoardCommentResponseDTO[]>;
    createBoardComment(boardId: number, createBoardComment: CreateBoardCommentInput): Promise<import("./entity/board-comment.entity").BoardCommentEntity>;
    updateBoardComment(boardId: number, updateBoardComment: UpdateBoardCommentInput, commentId: string): Promise<BoardCommentResponseDTO>;
    deleteBoardComment(boardId: number, commentId: string): Promise<boolean>;
}
