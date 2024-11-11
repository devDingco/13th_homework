import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsString,
    Matches,
    MinLength,
    ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

import { AddressDTO } from './address.dto';
import { Role } from 'src/common/enums/role.enum';

export class signUpDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    nickname: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail({}, { message: '이메일은 형식을 맞춰야합니다.' })
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
    password: string;

    // 빼놓기
    @IsString()
    @IsOptional()
    @IsEnum(Role, {
        message: 'Role은 USER or MANAGER이어야합니다',
    })
    role?: Role;

    @IsOptional()
    @Type(() => AddressDTO)
    address?: AddressDTO;
}
