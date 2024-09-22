import { MongoRepository } from 'typeorm';
import { BoardIdCounter } from '../entities/board-boardId.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardIdCounterRepository extends MongoRepository<BoardIdCounter> {
    async incrementBoardId(board: string): Promise<number> {
        const counter = await this.findOneAndUpdate(
            { board },
            { $inc: { boardId: 1 } },
            { upsert: true, returnDocument: 'after' },
        );
        return counter.boardId;
    }
}
