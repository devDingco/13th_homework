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
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { User } from './entity/user.entity';
import { loginDTO } from './dto/login.dto';
import { Response } from 'express';

@Controller('/api/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/signup')
    @ResponseMessage('회원가입이 성공했습니다.')
    @HttpCode(HttpStatus.CREATED)
    signUp(@Body() signUpDTO: signUpDTO): Promise<User> {
        return this.userService.createUser(signUpDTO);
    }

    @Post('/login')
    @ResponseMessage('로그인 성공했습니다.')
    @HttpCode(HttpStatus.OK)
    async login(
        @Body() loginDTO: loginDTO,
        @Res() response: Response,
    ): Promise<void> {
        const result = await this.userService.login(loginDTO);
        response.setHeader('Authorization', `Bearer ${result.accessToken}`);

        response.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        response.status(HttpStatus.OK).json(result.user.id);
    }
}
