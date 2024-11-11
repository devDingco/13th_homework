import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
    @Field()
    provider: string;
}
