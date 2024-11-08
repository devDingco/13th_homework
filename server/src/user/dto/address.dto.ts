import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddressDTO {
    @IsNumber()
    @IsNotEmpty()
    zoneCode: number;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    detailAddress: string;
}
