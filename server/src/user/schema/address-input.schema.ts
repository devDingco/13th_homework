import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class AddressInput {
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
