import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { Provider } from 'src/common/enums/provider.enum';

@InputType()
export class SocialLoginInput {
    @IsString()
    @IsNotEmpty()
    @Field()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail({}, { message: '이메일 형식 맞춰라' })
    @Field()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(Provider, { message: 'provider는 kakao, naver, google' })
    @Field()
    provider: Provider;
}
