import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType()
export abstract class SharedProp {
    @CreateDateColumn()
    @Field(() => Date)
    createdAt: Date;

    @UpdateDateColumn()
    @Field(() => Date)
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    @Field(() => Date, { nullable: true })
    deletedAt?: Date;
}
