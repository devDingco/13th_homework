import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { Provider } from 'src/common/enums/provider.enum';

export class SocialLoginDTO {
    @IsString()
    @IsNotEmpty()
    @IsEmail({}, { message: '이메일 형식 맞춰라' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(Provider, {
        message: 'Provider는 kakao, naver, google',
    })
    provider: Provider;
}
