import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardCommentService } from './board-comment.service';
import { BoardComment } from './entities/board-comment.entity';
import { CreateBoardCommentDto } from './dto/create-board-comment.dto';
import { BoardCommentResponse } from './responses/board-comment-response.entity';
import { UpdateBoardCommentDto } from './dto/update-board-comment.dto';

@Resolver(() => BoardComment)
export class BoardCommentResolver {
    constructor(private readonly boardCommentService: BoardCommentService) {}

    @Query(() => [BoardCommentResponse])
    getAllBoardComment(@Args('boardId', { type: () => Int }) boardId: number) {
        return this.boardCommentService.findAllComment(boardId);
    }

    @Mutation(() => BoardCommentResponse)
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

    @Mutation(() => BoardCommentResponse)
    updateBoardComment(
        @Args('boardId', { type: () => Int }) boardId: number,
        @Args('updateBoardCommentDTO')
        updateBoardCommentDTO: UpdateBoardCommentDto,
        @Args('parentId') parentId: string,
    ) {
        const { password, ...restUpdateBoardComment } = updateBoardCommentDTO;
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
