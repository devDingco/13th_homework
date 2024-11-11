import { Field, InputType } from '@nestjs/graphql';
import {
    IsArray,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MinLength,
    ValidateNested,
} from 'class-validator';

import { Address } from './address-input.schema';
import { Role } from 'src/common/enums/role.enum';
import { Type } from 'class-transformer';

@InputType()
export class signUpUser {
    @IsString()
    @IsNotEmpty()
    @Field()
    name: string;

    @IsString()
    @IsNotEmpty()
    @Field()
    nickname: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail({}, { message: '이메일은 형식을 맞춰야합니다.' })
    @Field()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/,
        {
            message:
                '비밀번호는 소문자, 대문자, 숫자, 특수문자 1개씩 있어야합니다',
        },
    )
    @Field()
    password: string;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    image?: string;

    @IsOptional()
    @IsEnum(Role, {
        message: 'Role은 USER or MANAGER이어야합니다',
    })
    @Field(() => Role, { nullable: true })
    role?: Role;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => Address)
    @Field(() => Address, { nullable: true })
    address?: Address;
}
