import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { signUpDTO } from './dto/signUp.dto';
import { User } from './entity/user.entity';
import { loginDTO } from './dto/login.dto';
import { Response } from 'express';

@Controller('/api/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    signUp(@Body() signUpDTO: signUpDTO): Promise<User> {
        return this.userService.createUser(signUpDTO);
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async login(
        @Body() loginDTO: loginDTO,
        @Res() res: Response,
    ): Promise<void> {
        const result = await this.userService.login(loginDTO);
        res.setHeader('Authorization', `Bearer ${result.accessToken}`);

        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(HttpStatus.OK).json({ id: result.user.id });
    }

    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    logout(@Res() res: Response): void {
        res.clearCookie('refreshToken');

        res.send(true);
    }
}
