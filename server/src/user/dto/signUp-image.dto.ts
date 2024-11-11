import { IsOptional, IsString } from 'class-validator';

import { signUpDTO } from './signUp.dto';

export class signUpImageDTO extends signUpDTO {
    @IsString()
    @IsOptional()
    image?: string;
}
