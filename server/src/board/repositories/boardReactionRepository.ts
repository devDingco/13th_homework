import { MongoRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardReaction } from '../entities/board-reaction.entity';

// import { Entity, ObjectIdColumn, Column } from 'typeorm';
// import { ObjectId } from 'mongodb';

// @Entity()
// export class BoardReaction {
//     @ObjectIdColumn()
//     _id: ObjectId;

//     @Column()
//     board: string;

//     @Column({ default: 0 })
//     like: number;

//     @Column({ default: 0 })
//     hate: number;
// }

@Injectable()
export class BoardReactionRepository {
    constructor(
        @InjectRepository(BoardReaction)
        private readonly boardReactionRepository: MongoRepository<BoardReaction>,
    ) {}
    async initializatedBoardReaction(boardId: number): Promise<BoardReaction> {
        const boardReaction = this.boardReactionRepository.create({
            boardId,
            like: 0,
            hate: 0,
        });

        return await this.boardReactionRepository.save(boardReaction);
    }
}
