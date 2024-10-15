import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardCommentService } from './board-comment.service';
import { BoardComment } from './entities/board-comment.entity';
import { CreateBoardCommentDto } from './dto/create-board-comment.dto';
import { BoardCommentResponse } from './responses/board-comment-response.entity';
import { UpdateBoardCommentDto } from './dto/update-board-comment.dto';

@Resolver(() => BoardComment)
export class BoardCommentResolver {
    constructor(private readonly boardCommentService: BoardCommentService) {}

    // @Query(() => [BoardCommentResponse])
    // getBoardComment(@Args('boardId', { type: () => Int }) boardId: number) {
    //     return this.boardCommentService.findAllComment(boardId);
    // }

    @Mutation(() => BoardCommentResponse)
    createBoardComment(
        @Args('boardId', { type: () => Int }) boardId: number,
        @Args('createBoardComment')
        createBoardComment: CreateBoardCommentDto,
    ) {
        return this.boardCommentService.createComment(
            boardId,
            createBoardComment,
        );
    }

    @Mutation(() => BoardCommentResponse)
    updateBoardComment(
        @Args('boardId', { type: () => Int }) boardId: number,
        @Args('updateBoardComment')
        updateBoardComment: UpdateBoardCommentDto,
        @Args('parentId') parentId: string,
    ) {
        const { password, ...restUpdateBoardComment } = updateBoardComment;
        return this.boardCommentService.updateComment(
            boardId,
            restUpdateBoardComment,
            password,
            parentId,
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
