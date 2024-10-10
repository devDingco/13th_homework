import {
    ArrayMaxSize,
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { Column } from 'typeorm';

@InputType()
@ObjectType()
export class CreateBoardDto {
    @IsString()
    @IsNotEmpty()
    @Column()
    @Field()
    author: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    @Field()
    title: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    @Field()
    content: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    @ArrayMaxSize(3)
    @Column('array')
    @Field(() => [String], { nullable: true })
    imageUrl?: string[];

    @IsString()
    @IsOptional()
    @Column()
    @Field({ nullable: true })
    youtubeUrl?: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    @Field()
    password: string;

    @IsString()
    @IsOptional()
    @Column()
    @Field({ nullable: true })
    address?: string;

    @IsString()
    @IsOptional()
    @Column()
    @Field({ nullable: true })
    detailAddress?: string;
}
