import { BoardReactionService } from './board-reaction.service';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { BoardReactionSchema } from './schema/board-reaction.schema';

@Resolver(() => BoardReactionSchema)
export class BoardReactionResolver {
    constructor(private readonly boardReactionService: BoardReactionService) {}

    @Query(() => BoardReactionSchema)
    getBoardReaction(@Args('boardId', { type: () => Int }) boardId: number) {
        return this.boardReactionService.getBoardReaction(boardId);
    }
}
