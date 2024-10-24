import {
    ArrayMaxSize,
    IsArray,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';

import { BoardAddressDTO } from './board-addresss.dto';
import { Type } from 'class-transformer';

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
    imageUrl?: string[];

    @IsString()
    @IsOptional()
    youtubeUrl?: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => BoardAddressDTO)
    @IsObject()
    boardAddressInput?: BoardAddressDTO;
}
