import {
    Column,
    CreateDateColumn,
    Entity,
    ObjectId,
    ObjectIdColumn,
    UpdateDateColumn,
} from 'typeorm';

import { BoardAddressDTO } from '../dto/board-addresss.dto';

@Entity('board')
export class BoardEntity {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    author: string;

    @Column()
    password: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column('array', { nullable: true })
    imageUrl?: string[];

    @Column({ nullable: true })
    youtubeUrl?: string;

    @Column({ type: 'json', nullable: true })
    boardAddressOutput?: BoardAddressDTO;

    @Column()
    boardId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
