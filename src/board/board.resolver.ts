import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { BoardSchema } from './schema/board.schema';
import { CreateBoardInput } from './schema/create-board-input.schema';
import { UpdateBoardInput } from './schema/update-board-input.schema';
import { BoardPaginationResponse } from './schema/board-pagination-response.schema';

@Resolver(() => BoardSchema)
export class BoardResolver {
    constructor(private readonly boardService: BoardService) {}

    @Query(() => BoardPaginationResponse)
    getBoards(
        @Args('page', { type: () => Int, nullable: true }) page: number = 1,
        @Args('take', { type: () => Int, nullable: true }) take: number = 5,
    ) {
        return this.boardService.findAll({ page, take });
    }

    @Query(() => BoardSchema)
    getBoard(@Args('boardId', { type: () => Int }) boardId: number) {
        return this.boardService.findOne(boardId);
    }

    @Mutation(() => BoardSchema)
    createBoard(
        @Args('createBoardInput')
        createBoard: CreateBoardInput,
    ) {
        return this.boardService.create(createBoard);
    }

    @Mutation(() => BoardSchema)
    updateBoard(
        @Args('boardId', { type: () => Int }) boardId: number,
        @Args('updateBoardInput') updateBoard: UpdateBoardInput,
    ) {
        return this.boardService.updateAll(boardId, updateBoard);
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
