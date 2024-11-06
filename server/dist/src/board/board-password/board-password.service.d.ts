import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { BoardRepository } from '../repository/board.repository';
export declare class BoardPasswordService {
    private readonly boardRepository;
    private readonly bcryptService;
    constructor(boardRepository: BoardRepository, bcryptService: BcryptService);
    validateBoardData(boardId: number, password: string): Promise<boolean>;
}
