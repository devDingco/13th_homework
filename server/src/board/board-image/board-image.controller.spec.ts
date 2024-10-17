import { Test, TestingModule } from '@nestjs/testing';

import { BoardImageController } from './board-image.controller';
import { BoardImageService } from './board-image.service';

describe('BoardImageController', () => {
    let controller: BoardImageController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BoardImageController],
            providers: [BoardImageService],
        }).compile();

        controller = module.get<BoardImageController>(BoardImageController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
