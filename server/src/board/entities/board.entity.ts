import {
    Column,
    CreateDateColumn,
    Entity,
    ObjectId,
    ObjectIdColumn,
    UpdateDateColumn,
} from 'typeorm';

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

    @Column({ nullable: true })
    address?: string;

    @Column({ nullable: true })
    detailAddress?: string;

    @Column()
    boardId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
