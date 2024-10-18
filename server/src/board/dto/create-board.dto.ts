import {
    ArrayMaxSize,
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

import { Column } from 'typeorm';

export class CreateBoardDTO {
    @IsString()
    @IsNotEmpty()
    author: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    @ArrayMaxSize(3)
    @Column('array')
    imageUrl?: string[];

    @IsString()
    @IsOptional()
    youtubeUrl?: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsOptional()
    detailAddress?: string;
}
