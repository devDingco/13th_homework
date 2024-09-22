import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { BoardRepository } from './repositories/boardRepository';
import { BoardIdCounterRepository } from './repositories/boardIdCounterRepository';
import { BoardReactionRepository } from './repositories/boardReactionRepository';

@Injectable()
export class BoardService {
    constructor(
        private readonly boardRepository: BoardRepository,
        private readonly boardIdCounterRepository: BoardIdCounterRepository,
        private readonly boardReactionRepository: BoardReactionRepository,
    ) {}
    async create(createBoardDto: CreateBoardDto): Promise<Board> {
        const board = this.boardRepository.createBoard(createBoardDto);

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

    update(id: number, updateBoardDto: UpdateBoardDto) {
        return id;
    }

    async remove(boardId: number): Promise<void> {
        const responseBoard = await this.boardRepository.deleteBoard(boardId);
        const responseBoardReaction =
            await this.boardReactionRepository.deleteBoardReaction(boardId);

        if (!responseBoard || !responseBoardReaction) {
            throw new HttpException(
                `boardID: ${boardId} is not found in totalBoard`,
                HttpStatus.NOT_FOUND,
            );
        }
        return;
    }
}
