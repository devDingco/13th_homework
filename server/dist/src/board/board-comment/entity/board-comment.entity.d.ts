import { ObjectId } from 'mongodb';
export declare class BoardCommentEntity {
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
