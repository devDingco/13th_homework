import { ObjectId } from 'typeorm';
export declare class BoardCommentSchema {
    _id: ObjectId;
    author: string;
    content: string;
    rating?: number;
    parentId?: string;
    password: string;
    boardId: number;
    createdAt: Date;
    updatedAt: Date;
}
