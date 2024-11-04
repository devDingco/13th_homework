import { Field, InputType } from '@nestjs/graphql';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

@InputType()
export class loginUser {
    @IsString()
    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email format' })
    @Field()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'password must be at least 8 characters long' })
    @MaxLength(20, { message: 'password must not exceed 20 characters' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/,
        {
            message:
                'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character from !@#$%^&*()',
        },
    )
    @Field()
    password: string;
}
