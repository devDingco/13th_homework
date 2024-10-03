import * as bcrypt from 'bcrypt';

import { Injectable, UnauthorizedException } from '@nestjs/common';

import { BoardRepository } from '../repositories/boardRepository';

@Injectable()
export class BoardPasswordService {
    constructor(private readonly boardRepository: BoardRepository) {}

    async validateBoardData(
        boardId: number,
        password: string,
    ): Promise<boolean> {
        const findBoard = await this.boardRepository.findBoard(boardId);

        const validatePassword = await bcrypt.compare(
            password,
            findBoard.password,
        );

        if (!validatePassword) {
            throw new UnauthorizedException(`password is invalid`);
        }

        return true;
    }
}
