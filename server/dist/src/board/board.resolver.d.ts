import { BoardService } from './board.service';
import { CreateBoardInput } from './schema/create-board-input.schema';
import { UpdateBoardInput } from './schema/update-board-input.schema';
export declare class BoardResolver {
    private readonly boardService;
    constructor(boardService: BoardService);
    getBoards(page?: number, take?: number): Promise<import("./dto/pagination-response.dto").PaginationResponseDTO>;
    getBoard(boardId: number): Promise<import("./entity/board.entity").BoardEntity>;
    createBoard(createBoard: CreateBoardInput): Promise<import("./entity/board.entity").BoardEntity>;
    updateBoard(boardId: number, updateBoard: UpdateBoardInput): Promise<import("./entity/board.entity").BoardEntity>;
    deleteBoard(boardId: number): Promise<boolean>;
    clearBoard(): Promise<boolean>;
}
