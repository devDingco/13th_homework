import { BoardPasswordService } from './board-password.service';
import { BoardPasswordDTO } from './dto/board-password.dto';
export declare class BoardPasswordController {
    private readonly boardPasswordService;
    constructor(boardPasswordService: BoardPasswordService);
    validateBoardData(boardId: number, body: BoardPasswordDTO): Promise<boolean>;
}
