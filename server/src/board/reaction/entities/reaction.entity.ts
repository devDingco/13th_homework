import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class BoardReaction {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    boardId: number;

    @Column({ default: 0 })
    like: number;

    @Column({ default: 0 })
    hate: number;
}
