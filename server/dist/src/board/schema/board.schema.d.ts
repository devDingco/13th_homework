import { BoardAddressOutput } from './board-address-input.schema';
import { ObjectId } from 'typeorm';
export declare class BoardSchema {
    _id: ObjectId;
    author: string;
    title: string;
    content: string;
    imageUrl?: string[];
    youtubeUrl?: string;
    boardAddressOutput?: BoardAddressOutput;
    boardId: number;
    createdAt: Date;
    updatedAt: Date;
}
