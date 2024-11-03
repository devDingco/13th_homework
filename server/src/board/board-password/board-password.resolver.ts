import { BoardPasswordService } from './board-password.service';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';

@Resolver(() => Boolean)
export class BoardPasswordResolver {
    constructor(private readonly boardPasswordService: BoardPasswordService) {}

    @Mutation(() => Boolean)
    isPasswordCorrect(
        @Args('boardId', { type: () => Int }) boardId: number,
        @Args('password') password: string,
    ) {
        return this.boardPasswordService.validateBoardData(boardId, password);
    }
}
