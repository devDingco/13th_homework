import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { BoardCommentEntity } from './entity/board-comment.entity';
import { BoardCommentRepository } from './repository/board-comment.repository';
import { BoardCommentResponseDTO } from './dto/board-comment-response.dto';
import { BoardRepository } from '../repository/board.repository';
import { CreateBoardCommentDTO } from './dto/create-board-comment.dto';
import { CreateBoardCommentInput } from './schema/create-board-comment-input.schema';
import { UpdateBoardCommentExceptPasswordDTO } from './dto/update-board-except-password-comment.dto';
import { UpdateBoardCommentInput } from './schema/update-board-comment-input.schema';
export declare class BoardCommentService {
    private readonly boardCommentRepository;
    private readonly boardRepsitory;
    private readonly bcryptService;
    constructor(boardCommentRepository: BoardCommentRepository, boardRepsitory: BoardRepository, bcryptService: BcryptService);
    createComment(boardId: number, createBoardCommentDto: CreateBoardCommentDTO | CreateBoardCommentInput): Promise<BoardCommentEntity>;
    findAllComment(boardId: number, page: number): Promise<BoardCommentResponseDTO[]>;
    updateComment(boardId: number, updateBoardCommentDto: UpdateBoardCommentExceptPasswordDTO | UpdateBoardCommentInput, password: string, commentId: string): Promise<BoardCommentResponseDTO>;
    removeComment(boardId: number, commentId: string): Promise<boolean>;
    isExistBoard(boardId: number): Promise<void>;
    isExistParentComment(parentId: string): Promise<void>;
    validateBoardComment(commentId: string, password: string): Promise<void>;
    makeCommentMap(boardComments: BoardCommentResponseDTO[]): any[];
    isInvalidPage(length: number, page: number): void;
}
