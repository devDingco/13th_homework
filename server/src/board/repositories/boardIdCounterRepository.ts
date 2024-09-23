import { MongoRepository } from 'typeorm';
import { BoardIdCounter } from '../entities/board-boardId.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardIdCounterRepository {
    constructor(
        @InjectRepository(BoardIdCounter)
        private readonly boardIdCounterRepository: MongoRepository<BoardIdCounter>,
    ) {}
    async incrementBoardId(board: string): Promise<number> {
        const counter = await this.boardIdCounterRepository.findOneAndUpdate(
            { board },
            { $inc: { boardId: 1 } },
            { upsert: true, returnDocument: 'after' },
        );
        return counter.value.boardId;
    }
}
