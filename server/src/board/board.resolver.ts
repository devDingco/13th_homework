import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardResponseDto } from './dto/board-response.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

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
    createBoard(@Args('createBoard') createBoard: CreateBoardDto) {
        return this.boardService.create(createBoard);
    }

    @Mutation(() => BoardResponseDto)
    updateBoard(
        @Args('boardId', { type: () => Int }) boardId: number,
        @Args('updateBoard') updateBoard: UpdateBoardDto,
    ) {
        return this.boardService.updateOne(boardId, updateBoard);
    }

    @Mutation(() => Boolean)
    deleteBoard(@Args('boardId', { type: () => Int }) boardId: number) {
        return this.boardService.remove(boardId);
    }

    @Mutation(() => Boolean)
    clearBoard() {
        return this.boardService.clear();
    }
}
