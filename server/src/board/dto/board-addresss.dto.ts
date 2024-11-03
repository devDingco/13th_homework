import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BoardAddressDTO {
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
