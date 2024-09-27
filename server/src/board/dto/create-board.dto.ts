import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
    ArrayMaxSize,
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
} from 'class-validator';
import { Column } from 'typeorm';

@InputType()
@ObjectType()
export class CreateBoardDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 4)
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
}
