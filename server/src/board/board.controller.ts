import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Post()
    create(@Body() createBoardDto: CreateBoardDto) {
        return this.boardService.create(createBoardDto);
    }

    @Get()
    findAll() {
        return this.boardService.findAll();
    }

    @Get(':boardId')
    findOne(@Param('boardId') boardId: number) {
        return this.boardService.findOne(boardId);
    }

    @Patch(':boardId')
    update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
        return this.boardService.update(+id, updateBoardDto);
    }

    @Delete(':boardId')
    @HttpCode(204)
    remove(@Param('boardId') boardId: number) {
        return this.boardService.remove(boardId);
    }
}
