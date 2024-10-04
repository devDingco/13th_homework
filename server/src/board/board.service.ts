import * as bcrypt from 'bcrypt';

import { Injectable, NotFoundException } from '@nestjs/common';

import { Board } from './entities/board.entity';
import { BoardIdCounterRepository } from './repositories/board-id-counter.repository';
import { BoardReactionRepository } from './reaction/repositories/boardReactionRepository';
import { BoardRepository } from './repositories/board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
    constructor(
        private readonly boardRepository: BoardRepository,
        private readonly boardIdCounterRepository: BoardIdCounterRepository,
        private readonly boardReactionRepository: BoardReactionRepository,
    ) {}
    async create(createBoardDto: CreateBoardDto): Promise<Board> {
        const hashPassword = await this.transformPassword(
            createBoardDto.password,
        );

        const board = this.boardRepository.createBoard({
            ...createBoardDto,
            password: hashPassword,
        });

        const boardId =
            await this.boardIdCounterRepository.incrementBoardId('board');
        board.boardId = boardId;

        this.boardReactionRepository.initializatedBoardReaction(boardId);

        return await this.boardRepository.saveBoard(board);
    }

    async findAll(): Promise<Board[]> {
        return await this.boardRepository.findAllBoard();
    }

    async findOne(boardId: number): Promise<Board> {
        return await this.boardRepository.findBoard(boardId);
    }

    async updateOne(
        boardId: number,
        updateBoardDto: UpdateBoardDto,
    ): Promise<Board> {
        return await this.boardRepository.updateOne(boardId, updateBoardDto);
    }

    async updateAll(
        boardId: number,
        updateBoardDto: CreateBoardDto,
    ): Promise<Board> {
        return await this.boardRepository.updateAll(boardId, updateBoardDto);
    }

    async remove(boardId: number): Promise<boolean> {
        const responseBoard = await this.boardRepository.deleteBoard(boardId);
        const responseBoardReaction =
            await this.boardReactionRepository.deleteBoardReaction(boardId);

        if (!responseBoard || !responseBoardReaction) {
            throw new NotFoundException(
                `boardID: ${boardId} is not found in Board`,
            );
        }
        return true;
    }

    async clear(): Promise<void> {
        await this.boardRepository.clearBoard();
        await this.boardReactionRepository.clearBoardReaction();
    }

    async transformPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }
}
