import { BoardImageService } from './board-image.service';
import { Controller } from '@nestjs/common';

@Controller('board-image')
export class BoardImageController {
    constructor(private readonly boardImageService: BoardImageService) {}
}
