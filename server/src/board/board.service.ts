import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { BoardRepository } from './repositories/boardRepository';
import { BoardIdCounterRepository } from './repositories/boardIdCounterRepository';

// private readonly boardRepository: Repository<Board>,

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private boardRepository: BoardRepository,
        private boardIdCounterRepository: BoardIdCounterRepository,
    ) {}
    async create(createBoardDto: CreateBoardDto): Promise<Board> {
        const board = this.boardRepository.createBoard(createBoardDto);
        const boardId =
            await this.boardIdCounterRepository.incrementBoardId('Boards');

        return await this.boardRepository.save({ board, boardId });
    }

    async findAll(): Promise<Board[]> {
        return await this.boardRepository.find();
    }

    async findOne(id: number) {
        return await this.boardRepository.findOne({ where: { id } });
    }

    update(id: number, updateBoardDto: UpdateBoardDto) {
        return `This action updates a #${id} board`;
    }

    remove(id: number) {
        return `This action removes a #${id} board`;
    }
}
