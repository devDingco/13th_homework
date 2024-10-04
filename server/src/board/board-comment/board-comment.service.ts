import * as bcrypt from 'bcrypt';

import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';

import { BoardComment } from './entities/board-comment.entity';
import { BoardCommentRepository } from './board-comment.repository';
import { BoardPasswordService } from '../board-password/board-password.service';
import { BoardRepository } from '../repositories/board.repository';
import { BoardService } from '../board.service';
import { CreateBoardCommentDto } from './dto/create-board-comment.dto';
import { UpdateBoardCommentDto } from './dto/update-board-comment.dto';

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
        await this.isExistBoard(boardId);
        if (createBoardCommentDto.parentId) {
            await this.isExistParentComment(createBoardCommentDto.parentId);
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

    async findAllComment(boardId: number): Promise<BoardComment[]> {
        await this.isExistBoard(boardId);

        return this.boardCommentRepository.findAllComment(boardId);
    }

    async updateComment(
        boardId: number,
        updateBoardCommentDto: UpdateBoardCommentDto,
        password: string,
        commentId: string,
    ) {
        await this.isExistBoard(boardId);

        if (updateBoardCommentDto.parentId) {
            await this.isExistParentComment(updateBoardCommentDto.parentId);
        }
        await this.validateBoardComment(commentId, password);
    }

    remove(id: number) {
        return `This action removes a #${id} boardComment`;
    }

    async isExistBoard(boardId: number): Promise<void> {
        const isExist = await this.boardRepsitory.findBoard(boardId);

        if (!isExist) {
            throw new NotFoundException(
                `boardID: ${boardId} is not found in Board`,
            );
        }
    }

    async isExistParentComment(parentId: string): Promise<void> {
        const isExistParentComment =
            await this.boardCommentRepository.findCommentById(parentId);
        if (!isExistParentComment) {
            throw new BadRequestException(
                `Parent ID ${parentId} comment not found`,
            );
        }
    }

    async validateBoardComment(
        commentId: string,
        password: string,
    ): Promise<void> {
        const comment =
            await this.boardCommentRepository.findComment(commentId);

        if (!comment) {
            throw new NotFoundException(`commentId ${commentId} is not found`);
        }

        const validatePassword = await bcrypt.compare(
            password,
            comment.password,
        );

        if (!validatePassword) {
            throw new UnauthorizedException(`password is invalid`);
        }
    }
}
