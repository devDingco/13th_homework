import {
    Column,
    CreateDateColumn,
    Entity,
    ObjectIdColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { ObjectId } from 'mongodb';

@Entity('board_comment')
export class BoardCommentEntity {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    author: string;

    @Column()
    content: string;

    @Column({ nullable: true })
    rating?: number;

    @Column({ nullable: true })
    parentId?: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    boardId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
