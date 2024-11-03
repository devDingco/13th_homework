import { MongoRepository } from 'typeorm';
import { BoardIdCounterEntity } from '../entity/board-boardId.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardIdCounterRepository {
    constructor(
        @InjectRepository(BoardIdCounterEntity, 'MongoDB')
        private readonly boardIdCounterRepository: MongoRepository<BoardIdCounterEntity>,
    ) {}
    async incrementBoardId(board: string): Promise<number> {
        const counter = await this.boardIdCounterRepository.findOneAndUpdate(
            { collection: board },
            { $inc: { boardId: 1 } },
            { upsert: true, returnDocument: 'after' },
        );
        return counter.value.boardId;
    }
}
