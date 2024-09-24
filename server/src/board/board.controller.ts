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
import {
    ApiExtraModels,
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiBody,
} from '@nestjs/swagger';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { ResponseMessage } from './decorators/response-message.decorator';
import { ResponseDto } from './dto/response.dto';
import { Board } from './entities/board.entity';

@ApiTags('/api/board')
@ApiExtraModels(ResponseDto)
@Controller('/api/board')
@UseInterceptors(TransformInterceptor)
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Post()
    @ApiOperation({ summary: '게시글 생성' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: '게시글 생성 성공',
        type: Board,
        example: {
            data: {
                author: '류지승',
                title: '안녕하세요',
                content: '저는 류지승입니다.',
                imageUrl: ['이미지1', '이미지2'],
                youtubeUrl: 'https://www.youtube.com',
            },
        },
    })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: '잘못된 요청' })
    @ResponseMessage('board가 성공적으로 생성되었습니다.')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createBoardDto: CreateBoardDto) {
        return this.boardService.create(createBoardDto);
    }

    @Get()
    @ApiOperation({ summary: '전체 게시글 조회' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: '게시글 조회 성공',
        type: [Board],
        example: {
            data: {
                message: 'board 전체를 성공적으로 가져왔습니다.',
                statusCode: 200,
                data: [
                    {
                        boardId: 11,
                        author: '류지승',
                        title: '게시글 제목',
                        content: '게시글 내용',
                        createdAt: '2024-09-22T09:51:21.555Z',
                        updatedAt: '2024-09-23T06:47:14.449Z',
                        youtubeUrl: 'https://www.youtube.com',
                    },
                ],
            },
        },
    })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: '잘못된 요청' })
    @ResponseMessage('board 전체를 성공적으로 가져왔습니다.')
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.boardService.findAll();
    }

    @Get(':boardId')
    @ApiOperation({ summary: '특정 게시글 조회' })
    @ApiParam({ name: 'boardId', type: 'integer', description: '게시글 ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: '게시글 조회 성공',
        type: Board,
        example: {
            data: {
                message: 'board를 성공적으로 가져왔습니다.',
                statusCode: 200,
                data: {
                    boardId: 11,
                    author: 'rff4fyu',
                    title: 'hell3o w333orld',
                    content: 'asdf213213lkjjasdfjknasdf',
                    createdAt: '2024-09-22T09:51:21.555Z',
                    updatedAt: '2024-09-23T06:47:14.449Z',
                    youtubeUrl: 'https://www.youtube.com',
                },
            },
        },
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: '게시글을 찾을 수 없음',
    })
    @ResponseMessage('board를 성공적으로 가져왔습니다.')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('boardId', ParseIntPipe) boardId: number) {
        return this.boardService.findOne(boardId);
    }

    @Patch(':boardId')
    @ApiOperation({ summary: '특정 게시글 일부 수정' })
    @ApiParam({ name: 'boardId', type: 'integer', description: '게시글 ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: '게시글 수정 성공',
        type: Board,

        example: {
            value: {
                author: '류지승',
                title: '수정된 제목',
                content: '수정된 내용',
                imageUrl: ['이미지1', '이미지2'],
                youtubeUrl: 'https://www.youtube.com',
            },
        },
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: '게시글을 찾을 수 없음',
    })
    @ApiBody({
        description: '게시글 수정 데이터',
        required: true,
        schema: {
            example: {
                author: '류지승',
                title: '수정된 제목',
                content: '수정된 내용',
                imageUrl: ['이미지1', '이미지2'],
                youtubeUrl: 'https://www.youtube.com',
            },
        },
    })
    @ResponseMessage('board를 성공적으로 수정했습니다.')
    @HttpCode(HttpStatus.OK)
    updateOne(
        @Param('boardId', ParseIntPipe) boardId: number,
        @Body() updateBoardDto: UpdateBoardDto,
    ) {
        return this.boardService.updateOne(boardId, updateBoardDto);
    }

    @Put(':boardId')
    @ApiOperation({ summary: '특정 게시글 전체 수정' })
    @ApiParam({ name: 'boardId', type: 'integer', description: '게시글 ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: '게시글 전체 수정 성공',
        type: Board,
        example: {
            data: {
                author: '류지승',
                title: '수정된 제목',
                content: '수정된 내용',
                imageUrl: ['이미지1', '이미지2'],
                youtubeUrl: 'https://www.youtube.com',
            },
        },
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: '게시글을 찾을 수 없음',
    })
    @ResponseMessage('board 전체를 성공적으로 수정했습니다.')
    @HttpCode(HttpStatus.OK)
    updateAll(
        @Param('boardId', ParseIntPipe) boardId: number,
        @Body() updateBoardDto: CreateBoardDto,
    ) {
        return this.boardService.updateAll(boardId, updateBoardDto);
    }

    @Delete(':boardId')
    @ApiOperation({ summary: '특정 게시글 삭제' })
    @ApiParam({ name: 'boardId', type: 'integer', description: '게시글 ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: '게시글 삭제 성공',
        example: {
            message: 'board를 성공적으로 삭제했습니다.',
            statusCode: 200,
        },
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: '게시글을 찾을 수 없음',
    })
    @ResponseMessage('board를 성공적으로 삭제했습니다.')
    @HttpCode(HttpStatus.OK)
    remove(@Param('boardId', ParseIntPipe) boardId: number) {
        return this.boardService.remove(boardId);
    }

    @Delete()
    @ApiOperation({
        summary: '전체 게시글 삭제 - 함부로 쓰면 류지승이 화낼 예정',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: '전체 게시글 삭제 성공',
        example: {
            message: 'board 전체를 성공적으로 삭제했습니다.',
            statusCode: 200,
        },
    })
    @ResponseMessage('board 전체를 성공적으로 삭제했습니다.')
    @HttpCode(HttpStatus.OK)
    clear() {
        return this.boardService.clear();
    }
}
