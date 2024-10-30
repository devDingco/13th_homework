import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
} from '@nestjs/common';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { BoardPasswordService } from './board-password.service';
import { BoardPasswordDTO } from './dto/board-password.dto';

@Controller('/api/board/:boardId/password')
export class BoardPasswordController {
    constructor(private readonly boardPasswordService: BoardPasswordService) {}

    @Post()
    @ResponseMessage('password가 일치합니다.')
    @HttpCode(HttpStatus.OK)
    validateBoardData(
        @Param('boardId', ParseIntPipe) boardId: number,
        @Body() body: BoardPasswordDTO,
    ): Promise<boolean> {
        return this.boardPasswordService.validateBoardData(
            boardId,
            body.password,
        );
    }
}
