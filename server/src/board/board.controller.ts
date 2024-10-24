import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    HttpCode,
    Put,
    HttpStatus,
    ParseIntPipe,
    Query,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDTO } from './dto/create-board.dto';
import { UpdateBoardDTO } from './dto/update-board.dto';
import { ResponseMessage } from './decorators/response-message.decorator';
import { BoardEntity } from './entity/board.entity';
import { PaginationDTO } from './dto/pagination.dto';
import { PaginationResponseDTO } from './dto/pagination-response.dto';

@Controller('/api/board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Post()
    @ResponseMessage('board가 성공적으로 생성되었습니다.')
    @HttpCode(HttpStatus.CREATED)
    createBoard(@Body() createBoardDTO: CreateBoardDTO): Promise<BoardEntity> {
        return this.boardService.create(createBoardDTO);
    }

    @Get()
    @ResponseMessage('board 전체를 성공적으로 가져왔습니다.')
    @HttpCode(HttpStatus.OK)
    getBoards(@Query() query: PaginationDTO): Promise<PaginationResponseDTO> {
        return this.boardService.findAll(query);
    }

    @Get(':boardId')
    @ResponseMessage('board를 성공적으로 가져왔습니다.')
    @HttpCode(HttpStatus.OK)
    getBoard(
        @Param('boardId', ParseIntPipe) boardId: number,
    ): Promise<BoardEntity> {
        return this.boardService.findOne(boardId);
    }

    @Put(':boardId')
    @ResponseMessage('board 전체를 성공적으로 수정했습니다.')
    @HttpCode(HttpStatus.OK)
    updateBoard(
        @Param('boardId', ParseIntPipe) boardId: number,
        @Body() updateBoardDTO: UpdateBoardDTO,
    ): Promise<BoardEntity> {
        return this.boardService.updateAll(boardId, updateBoardDTO);
    }

    @Delete(':boardId')
    @ResponseMessage('board를 성공적으로 삭제했습니다.')
    @HttpCode(HttpStatus.OK)
    removeBoard(
        @Param('boardId', ParseIntPipe) boardId: number,
    ): Promise<boolean> {
        return this.boardService.remove(boardId);
    }

    @Delete()
    @ResponseMessage('board 전체를 성공적으로 삭제했습니다.')
    @HttpCode(HttpStatus.OK)
    clearBoard(): Promise<boolean> {
        return this.boardService.clear();
    }
}
