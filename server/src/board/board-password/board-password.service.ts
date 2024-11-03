import { Injectable, NotFoundException } from '@nestjs/common';

import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { BoardRepository } from '../repository/board.repository';

@Injectable()
export class BoardPasswordService {
    constructor(
        private readonly boardRepository: BoardRepository,
        private readonly bcryptService: BcryptService,
    ) {}

    async validateBoardData(
        boardId: number,
        password: string,
    ): Promise<boolean> {
        const findBoard = await this.boardRepository.findBoard(boardId);

        if (!findBoard) {
            throw new NotFoundException(`boardId ${boardId} is not found`);
        }

        await this.bcryptService.validatePassword(password, findBoard.password);

        return true;
    }
}
