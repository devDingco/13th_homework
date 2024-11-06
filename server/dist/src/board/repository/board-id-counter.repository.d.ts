import { MongoRepository } from 'typeorm';
import { BoardIdCounterEntity } from '../entity/board-boardId.entity';
export declare class BoardIdCounterRepository {
    private readonly boardIdCounterRepository;
    constructor(boardIdCounterRepository: MongoRepository<BoardIdCounterEntity>);
    incrementBoardId(board: string): Promise<number>;
}
