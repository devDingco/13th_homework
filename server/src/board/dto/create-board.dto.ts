import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateBoardDto {
    @IsNotEmpty()
    @IsNumber()
    boardId: number;

    @IsNotEmpty()
    @IsString()
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
    @ArrayMinSize(1)
    @ArrayMaxSize(3)
    imageUrl?: string[];

    @IsString()
    @IsOptional()
    youtubeUrl?: string;
}
