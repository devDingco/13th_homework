import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardResponseDto } from './dto/board-response.dto';

@Resolver(() => Board)
export class BoardResolver {
    constructor(private readonly boardService: BoardService) {}

    @Query(() => [BoardResponseDto])
    getBoards() {
        return this.boardService.findAll();
    }

    @Query(() => BoardResponseDto)
    getBoard(@Args('boardId', { type: () => Int }) boardId: number) {
        return this.boardService.findOne(boardId);
    }

    @Mutation(() => BoardResponseDto)
    createBoard(@Args('createBoardDto') createBoardDto: CreateBoardDto) {
        return this.boardService.create(createBoardDto);
    }

    @Mutation(() => BoardResponseDto)
    updateBoard(
        @Args('boardId', { type: () => Int }) boardId: number,
        @Args('createBoardDto') createBoardDto: CreateBoardDto,
    ) {
        return this.boardService.updateOne(boardId, createBoardDto);
    }

    @Mutation(() => BoardResponseDto)
    updateBoards(
        @Args('boardId', { type: () => Int }) boardId: number,
        @Args('createBoardDto') createBoardDto: CreateBoardDto,
    ) {
        return this.boardService.updateAll(boardId, createBoardDto);
    }

    @Mutation(() => Boolean)
    deleteBoard(@Args('boardId', { type: () => Int }) boardId: number) {
        return this.boardService.remove(boardId);
    }

    @Mutation(() => Boolean)
    async clearBoard() {
        await this.boardService.clear();
        return true;
    }
}
