import {
    Column,
    CreateDateColumn,
    Entity,
    ObjectId,
    ObjectIdColumn,
    UpdateDateColumn,
} from 'typeorm';

import { ObjectType, Field, Int } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Board {
    @ObjectIdColumn()
    @Field(() => String)
    _id: ObjectId;

    @Column()
    @Field(() => Int)
    boardId: number;

    @Column()
    @Field()
    author: string;

    @Column()
    @Field()
    title: string;

    @Column()
    @Field()
    content: string;

    @CreateDateColumn()
    @Field(() => Date)
    createdAt: Date;

    @UpdateDateColumn()
    @Field(() => Date)
    updatedAt: Date;

    @Column('array')
    @Field(() => [String], { nullable: true })
    imageUrl?: string[];

    @Column()
    @Field({ nullable: true })
    youtubeUrl?: string;
}
