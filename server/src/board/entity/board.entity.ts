import {
    Column,
    CreateDateColumn,
    Entity,
    ObjectId,
    ObjectIdColumn,
    UpdateDateColumn,
} from 'typeorm';

import { BoardAddressDTO } from '../dto/board-addresss.dto';
import { Exclude } from 'class-transformer';
import { SharedProp } from 'src/common/sharedProp.helper';

@Entity('board')
export class BoardEntity extends SharedProp {
    @ObjectIdColumn()
    @Exclude()
    _id: ObjectId;

    @Column()
    author: string;

    @Column()
    @Exclude()
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
}
