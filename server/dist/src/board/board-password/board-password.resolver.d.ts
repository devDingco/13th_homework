import { BoardPasswordService } from './board-password.service';
export declare class BoardPasswordResolver {
    private readonly boardPasswordService;
    constructor(boardPasswordService: BoardPasswordService);
    isPasswordCorrect(boardId: number, password: string): Promise<boolean>;
}
