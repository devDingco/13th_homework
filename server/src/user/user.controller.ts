import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Res,
    Session,
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
        @Session() session: Record<string, any>,
    ): Promise<void> {
        const { accessToken, refreshToken } =
            await this.userService.login(loginDTO);
        res.setHeader('Authorization', `Bearer ${accessToken}`);

        session.refreshToken = refreshToken;

        res.status(HttpStatus.OK).json({ accessToken });
    }

    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    logout(
        @Res() res: Response,
        @Session() session: Record<string, any>,
    ): void {
        res.clearCookie('connect.sid');

        session.destroy((err: any) => {
            if (err) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    success: false,
                });
            } else {
                res.status(HttpStatus.OK).json({ success: true });
            }
        });
    }
}
