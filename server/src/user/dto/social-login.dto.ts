import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SocialLoginDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail({}, { message: '이메일 형식 맞춰라' })
    email: string;

    @IsString()
    @IsNotEmpty()
    provider: string;
}
