import { Field, InputType } from '@nestjs/graphql';
import {
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';

import { BoardAddressInput } from './board-address-input.schema';
import { Type } from 'class-transformer';

@InputType()
export class UpdateBoardInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    title: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    content: string;

    @Field(() => [String], { nullable: true })
    @IsOptional()
    @IsArray()
    imageUrl?: string[];

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    youtubeUrl?: string;

    @Field(() => [BoardAddressInput], { nullable: true })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => BoardAddressInput)
    boardAddressInput?: BoardAddressInput;
}
