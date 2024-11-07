import { ObjectId } from 'mongodb';
export declare class BoardIdCounterEntity {
    _id: ObjectId;
    collection: string;
    boardId: number;
}
