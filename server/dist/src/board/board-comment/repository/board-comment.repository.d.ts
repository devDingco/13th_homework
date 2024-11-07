import { BoardCommentEntity } from '../entity/board-comment.entity';
import { MongoRepository } from 'typeorm';
import { CreateBoardCommentDTO } from '../dto/create-board-comment.dto';
import { BoardCommentResponseDTO } from '../dto/board-comment-response.dto';
import { UpdateBoardCommentExceptPasswordDTO } from '../dto/update-board-except-password-comment.dto';
export declare class BoardCommentRepository {
    private readonly boardCommentRepository;
    constructor(boardCommentRepository: MongoRepository<BoardCommentEntity>);
    findComment(id: string): Promise<BoardCommentEntity>;
    createComment(boardId: number, { author, password, content, rating, parentId, }: CreateBoardCommentDTO): BoardCommentEntity;
    saveComment(comment: BoardCommentEntity): Promise<BoardCommentEntity>;
    findAllComment(boardId: number): Promise<BoardCommentEntity[]>;
    updateComment(commentId: string, updateBoardCommentDto: UpdateBoardCommentExceptPasswordDTO): Promise<BoardCommentResponseDTO>;
    deleteComment(parentId: string): Promise<void>;
    deleteAllComment(boardId: number): Promise<boolean>;
    clearComment(): Promise<void>;
}
