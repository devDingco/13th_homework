import * as bcrypt from 'bcrypt';

import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { Board } from './entities/board.entity';
import { BoardCommentRepository } from './board-comment/board-comment.repository';
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
        private readonly boardCommentRepository: BoardCommentRepository,
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

    async findAll(page: number): Promise<Board[]> {
        await this.checkEntityCount(page);
        return await this.boardRepository.findAllBoard();
        // return await this.boardRepository.countBoard();
    }

    async findOne(boardId: number): Promise<Board> {
        const board = await this.boardRepository.findBoard(boardId);

        return board;
    }

    async getBoardCount(): Promise<number> {
        return await this.boardRepository.countBoard();
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

        const responseBoardComment =
            await this.boardCommentRepository.deleteAllComment(boardId);

        if (!responseBoard || !responseBoardReaction || !responseBoardComment) {
            throw new NotFoundException(
                `boardID: ${boardId} is not found in Board`,
            );
        }
        return true;
    }

    async clear(): Promise<boolean> {
        await this.boardRepository.clearBoard();

        await this.boardReactionRepository.clearBoardReaction();

        await this.boardCommentRepository.clearComment();

        return true;
    }

    async transformPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async checkEntityCount(page: number) {
        const maxCount = await this.boardRepository.countBoard();

        if (page > maxCount) {
            throw new BadRequestException(
                `Entity count exceeds the limit of ${page}. Current count: ${maxCount}`,
            );
        }
    }
}
