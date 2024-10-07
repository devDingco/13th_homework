import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardCommentService } from './board-comment.service';
import { BoardComment } from './entities/board-comment.entity';
import { CreateBoardCommentDto } from './dto/create-board-comment.dto';
import { BoardCommentResponseDto } from './entities/board-comment-response.entity';
import { UpdateBoardCommentGraphDto } from './dto/update-graphql.entity';

@Resolver(() => BoardComment)
export class BoardCommentResolver {
    constructor(private readonly boardCommentService: BoardCommentService) {}

    @Query(() => [BoardCommentResponseDto])
    getAllBoardComment(@Args('boardId', { type: () => Int }) boardId: number) {
        return this.boardCommentService.findAllComment(boardId);
    }

    @Mutation(() => BoardCommentResponseDto)
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

    @Mutation(() => BoardCommentResponseDto)
    updateBoardComment(
        @Args('boardId', { type: () => Int }) boardId: number,
        @Args('updateBoardCommentDTO')
        updateBoardCommentDTO: UpdateBoardCommentGraphDto,
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
