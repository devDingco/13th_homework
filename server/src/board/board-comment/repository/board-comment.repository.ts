import { InjectRepository } from '@nestjs/typeorm';
import { BoardCommentEntity } from '../entity/board-comment.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { CreateBoardCommentDTO } from '../dto/create-board-comment.dto';
import { ObjectId } from 'mongodb';
import { BoardCommentResponseDTO } from '../dto/board-comment-response.dto';
import { UpdateBoardCommentExceptPasswordDTO } from '../dto/update-board-except-password-comment.dto';

@Injectable()
export class BoardCommentRepository {
    constructor(
        @InjectRepository(BoardCommentEntity, 'MongoDB')
        private readonly boardCommentRepository: MongoRepository<BoardCommentEntity>,
    ) {}

    async findComment(id: string) {
        return await this.boardCommentRepository.findOne({
            where: { _id: new ObjectId(id) },
        });
    }

    createComment(
        boardId: number,
        {
            author,
            password,
            content,
            rating,
            parentId = null,
        }: CreateBoardCommentDTO,
    ): BoardCommentEntity {
        return this.boardCommentRepository.create({
            author,
            password,
            content,
            rating,
            boardId,
            parentId,
        });
    }

    async saveComment(
        comment: BoardCommentEntity,
    ): Promise<BoardCommentEntity> {
        return await this.boardCommentRepository.save(comment);
    }

    async findAllComment(boardId: number): Promise<BoardCommentEntity[]> {
        return await this.boardCommentRepository.find({
            where: { boardId },
            order: { createdAt: 'ASC' },
        });
    }

    async updateComment(
        commentId: string,
        updateBoardCommentDto: UpdateBoardCommentExceptPasswordDTO,
    ): Promise<BoardCommentResponseDTO> {
        const updateBoardDB = await this.boardCommentRepository.update(
            new ObjectId(commentId),
            updateBoardCommentDto,
        );

        if (updateBoardDB.affected === 0) {
            throw new NotFoundException(
                `commentId: ${commentId} is not update`,
            );
        }

        return await this.boardCommentRepository.findOneBy({
            _id: new ObjectId(commentId),
        });
    }

    async deleteComment(parentId: string): Promise<void> {
        const deleteComment = await this.findComment(parentId);

        await this.boardCommentRepository.remove(deleteComment);
        await this.boardCommentRepository.delete({
            parentId,
        });
    }

    async deleteAllComment(boardId: number): Promise<boolean> {
        const deleteAllComment = await this.boardCommentRepository.delete({
            boardId,
        });

        if (!deleteAllComment) {
            throw new NotFoundException(`boardId: ${boardId} is not found`);
        }

        return true;
    }

    async clearComment(): Promise<void> {
        await this.boardCommentRepository.clear();
    }
}
