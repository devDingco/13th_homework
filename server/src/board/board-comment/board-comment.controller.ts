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
    UseInterceptors,
} from '@nestjs/common';
import { BoardCommentService } from './board-comment.service';
import { CreateBoardCommentDto } from './dto/create-board-comment.dto';
import { UpdateBoardCommentDto } from './dto/update-board-comment.dto';
import { ResponseMessage } from '../decorators/response-message.decorator';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';

@Controller('/api/board/:boardId/comment')
@UseInterceptors(TransformInterceptor)
export class BoardCommentController {
    constructor(private readonly boardCommentService: BoardCommentService) {}

    @Post()
    @ResponseMessage('comment가 성공적으로 생성되었습니다.')
    @HttpCode(HttpStatus.CREATED)
    create(
        @Param('boardId', ParseIntPipe) boardId: number,
        @Body() createBoardCommentDto: CreateBoardCommentDto,
    ) {
        return this.boardCommentService.createComment(
            boardId,
            createBoardCommentDto,
        );
    }

    @Get()
    @ResponseMessage('comment 전체가 성공적으로 가져왔습니다.')
    @HttpCode(HttpStatus.OK)
    findAll(@Param('boardId', ParseIntPipe) boardId: number) {
        return this.boardCommentService.findAllComment(boardId);
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
