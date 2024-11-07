import { BoardService } from './board.service';
import { CreateBoardDTO } from './dto/create-board.dto';
import { UpdateBoardDTO } from './dto/update-board.dto';
import { BoardEntity } from './entity/board.entity';
import { PaginationDTO } from './dto/pagination.dto';
import { PaginationResponseDTO } from './dto/pagination-response.dto';
export declare class BoardController {
    private readonly boardService;
    constructor(boardService: BoardService);
    createBoard(createBoardDTO: CreateBoardDTO): Promise<BoardEntity>;
    getBoards(query: PaginationDTO): Promise<PaginationResponseDTO>;
    getBoard(boardId: number): Promise<BoardEntity>;
    updateBoard(boardId: number, updateBoardDTO: UpdateBoardDTO): Promise<BoardEntity>;
    removeBoard(boardId: number): Promise<boolean>;
    clearBoard(): Promise<boolean>;
}
