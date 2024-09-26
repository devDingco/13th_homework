import {
    Controller,
    Get,
    Param,
    HttpCode,
    HttpStatus,
    ParseIntPipe,
    UseInterceptors,
} from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ResponseMessage } from '../decorators/response-message.decorator';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';

@UseInterceptors(TransformInterceptor)
@Controller('/api/board/:boardId/reaction')
export class ReactionController {
    constructor(private readonly reactionService: ReactionService) {}

    // @Post()
    // create(@Body() createReactionDto: CreateReactionDto) {
    //     return this.reactionService.create(createReactionDto);
    // }

    @Get()
    @ResponseMessage(`board의 reaction을 성공적으로 가져왔습니다.`)
    @HttpCode(HttpStatus.OK)
    findReaction(@Param('boardId', ParseIntPipe) BoardId: number) {
        return this.reactionService.findOne(BoardId);
    }
}
