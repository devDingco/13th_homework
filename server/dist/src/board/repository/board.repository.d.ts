import { MongoRepository } from 'typeorm';
import { BoardEntity } from '../entity/board.entity';
import { CreateBoardDTO } from '../dto/create-board.dto';
import { UpdateBoardDTO } from '../dto/update-board.dto';
import { PaginationResponseDTO } from '../dto/pagination-response.dto';
export declare class BoardRepository {
    private readonly boardRepository;
    constructor(boardRepository: MongoRepository<BoardEntity>);
    createBoard(createBoard: CreateBoardDTO): BoardEntity;
    saveBoard(board: BoardEntity): Promise<BoardEntity>;
    findAllBoard(page: number, take: number): Promise<PaginationResponseDTO>;
    findBoard(boardId: number): Promise<BoardEntity>;
    updateOne(boardId: number, updateBoard: UpdateBoardDTO): Promise<BoardEntity>;
    updateAll(boardId: number, updateBoard: UpdateBoardDTO): Promise<BoardEntity>;
    deleteBoard(boardId: number): Promise<boolean>;
    clearBoard(): Promise<void>;
    countBoard(): Promise<number>;
}
