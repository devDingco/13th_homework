import { InjectRepository } from '@nestjs/typeorm';
import { BoardComment } from './entities/board-comment.entity';
import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { CreateBoardCommentDto } from './dto/create-board-comment.dto';

@Injectable()
export class BoardCommentRepository {
    constructor(
        @InjectRepository(BoardComment)
        private readonly boardCommentRepository: MongoRepository<BoardComment>,
    ) {}

    async findCommentById(parentId: string): Promise<BoardComment | null> {
        return await this.boardCommentRepository.findOneBy({ parentId });
    }

    createComment(
        boardId: number,
        { author, password, content, rating, parentId }: CreateBoardCommentDto,
    ): BoardComment {
        return this.boardCommentRepository.create({
            author,
            password,
            content,
            rating,
            boardId,
            parentId: parentId || null,
        });
    }

    async saveComment(comment: BoardComment): Promise<BoardComment> {
        return this.boardCommentRepository.save(comment);
    }
}
