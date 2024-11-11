import {
    Column,
    CreateDateColumn,
    Entity,
    ObjectIdColumn,
    UpdateDateColumn,
} from 'typeorm';

import { ObjectId } from 'mongodb';
import { SharedProp } from 'src/common/sharedProp.helper';

@Entity('board_reaction')
export class BoardReactionEntity extends SharedProp {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    boardId: number;

    @Column({ default: 0 })
    like: number;

    @Column({ default: 0 })
    hate: number;
}
