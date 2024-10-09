import { IsNotEmpty, IsString } from 'class-validator';

import { Column } from 'typeorm';

export class BoardPasswordDTO {
    @IsString()
    @IsNotEmpty()
    @Column()
    password: string;
}
