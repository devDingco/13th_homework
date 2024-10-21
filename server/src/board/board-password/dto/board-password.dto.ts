import { IsNotEmpty, IsString } from 'class-validator';

export class BoardPasswordDTO {
    @IsString()
    @IsNotEmpty()
    password: string;
}
