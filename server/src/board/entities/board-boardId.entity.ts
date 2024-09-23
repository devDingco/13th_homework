import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class BoardIdCounter {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    board: string;

    @Column()
    boardId: number;
}
