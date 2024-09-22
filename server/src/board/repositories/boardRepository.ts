import { MongoRepository } from 'typeorm';
import { Board } from '../entities/board.entity';
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from '../dto/create-board.dto';

@Injectable()
export class BoardRepository extends MongoRepository<Board> {
    createBoard(createBoardDto: CreateBoardDto): Board {
        const { author, title, content, imageUrl, youtubeUrl } = createBoardDto;
        return this.create({
            author,
            title,
            content,
            ...(imageUrl?.length > 0 && { imageUrl }),
            ...(youtubeUrl && { youtubeUrl }),
        });
    }
}
