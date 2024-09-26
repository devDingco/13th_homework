import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { BoardRepository } from './repositories/boardRepository';
import { BoardIdCounterRepository } from './repositories/boardIdCounterRepository';
import { BoardReactionRepository } from './reaction/repositories/boardReactionRepository';

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

    async remove(boardId: number): Promise<void> {
        const responseBoard = await this.boardRepository.deleteBoard(boardId);
        const responseBoardReaction =
            await this.boardReactionRepository.deleteBoardReaction(boardId);

        // 원래 서비스 로직에서 에러는 처리하지 않으려고 했지만 현재 같은 경우 한 번 더 확인하는 것
        // 한 번 더 둘 다 truthy인 지 확인하고, 혹시나해서 만약에 하나라도 falsy면 에러처리
        if (!responseBoard || !responseBoardReaction) {
            throw new HttpException(
                `boardID: ${boardId} is not found in totalBoard`,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    async clear(): Promise<void> {
        await this.boardRepository.clearBoard();
        await this.boardReactionRepository.clearBoardReaction();
    }
}
