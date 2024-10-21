import * as bcrypt from 'bcrypt';

import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { BoardCommentRepository } from './board-comment/board-comment.repository';
import { BoardEntity } from './entity/board.entity';
import { BoardIdCounterRepository } from './repository/board-id-counter.repository';
import { BoardReactionRepository } from './board-reaction/repository/boardReactionRepository';
import { BoardRepository } from './repository/board.repository';
import { CreateBoardDTO } from './dto/create-board.dto';
import { CreateBoardInput } from './schema/create-board-input.schema';
import { PaginationDTO } from './dto/pagination.dto';
import { PaginationResponseDTO } from './dto/pagination-response.dto';
import { UpdateBoardDTO } from './dto/update-board.dto';

@Injectable()
export class BoardService {
    constructor(
        private readonly boardRepository: BoardRepository,
        private readonly boardIdCounterRepository: BoardIdCounterRepository,
        private readonly boardReactionRepository: BoardReactionRepository,
        private readonly boardCommentRepository: BoardCommentRepository,
    ) {}
    async create(
        createBoard: CreateBoardDTO | CreateBoardInput,
    ): Promise<BoardEntity> {
        const hashPassword = await this.transformPassword(createBoard.password);

        const board = this.boardRepository.createBoard({
            ...createBoard,
            password: hashPassword,
        });

        const boardId =
            await this.boardIdCounterRepository.incrementBoardId('board');
        board.boardId = boardId;

        this.boardReactionRepository.initializatedBoardReaction(boardId);

        return await this.boardRepository.saveBoard(board);
    }

    async findAll({
        page,
        take,
    }: PaginationDTO): Promise<PaginationResponseDTO> {
        await this.checkBoardEntityCount(page, take);
        return await this.boardRepository.findAllBoard(page, take);
    }

    async findOne(boardId: number): Promise<BoardEntity> {
        return await this.boardRepository.findBoard(boardId);
    }

    async getBoardCount(): Promise<number> {
        return await this.boardRepository.countBoard();
    }

    async updateOne(
        boardId: number,
        updateBoard: UpdateBoardDTO,
    ): Promise<BoardEntity> {
        return await this.boardRepository.updateOne(boardId, updateBoard);
    }

    async updateAll(
        boardId: number,
        updateBoard: UpdateBoardDTO,
    ): Promise<BoardEntity> {
        return await this.boardRepository.updateAll(boardId, updateBoard);
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

    async checkBoardEntityCount(page: number, take: number) {
        const maxCount = await this.boardRepository.countBoard();
        const maxPage = Math.ceil(maxCount / take);

        if (page > maxPage) {
            throw new BadRequestException(
                `Entity count exceeds the limit of ${page}. Current count: ${maxPage}`,
            );
        }
    }
}
