import { Field, InputType } from '@nestjs/graphql';
import {
    ArrayMaxSize,
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
} from 'class-validator';

@InputType()
export class CreateBoardDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 4)
    @Field()
    author: string;

    @IsString()
    @IsNotEmpty()
    @Field()
    title: string;

    @IsString()
    @IsNotEmpty()
    @Field()
    content: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    @ArrayMaxSize(3)
    @Field(() => [String], { nullable: true })
    imageUrl?: string[];

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    youtubeUrl?: string;
}
