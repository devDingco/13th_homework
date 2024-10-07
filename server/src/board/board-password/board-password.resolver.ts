import { BoardPasswordDTO } from './entities/board-password.dto';
import { BoardPasswordService } from './board-password.service';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';

@Resolver(() => BoardPasswordDTO)
export class BoardPasswordResolver {
    constructor(private readonly boardPasswordService: BoardPasswordService) {}

    @Mutation(() => Boolean)
    validateBoardData(
        @Args('boardId', { type: () => Int }) boardId: number,
        @Args('boardPasswordDTO') boardPasswordDTO: BoardPasswordDTO,
    ) {
        return this.boardPasswordService.validateBoardData(
            boardId,
            boardPasswordDTO.password,
        );
    }
}
