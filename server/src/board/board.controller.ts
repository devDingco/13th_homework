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
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    create(@Body() createBoardDto: CreateBoardDto) {
        return this.boardService.create(createBoardDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.boardService.findAll();
    }

    @Get(':boardId')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('boardId') boardId: number) {
        return this.boardService.findOne(boardId);
    }

    @Patch(':boardId')
    @HttpCode(HttpStatus.OK)
    updateOne(
        @Param('boardId') boardId: number,
        @Body() updateBoardDto: UpdateBoardDto,
    ) {
        return this.boardService.updateOne(boardId, updateBoardDto);
    }

    @Put(':boardId')
    @HttpCode(HttpStatus.OK)
    updateAll(
        @Param('boardId') boardId: number,
        @Body() updateBoardDto: CreateBoardDto,
    ) {
        return this.boardService.updateAll(boardId, updateBoardDto);
    }

    @Delete(':boardId')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('boardId') boardId: number) {
        return this.boardService.remove(boardId);
    }

    @Delete()
    @HttpCode(HttpStatus.NO_CONTENT)
    clear() {
        return this.boardService.clear();
    }
}
