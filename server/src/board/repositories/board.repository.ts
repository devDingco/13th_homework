import { MongoRepository } from 'typeorm';
import { Board } from '../entities/board.entity';
import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateBoardDto } from '../dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateBoardDto } from '../dto/update-board.dto';

@Injectable()
export class BoardRepository {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: MongoRepository<Board>,
    ) {}

    createBoard(createBoardDto: CreateBoardDto): Board {
        const {
            author,
            title,
            content,
            imageUrl,
            youtubeUrl,
            password,
            address,
            detailAddress,
        } = createBoardDto;
        return this.boardRepository.create({
            author,
            title,
            content,
            password,
            ...(imageUrl?.length > 0 && { imageUrl }),
            ...(youtubeUrl && { youtubeUrl }),
            ...(address && { address }),
            ...(detailAddress && { detailAddress }),
        });
    }

    async saveBoard(board: Board): Promise<Board> {
        return await this.boardRepository.save(board);
    }

    async findAllBoard(): Promise<Board[]> {
        return await this.boardRepository.find();
    }

    async findBoard(boardId: number): Promise<Board> {
        const findBoard = await this.boardRepository.findOneBy({
            boardId,
        });

        if (!findBoard) {
            throw new NotFoundException(`boardID: ${boardId} is not found`);
        }

        return findBoard;
    }

    async updateOne(
        boardId: number,
        updateBoard: UpdateBoardDto,
    ): Promise<Board> {
        const updateBoardDB = await this.boardRepository.update(
            { boardId },
            updateBoard,
        );

        if (updateBoardDB.affected === 0) {
            throw new HttpException(
                `boardID: ${boardId} is not update`,
                HttpStatus.NOT_FOUND,
            );
        }

        return await this.boardRepository.findOneBy({ boardId });
    }

    async updateAll(
        boardId: number,
        updateBoard: CreateBoardDto,
    ): Promise<Board> {
        const updateBoardDB = await this.findBoard(boardId);

        Object.assign(updateBoardDB, updateBoard);

        await this.saveBoard(updateBoardDB);

        return await this.boardRepository.findOneBy({ boardId });
    }

    async deleteBoard(boardId: number): Promise<boolean> {
        const deleteBoardDB = await this.boardRepository.deleteOne({
            boardId,
        });

        if (deleteBoardDB.deletedCount === 0) {
            throw new NotFoundException(
                `boardID: ${boardId} is not found in board`,
            );
        }
        return true;
    }

    async clearBoard(): Promise<void> {
        await this.boardRepository.clear();
    }
}
