import { BoardPasswordDTO } from './board-password.dto';
import { BoardPasswordService } from './board-password.service';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';

@Resolver(() => BoardPasswordDTO)
export class BoardPasswordResolver {
    constructor(private readonly boardPasswordService: BoardPasswordService) {}

    @Mutation(() => Boolean)
    validateBoardData(
        @Args('boardId', { type: () => Int }) boardId: number,
        @Args('data') data: BoardPasswordDTO,
    ) {
        return this.boardPasswordService.validateBoardData(
            boardId,
            data.password,
        );
    }
}
