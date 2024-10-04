import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { BoardComment } from './entities/board-comment.entity';
import { BoardCommentRepository } from './board-comment.repository';
import { BoardRepository } from '../repositories/board.repository';
import { BoardService } from '../board.service';
// import { BoardCommentRepository } from './board-comment.repository';
import { CreateBoardCommentDto } from './dto/create-board-comment.dto';
import { UpdateBoardCommentDto } from './dto/update-board-comment.dto';

//     private readonly boardCommentRepository: BoardCommentRepository,
@Injectable()
export class BoardCommentService {
    constructor(
        private readonly boardService: BoardService,
        private readonly boardCommentRepository: BoardCommentRepository,
        private readonly boardRepsitory: BoardRepository,
    ) {}
    async createComment(
        boardId: number,
        createBoardCommentDto: CreateBoardCommentDto,
    ): Promise<BoardComment> {
        const isExistBoard = await this.boardRepsitory.findBoard(boardId);

        if (!isExistBoard) {
            throw new NotFoundException(
                `boardID: ${boardId} is not found in Board`,
            );
        }

        if (createBoardCommentDto.parentId) {
            const isExistParentComment =
                await this.boardCommentRepository.findCommentById(
                    createBoardCommentDto.parentId,
                );
            if (!isExistParentComment) {
                throw new BadRequestException('Parent comment not found');
            }
        }

        const hashPassword: string = await this.boardService.transformPassword(
            createBoardCommentDto.password,
        );

        const comment: BoardComment = this.boardCommentRepository.createComment(
            boardId,
            {
                ...createBoardCommentDto,
                password: hashPassword,
            },
        );

        return await this.boardCommentRepository.saveComment(comment);
    }

    findAll() {
        return `This action returns all boardComment`;
    }

    findOne(id: number) {
        return `This action returns a #${id} boardComment`;
    }

    update(id: number, updateBoardCommentDto: UpdateBoardCommentDto) {
        return `This action updates a #${id} boardComment`;
    }

    remove(id: number) {
        return `This action removes a #${id} boardComment`;
    }
}
