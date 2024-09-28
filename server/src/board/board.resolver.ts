import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@Resolver(() => Board)
export class BoardResolver {
    constructor(private readonly boardService: BoardService) {}

    @Query(() => [Board])
    getBoards() {
        return this.boardService.findAll();
    }

    @Query(() => Board)
    getBoard(@Args('boardId', { type: () => Int }) boardId: number) {
        return this.boardService.findOne(boardId);
    }

    @Mutation(() => Board)
    createBoard(@Args('data') data: CreateBoardDto) {
        return this.boardService.create(data);
    }

    @Mutation(() => Board)
    updateBoard(
        @Args('boardId', { type: () => Int }) boardId: number,
        @Args('data') data: CreateBoardDto,
    ) {
        return this.boardService.updateOne(boardId, data);
    }

    @Mutation(() => Board)
    updateBoards(
        @Args('boardId', { type: () => Int }) boardId: number,
        @Args('data') data: CreateBoardDto,
    ) {
        return this.boardService.updateAll(boardId, data);
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
