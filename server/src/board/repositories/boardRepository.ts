import { MongoRepository } from 'typeorm';
import { Board } from '../entities/board.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBoardDto } from '../dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardRepository {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: MongoRepository<Board>,
    ) {}

    createBoard(createBoardDto: CreateBoardDto): Board {
        const { author, title, content, imageUrl, youtubeUrl } = createBoardDto;
        return this.boardRepository.create({
            author,
            title,
            content,
            ...(imageUrl?.length > 0 && { imageUrl }),
            ...(youtubeUrl && { youtubeUrl }),
        });
    }

    async saveBoard(board: Board): Promise<Board> {
        return await this.boardRepository.save(board);
    }

    async findAllBoard(): Promise<Board[]> {
        return await this.boardRepository.find();
    }

    async findBoard(boardId: number): Promise<Board> {
        const findBoard = await this.boardRepository.findOne({
            where: { boardId },
        });

        if (!findBoard) {
            throw new HttpException(
                `boardID: ${boardId} is not found`,
                HttpStatus.NOT_FOUND,
            );
        }

        return findBoard;
    }

    async deleteBoard(boardId: number): Promise<boolean> {
        const deleteBoard = await this.boardRepository.deleteOne({
            boardId,
        });

        if (deleteBoard.deletedCount === 0) {
            throw new HttpException(
                `boardID: ${boardId} is not found in board`,
                HttpStatus.NOT_FOUND,
            );
        }
        return true;
    }
}
