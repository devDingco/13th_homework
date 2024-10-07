import { Test, TestingModule } from '@nestjs/testing';

import { BoardCommentController } from './board-comment.controller';
import { BoardCommentService } from './board-comment.service';

describe('BoardCommentController', () => {
    let controller: BoardCommentController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BoardCommentController],
            providers: [BoardCommentService],
        }).compile();

        controller = module.get<BoardCommentController>(BoardCommentController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
