import { Field, InputType, Int, ObjectType, OmitType } from '@nestjs/graphql';

@InputType()
export class BoardAddressInput {
    @Field(() => Int)
    zoneCode: number;

    @Field()
    address: string;

    @Field()
    detailAddress: string;
}

@ObjectType()
export class BoardAddressOutput extends OmitType(
    BoardAddressInput,
    [],
    ObjectType,
) {}
