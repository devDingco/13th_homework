import { BoardImageController } from './board-image.controller';
import { BoardImageService } from './board-image.service';
import { Module } from '@nestjs/common';

@Module({
    controllers: [BoardImageController],
    providers: [BoardImageService],
})
export class BoardImageModule {}
