import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
} from '@nestjs/common';
import { ResponseMessage } from '../decorators/response-message.decorator';
import { BoardPasswordService } from './board-password.service';
import { BoardPasswordBodyDTO } from './board-password-body.dto';

@Controller('/api/board/:boardId/password')
export class BoardPasswordController {
    constructor(private readonly boardPasswordService: BoardPasswordService) {}

    @Post()
    @ResponseMessage('password가 일치합니다.')
    @HttpCode(HttpStatus.OK)
    validateBoardData(
        @Param('boardId', ParseIntPipe) boardId: number,
        @Body() body: BoardPasswordBodyDTO,
    ): Promise<boolean> {
        return this.boardPasswordService.validateBoardData(
            boardId,
            body.password,
        );
    }
}
