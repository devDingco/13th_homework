import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { BoardImageService } from './board-image.service';
import { CreateBoardImageDto } from './dto/create-board-image.dto';
import { UpdateBoardImageDto } from './dto/update-board-image.dto';

@Controller('board-image')
export class BoardImageController {
    constructor(private readonly boardImageService: BoardImageService) {}

    @Post()
    create(@Body() createBoardImageDto: CreateBoardImageDto) {
        return this.boardImageService.create(createBoardImageDto);
    }

    @Get()
    findAll() {
        return this.boardImageService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.boardImageService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateBoardImageDto: UpdateBoardImageDto,
    ) {
        return this.boardImageService.update(+id, updateBoardImageDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.boardImageService.remove(+id);
    }
}
