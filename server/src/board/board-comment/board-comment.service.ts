import * as bcrypt from 'bcrypt';

import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';

import { BoardCommentEntity } from './entity/board-comment.entity';
import { BoardCommentRepository } from './board-comment.repository';
import { BoardCommentResponseDTO } from './dto/board-comment-response.dto';
import { BoardRepository } from '../repository/board.repository';
import { BoardService } from '../board.service';
import { CreateBoardCommentDTO } from './dto/create-board-comment.dto';
import { UpdateBoardCommentExceptPasswordDTO } from './dto/update-board-except-password-comment.dto';

@Injectable()
export class BoardCommentService {
    constructor(
        private readonly boardService: BoardService,
        private readonly boardCommentRepository: BoardCommentRepository,
        private readonly boardRepsitory: BoardRepository,
    ) {}
    async createComment(
        boardId: number,
        createBoardCommentDto: CreateBoardCommentDTO,
    ): Promise<BoardCommentEntity> {
        await this.isExistBoard(boardId);

        const { parentId } = createBoardCommentDto;

        if (parentId) {
            await this.isExistParentComment(parentId);
        }

        const password: string = await this.boardService.transformPassword(
            createBoardCommentDto.password,
        );

        const comment: BoardCommentEntity =
            this.boardCommentRepository.createComment(boardId, {
                ...createBoardCommentDto,
                password,
            });

        return await this.boardCommentRepository.saveComment(comment);
    }

    async findAllComment(
        boardId: number,
        page: number,
    ): Promise<BoardCommentResponseDTO[]> {
        await this.isExistBoard(boardId);

        const boardComments =
            await this.boardCommentRepository.findAllComment(boardId);

        const restBoardComments = boardComments.map((item) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...rest } = item;
            return rest;
        });

        const commentBoardList = this.makeCommentMap(restBoardComments);

        if (commentBoardList.length === 0) return [];
        this.isInvalidPage(commentBoardList.length, page);

        return commentBoardList.filter(
            (_, index) => index >= 3 * (page - 1) && index < 3 * page,
        );
    }

    async updateComment(
        boardId: number,
        updateBoardCommentDto: UpdateBoardCommentExceptPasswordDTO,
        password: string,
        commentId: string,
    ): Promise<BoardCommentResponseDTO> {
        await this.isExistBoard(boardId);

        if (updateBoardCommentDto.parentId) {
            await this.isExistParentComment(updateBoardCommentDto.parentId);
        }

        await this.validateBoardComment(commentId, password);
        return this.boardCommentRepository.updateComment(
            commentId,
            updateBoardCommentDto,
        );
    }

    async removeComment(boardId: number, commentId: string): Promise<boolean> {
        await this.isExistBoard(boardId);
        await this.boardCommentRepository.deleteComment(commentId);
        return true;
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
            await this.boardCommentRepository.findComment(parentId);
        if (!isExistParentComment) {
            throw new BadRequestException(
                `Parent ID ${parentId} comment not found`,
            );
        } else if (isExistParentComment.parentId) {
            throw new NotFoundException(`commnetId ${parentId} have parentId`);
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

    makeCommentMap(boardComments: BoardCommentResponseDTO[]) {
        const commentMap = new Map<string, any>();

        boardComments.forEach((comment) => {
            if (!comment.parentId) {
                commentMap.set(comment._id.toString(), {
                    ...comment,
                    replies: [],
                });
            } else {
                const parentComment = commentMap.get(
                    comment.parentId.toString(),
                );
                if (parentComment) {
                    parentComment.replies.push(comment);
                }
            }
        });
        return Array.from(commentMap.values());
    }

    isInvalidPage(length: number, page: number) {
        if (page === 1) return;
        if (3 * page > length) {
            throw new BadRequestException(
                `page: ${page} is over. max length: ${length}`,
            );
        }
    }
}
