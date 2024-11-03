// [ ] omitType -> pickType
import { Field, InputType, Int, ObjectType, OmitType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class BoardAddressInput {
    @Field(() => Int)
    @IsNumber()
    @IsNotEmpty()
    zoneCode: number;

    @Field()
    @IsString()
    @IsNotEmpty()
    address: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    detailAddress: string;
}

@ObjectType()
export class BoardAddressOutput extends OmitType(
    BoardAddressInput,
    [],
    ObjectType,
) {}
