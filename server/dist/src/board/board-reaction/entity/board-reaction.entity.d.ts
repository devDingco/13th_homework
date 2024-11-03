import { ObjectId } from 'mongodb';
export declare class BoardReactionEntity {
    _id: ObjectId;
    boardId: number;
    like: number;
    hate: number;
    createdAt: Date;
    updatedAt: Date;
}
