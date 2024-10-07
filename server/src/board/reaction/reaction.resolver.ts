import { BoardReaction } from './entities/reaction.entity';
import { ReactionService } from './reaction.service';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => BoardReaction)
export class BoardReactionResolver {
    constructor(private readonly reactionService: ReactionService) {}

    @Query(() => BoardReaction)
    getBoardReaction(@Args('boardId', { type: () => Int }) boardId: number) {
        return this.reactionService.getBoardReaction(boardId);
    }
}
