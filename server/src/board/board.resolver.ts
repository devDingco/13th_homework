import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';

@Resolver(() => Board)
export class BoardResolver {
    constructor(private readonly boardService: BoardService) {}

    @Query(() => [Board])
    boards() {
        return this.boardService.findAll();
    }

    @Query(() => Board)
    board(@Args('boardId', { type: () => Int }) boardId: number) {
        return this.boardService.findOne(boardId);
    }

    // @Mutation(() => Board)
    // createBoard(@Args('data') data) {
    //     return this.boardService.create(data);
    // }

    // @Mutation(() => Board)
    // updateBoard(@Args('id') id: number, @Args('data') data) {
    //     return this.boardService.updateOne(id, data);
    // }

    // @Mutation(() => Boolean)
    // deleteBoard(@Args('id') id: number) {
    //     return this.boardService.remove(id);
    // }
}
