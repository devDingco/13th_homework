import { ObjectId } from 'typeorm';
import { BoardAddressDTO } from '../dto/board-addresss.dto';
export declare class BoardEntity {
    _id: ObjectId;
    author: string;
    password: string;
    title: string;
    content: string;
    imageUrl?: string[];
    youtubeUrl?: string;
    boardAddressOutput?: BoardAddressDTO;
    boardId: number;
    createdAt: Date;
    updatedAt: Date;
}
