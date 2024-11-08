import { Column, Entity, ObjectIdColumn } from 'typeorm';

import { ObjectId } from 'mongodb';
import { SharedProp } from 'src/common/sharedProp.helper';

@Entity('board_id_counter')
export class BoardIdCounterEntity extends SharedProp {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    collection: string;

    @Column()
    boardId: number;
}
