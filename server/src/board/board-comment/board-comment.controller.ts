import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    ParseIntPipe,
    UseInterceptors,
    Put,
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

    @Put(':commentId')
    @ResponseMessage('comment가 성공적으로 수정했습니다.')
    @HttpCode(HttpStatus.OK)
    update(
        @Param('boardId', ParseIntPipe) boardId: number,
        @Param('commentId') commentId: string,
        @Body() updateBoardCommentDto: UpdateBoardCommentDto,
    ) {
        const { password, ...restUpdateBoardComment } = updateBoardCommentDto;
        return this.boardCommentService.updateComment(
            boardId,
            restUpdateBoardComment,
            password,
            commentId,
        );
    }

    @Delete(':commentId')
    @ResponseMessage('comment를 성공적으로 삭제했습니다.')
    @HttpCode(HttpStatus.OK)
    remove(
        @Param('boardId', ParseIntPipe) boardId: number,
        @Param('commentId') commentId: string,
    ) {
        return this.boardCommentService.removeComment(boardId, commentId);
    }
}
