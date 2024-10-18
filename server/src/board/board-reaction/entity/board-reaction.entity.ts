import {
    Column,
    CreateDateColumn,
    Entity,
    ObjectIdColumn,
    UpdateDateColumn,
} from 'typeorm';

import { ObjectId } from 'mongodb';

@Entity()
export class BoardReactionEntity {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    boardId: number;

    @Column({ default: 0 })
    like: number;

    @Column({ default: 0 })
    hate: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
