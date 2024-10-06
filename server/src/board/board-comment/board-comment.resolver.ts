import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardCommentService } from './board-comment.service';
import { BoardComment } from './entities/board-comment.entity';
import { CreateBoardCommentDto } from './dto/create-board-comment.dto';
import { UpdateBoardCommentDto } from './dto/update-board-comment.dto';

@Resolver(() => BoardComment)
export class BoardCommentResolver {
    constructor(private readonly boardCommentService: BoardCommentService) {}

    @Query(() => [BoardComment])
    getAllBoardComment(@Args('boardId', { type: () => Int }) boardId: number) {
        return this.boardCommentService.findAllComment(boardId);
    }

    @Mutation(() => BoardComment)
    createBoardComment(
        @Args('boardId', { type: () => Int }) boardId: number,
        @Args('createBoardCommentDTO')
        createBoardCommentDTO: CreateBoardCommentDto,
    ) {
        return this.boardCommentService.createComment(
            boardId,
            createBoardCommentDTO,
        );
    }

    @Mutation(() => Boolean)
    updateBoardComment(
        @Args('boardId', { type: () => Int }) boardId: number,
        @Args('updateBoardCommentDTO')
        updateBoardCommentDTO: UpdateBoardCommentDto,
        @Args('password') password: string,
        @Args('commentId') commentId: string,
    ) {
        return this.boardCommentService.updateComment(
            boardId,
            updateBoardCommentDTO,
            password,
            commentId,
        );
    }

    @Mutation(() => Boolean)
    deleteBoardComment(
        @Args('boardId', { type: () => Int }) boardId: number,
        @Args('commentId') commentId: string,
    ) {
        return this.boardCommentService.removeComment(boardId, commentId);
    }
}
