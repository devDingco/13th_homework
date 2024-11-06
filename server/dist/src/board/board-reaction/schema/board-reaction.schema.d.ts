import { ObjectId } from 'typeorm';
export declare class BoardReactionSchema {
    _id: ObjectId;
    boardId: number;
    like: number;
    hate: number;
    createdAt: Date;
    updatedAt: Date;
}
