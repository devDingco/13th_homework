import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    Put,
    HttpStatus,
    UseInterceptors,
    ParseIntPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { ResponseMessage } from './decorators/response-message.decorator';

@Controller('/api/board')
@UseInterceptors(TransformInterceptor)
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Post()
    @ResponseMessage('board가 성공적으로 생성되었습니다.')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createBoardDto: CreateBoardDto) {
        return this.boardService.create(createBoardDto);
    }

    @Get()
    @ResponseMessage('board 전체를 성공적으로 가져왔습니다.')
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.boardService.findAll();
    }

    @Get(':boardId')
    @ResponseMessage('board를 성공적으로 가져왔습니다.')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('boardId', ParseIntPipe) boardId: number) {
        return this.boardService.findOne(boardId);
    }

    @Patch(':boardId')
    @ResponseMessage('board를 성공적으로 수정했습니다.')
    @HttpCode(HttpStatus.OK)
    updateOne(
        @Param('boardId', ParseIntPipe) boardId: number,
        @Body() updateBoardDto: UpdateBoardDto,
    ) {
        return this.boardService.updateOne(boardId, updateBoardDto);
    }

    @Put(':boardId')
    @ResponseMessage('board 전체를 성공적으로 수정했습니다.')
    @HttpCode(HttpStatus.OK)
    updateAll(
        @Param('boardId', ParseIntPipe) boardId: number,
        @Body() updateBoardDto: CreateBoardDto,
    ) {
        return this.boardService.updateAll(boardId, updateBoardDto);
    }

    @Delete(':boardId')
    @ResponseMessage('board를 성공적으로 삭제했습니다.')
    @HttpCode(HttpStatus.OK)
    remove(@Param('boardId', ParseIntPipe) boardId: number) {
        return this.boardService.remove(boardId);
    }

    @Delete()
    @ResponseMessage('board 전체를 성공적으로 삭제했습니다.')
    @HttpCode(HttpStatus.OK)
    clear() {
        return this.boardService.clear();
    }
}
