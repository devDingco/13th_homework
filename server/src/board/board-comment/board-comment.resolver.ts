import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardCommentService } from './board-comment.service';

import { BoardCommentResponseDTO } from './dto/board-comment-response.dto';

import { BoardCommentSchema } from './schema/board-comment.schema';
import { CreateBoardCommentInput } from './schema/create-board-comment-input.schema';
import { UpdateBoardCommentInput } from './schema/update-board-comment-input.schema';

@Resolver(() => BoardCommentSchema)
export class BoardCommentResolver {
    constructor(private readonly boardCommentService: BoardCommentService) {}

    @Query(() => [BoardCommentResponseDTO])
    getBoardComment(
        @Args('boardId', { type: () => Int }) boardId: number,
        @Args('page', { type: () => Int, nullable: true }) page: number = 1,
    ) {
        return this.boardCommentService.findAllComment(boardId, page);
    }

    @Mutation(() => BoardCommentResponseDTO)
    createBoardComment(
        @Args('boardId', { type: () => Int }) boardId: number,
        @Args('boardComment')
        createBoardComment: CreateBoardCommentInput,
    ) {
        return this.boardCommentService.createComment(
            boardId,
            createBoardComment,
        );
    }

    @Mutation(() => BoardCommentResponseDTO)
    updateBoardComment(
        @Args('boardId', { type: () => Int }) boardId: number,
        @Args('updateBoardComment')
        updateBoardComment: UpdateBoardCommentInput,
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
