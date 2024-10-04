import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    ParseIntPipe,
} from '@nestjs/common';
import { BoardCommentService } from './board-comment.service';
import { CreateBoardCommentDto } from './dto/create-board-comment.dto';
import { UpdateBoardCommentDto } from './dto/update-board-comment.dto';
import { ResponseMessage } from '../decorators/response-message.decorator';

@Controller('/api/board/:boardId/comment')
export class BoardCommentController {
    constructor(private readonly boardCommentService: BoardCommentService) {}

    @Post()
    @ResponseMessage('comment가 성공적으로 생성되었습니다.')
    @HttpCode(HttpStatus.CREATED)
    create(
        @Param(':boardId', ParseIntPipe) boardId: number,
        @Body() createBoardCommentDto: CreateBoardCommentDto,
    ) {
        return this.boardCommentService.create(boardId, createBoardCommentDto);
    }

    @Get()
    findAll() {
        return this.boardCommentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.boardCommentService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateBoardCommentDto: UpdateBoardCommentDto,
    ) {
        return this.boardCommentService.update(+id, updateBoardCommentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.boardCommentService.remove(+id);
    }
}
