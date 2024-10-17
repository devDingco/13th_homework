import { Test, TestingModule } from '@nestjs/testing';

import { BoardImageService } from './board-image.service';

describe('BoardImageService', () => {
    let service: BoardImageService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BoardImageService],
        }).compile();

        service = module.get<BoardImageService>(BoardImageService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
