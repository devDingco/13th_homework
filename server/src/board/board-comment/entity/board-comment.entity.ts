import {
    Column,
    CreateDateColumn,
    Entity,
    ObjectIdColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { SharedProp } from 'src/common/sharedProp.helper';

@Entity('board_comment')
export class BoardCommentEntity extends SharedProp {
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
}
