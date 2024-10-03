import { Test, TestingModule } from '@nestjs/testing';

import { BoardCommentService } from './board-comment.service';

describe('BoardCommentService', () => {
    let service: BoardCommentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BoardCommentService],
        }).compile();

        service = module.get<BoardCommentService>(BoardCommentService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
