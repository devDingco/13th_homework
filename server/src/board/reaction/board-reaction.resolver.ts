import { BoardReaction } from './entities/board-reaction.entity';
import { BoardReactionService } from './board-reaction.service';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => BoardReaction)
export class BoardReactionResolver {
    constructor(private readonly boardReactionService: BoardReactionService) {}

    @Query(() => BoardReaction)
    getBoardReaction(@Args('boardId', { type: () => Int }) boardId: number) {
        return this.boardReactionService.getBoardReaction(boardId);
    }
}
