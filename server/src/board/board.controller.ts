// TODO: 1014 - getBoardsCount / pagination
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
    UseInterceptors,
    ParseIntPipe,
    Query,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDTO } from './dto/create-board.dto';
import { UpdateBoardDTO } from './dto/update-board.dto';
import { TransformBoardInterceptor } from 'src/common/interceptors/transform-board.interceptor';
import { ResponseMessage } from './decorators/response-message.decorator';
import { BoardEntity } from './entity/board.entity';
import { PaginationDTO } from './dto/pagination.dto';
import { PaginationResponseDTO } from './dto/pagination-response.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('/api/board')
@UseInterceptors(TransformBoardInterceptor)
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('imageUrl', 3))
    @ResponseMessage('board가 성공적으로 생성되었습니다.')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createBoardDTO: CreateBoardDTO): Promise<BoardEntity> {
        return this.boardService.create(createBoardDTO);
    }

    @Get()
    @ResponseMessage('board 전체를 성공적으로 가져왔습니다.')
    @HttpCode(HttpStatus.OK)
    findAll(@Query() query: PaginationDTO): Promise<PaginationResponseDTO> {
        return this.boardService.findAll(query);
    }

    @Get('/count')
    @ResponseMessage('board의 count 개수를 성공적으로 가져왔습니다.')
    @HttpCode(HttpStatus.OK)
    getBoardCount() {
        return this.boardService.getBoardCount();
    }

    @Get(':boardId')
    @ResponseMessage('board를 성공적으로 가져왔습니다.')
    @HttpCode(HttpStatus.OK)
    findOne(
        @Param('boardId', ParseIntPipe) boardId: number,
    ): Promise<BoardEntity> {
        return this.boardService.findOne(boardId);
    }

    @Put(':boardId')
    @ResponseMessage('board 전체를 성공적으로 수정했습니다.')
    @HttpCode(HttpStatus.OK)
    updateAll(
        @Param('boardId', ParseIntPipe) boardId: number,
        @Body() updateBoardDTO: UpdateBoardDTO,
    ): Promise<BoardEntity> {
        return this.boardService.updateAll(boardId, updateBoardDTO);
    }

    @Delete(':boardId')
    @ResponseMessage('board를 성공적으로 삭제했습니다.')
    @HttpCode(HttpStatus.OK)
    remove(@Param('boardId', ParseIntPipe) boardId: number): Promise<boolean> {
        return this.boardService.remove(boardId);
    }

    @Delete()
    @ResponseMessage('board 전체를 성공적으로 삭제했습니다.')
    @HttpCode(HttpStatus.OK)
    clear(): Promise<boolean> {
        return this.boardService.clear();
    }
}
