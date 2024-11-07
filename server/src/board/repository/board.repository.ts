import { MongoRepository } from 'typeorm';
import { BoardEntity } from '../entity/board.entity';
import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateBoardDTO } from '../dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateBoardDTO } from '../dto/update-board.dto';
import { PaginationResponseDTO } from '../dto/pagination-response.dto';

@Injectable()
export class BoardRepository {
    constructor(
        @InjectRepository(BoardEntity, 'MongoDB')
        private readonly boardRepository: MongoRepository<BoardEntity>,
    ) {}

    createBoard(createBoard: CreateBoardDTO): BoardEntity {
        const {
            author,
            title,
            content,
            imageUrl,
            youtubeUrl,
            password,
            boardAddressInput,
        } = createBoard;

        return this.boardRepository.create({
            author,
            title,
            content,
            password,
            ...(imageUrl?.length > 0 && { imageUrl }),
            ...(youtubeUrl && { youtubeUrl }),
            ...(boardAddressInput && { boardAddressOutput: boardAddressInput }),
        });
    }

    async saveBoard(board: BoardEntity): Promise<BoardEntity> {
        const saveBoard = await this.boardRepository.save(board);
        if (!saveBoard) {
            throw new BadRequestException(
                `Failed to save the board in database`,
            );
        }

        return saveBoard;
    }

    async findAllBoard(
        page: number,
        take: number,
    ): Promise<PaginationResponseDTO> {
        const [result, totalCount] = await this.boardRepository.findAndCount({
            skip: (page - 1) * take,
            take,
            select: ['boardId', 'title', 'author', 'createdAt'],
        });

        return { result, totalCount };
    }

    async findBoard(boardId: number): Promise<BoardEntity> {
        const findBoard = await this.boardRepository.findOne({
            where: { boardId },
        });

        if (!findBoard) {
            throw new NotFoundException(`boardID: ${boardId} is not found`);
        }
        console.log(findBoard);

        return findBoard;
    }

    async updateOne(
        boardId: number,
        updateBoard: UpdateBoardDTO,
    ): Promise<BoardEntity> {
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
        updateBoard: UpdateBoardDTO,
    ): Promise<BoardEntity> {
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

    async countBoard(): Promise<number> {
        return await this.boardRepository.count();
    }
}
