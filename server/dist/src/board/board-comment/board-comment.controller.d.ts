import { BoardCommentService } from './board-comment.service';
import { CreateBoardCommentDTO } from './dto/create-board-comment.dto';
import { UpdateBoardCommentDTO } from './dto/update-board-comment.dto';
export declare class BoardCommentController {
    private readonly boardCommentService;
    constructor(boardCommentService: BoardCommentService);
    create(boardId: number, createBoardComment: CreateBoardCommentDTO): Promise<import("./entity/board-comment.entity").BoardCommentEntity>;
    findAll(boardId: number, page: number): Promise<import("./dto/board-comment-response.dto").BoardCommentResponseDTO[]>;
    update(boardId: number, commentId: string, updateBoardComment: UpdateBoardCommentDTO): Promise<import("./dto/board-comment-response.dto").BoardCommentResponseDTO>;
    remove(boardId: number, commentId: string): Promise<boolean>;
}
