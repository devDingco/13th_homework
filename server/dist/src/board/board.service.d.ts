import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { BoardCommentRepository } from './board-comment/repository/board-comment.repository';
import { BoardEntity } from './entity/board.entity';
import { BoardIdCounterRepository } from './repository/board-id-counter.repository';
import { BoardReactionRepository } from './board-reaction/repository/boardReactionRepository';
import { BoardRepository } from './repository/board.repository';
import { CreateBoardDTO } from './dto/create-board.dto';
import { CreateBoardInput } from './schema/create-board-input.schema';
import { PaginationDTO } from './dto/pagination.dto';
import { PaginationResponseDTO } from './dto/pagination-response.dto';
import { UpdateBoardDTO } from './dto/update-board.dto';
export declare class BoardService {
    private readonly boardRepository;
    private readonly boardIdCounterRepository;
    private readonly boardReactionRepository;
    private readonly boardCommentRepository;
    private readonly bcryptService;
    constructor(boardRepository: BoardRepository, boardIdCounterRepository: BoardIdCounterRepository, boardReactionRepository: BoardReactionRepository, boardCommentRepository: BoardCommentRepository, bcryptService: BcryptService);
    create(createBoard: CreateBoardDTO | CreateBoardInput): Promise<BoardEntity>;
    findAll({ page, take, }: PaginationDTO): Promise<PaginationResponseDTO>;
    findOne(boardId: number): Promise<BoardEntity>;
    getBoardCount(): Promise<number>;
    updateOne(boardId: number, updateBoard: UpdateBoardDTO): Promise<BoardEntity>;
    updateAll(boardId: number, updateBoard: UpdateBoardDTO): Promise<BoardEntity>;
    remove(boardId: number): Promise<boolean>;
    clear(): Promise<boolean>;
    checkBoardEntityCount(page: number, take: number): Promise<void>;
}
