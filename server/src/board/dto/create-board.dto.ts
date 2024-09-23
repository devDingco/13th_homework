import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    ArrayMaxSize,
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateBoardDto {
    @ApiProperty({
        type: String,
        description: '작성자',
        example: '류지승',
    })
    @IsString()
    @IsNotEmpty()
    author: string;

    @ApiProperty({
        type: String,
        description: '제목',
        example: '안녕하세요',
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        type: String,
        description: '내용',
        example: '저는 류지승입니다.',
    })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({
        type: [String],
        description: '사진 첨부',
        example: '아직미정 어떤 식으로 접근할 지 모르겠음.',
        minItems: 1,
        maxItems: 3,
    })
    @ApiPropertyOptional()
    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    @ArrayMaxSize(3)
    imageUrl?: string[];

    @ApiProperty({
        type: String,
        description: '유튜브 링크',
        example: 'https://www.youtube.com',
    })
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    youtubeUrl?: string;
}
