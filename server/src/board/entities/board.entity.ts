import {
    Column,
    CreateDateColumn,
    Entity,
    ObjectId,
    ObjectIdColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Board {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    boardId: number;

    @Column()
    author: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column('array')
    imageUrl?: string[];

    @Column()
    youtubeUrl?: string;
}
