import { Test, TestingModule } from '@nestjs/testing';

import { BoardReactionService } from './board-reaction.service';

describe('ReactionService', () => {
    let service: BoardReactionService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BoardReactionService],
        }).compile();

        service = module.get<BoardReactionService>(BoardReactionService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
