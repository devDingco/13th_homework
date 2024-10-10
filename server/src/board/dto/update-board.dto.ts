import {
    ArrayMaxSize,
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

import { Column } from 'typeorm';

@InputType()
export class UpdateBoardDto {
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

    @IsString()
    @IsOptional()
    @Column()
    @Field({ nullable: true })
    youtubeUrl?: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    @ArrayMaxSize(3)
    @Column('array')
    @Field(() => [String], { nullable: true })
    imageUrl?: string[];
}
