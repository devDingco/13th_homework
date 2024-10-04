import { BoardCommentRepository } from './board-comment.repository';
import { CreateBoardCommentDto } from './dto/create-board-comment.dto';
import { Injectable } from '@nestjs/common';
import { UpdateBoardCommentDto } from './dto/update-board-comment.dto';

@Injectable()
export class BoardCommentService {
    constructor(
        private readonly boardCommentRepository: BoardCommentRepository,
    ) {}
    create(boardId: number, createBoardCommentDto: CreateBoardCommentDto) {
        return 'This action adds a new boardComment';
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
