import { Column, Entity, ObjectIdColumn } from 'typeorm';

import { ObjectId } from 'mongodb';

@Entity('board_id_counter')
export class BoardIdCounterEntity {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    collection: string;

    @Column()
    boardId: number;
}
