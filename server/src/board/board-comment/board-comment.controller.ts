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
    Put,
    Query,
    DefaultValuePipe,
} from '@nestjs/common';
import { BoardCommentService } from './board-comment.service';
import { CreateBoardCommentDTO } from './dto/create-board-comment.dto';
import { UpdateBoardCommentDTO } from './dto/update-board-comment.dto';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';

@Controller('/api/board/:boardId/comment')
export class BoardCommentController {
    constructor(private readonly boardCommentService: BoardCommentService) {}

    @Post()
    @ResponseMessage('comment가 성공적으로 생성되었습니다.')
    @HttpCode(HttpStatus.CREATED)
    create(
        @Param('boardId', ParseIntPipe) boardId: number,
        @Body() createBoardComment: CreateBoardCommentDTO,
    ) {
        return this.boardCommentService.createComment(
            boardId,
            createBoardComment,
        );
    }

    @Get()
    @ResponseMessage('comment 전체가 성공적으로 가져왔습니다.')
    @HttpCode(HttpStatus.OK)
    findAll(
        @Param('boardId', ParseIntPipe) boardId: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    ) {
        return this.boardCommentService.findAllComment(boardId, page);
    }

    @Put(':commentId')
    @ResponseMessage('comment가 성공적으로 수정했습니다.')
    @HttpCode(HttpStatus.OK)
    update(
        @Param('boardId', ParseIntPipe) boardId: number,
        @Param('commentId') commentId: string,
        @Body() updateBoardComment: UpdateBoardCommentDTO,
    ) {
        const { password, ...restUpdateBoardComment } = updateBoardComment;
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
